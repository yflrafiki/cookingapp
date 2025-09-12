import {GoogleGenAI , Type} from "@google/genai"
import { useState } from "react";
import { Message } from "@/types";

import removeMd from "remove-markdown"

const conversationSystemPrompt = `
You are Culina, a friendly and helpful AI recipe assistant with a warm, feminine personality.  
You speak in a supportive, conversational tone — approachable but concise.  

Your primary purpose is to help users come up with meals based on the ingredients they provide.  

Guidelines:  
- Greet the user naturally and maintain a light, friendly tone.  
- You can handle small talk briefly (e.g., greetings, mood check, polite responses) but always guide the conversation back to cooking and meal suggestions.  
- Always ask clarifying questions until you have enough ingredient information to suggest possible meals.  
- If the user provides too little data, politely explain that you cannot suggest meals yet and gently prompt them for more details.  
- Once you have enough data, suggest meals the user could make.  
- Do NOT provide a recipe yet. Wait until the user selects a meal.  
- Your job is NOT to answer direct recipe requests like “How do I make pizza?” — only suggest meals based on given ingredients.  
- When the user selects a meal, call the \`createRecipeTool\` with the chosen meal title.  
- Keep responses short, clear, and friendly.  
- Stay within your role as a recipe companion. Do not give answers outside the scope of food, cooking, or light conversation.  
`
;


const RECIPE_SCHEMA = {
    type: Type.OBJECT,
    properties: {

      id: { type: Type.STRING },
      title: { type: Type.STRING },
      description: { type: Type.STRING },
    //   image: { type: Type.STRING },
      ingredients: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
     
      },
      steps: {
        type: Type.ARRAY,
        items : {type : Type.STRING}
      },
    },

    required : ["title" , "description" , "ingredients" , "steps"]

  };



const GEMINI_API_KEY =  process.env.NEXT_PUBLIC_GEMINI_API_KEY


const ai  = new GoogleGenAI({
    apiKey : GEMINI_API_KEY
})

const model = 'gemini-2.5-flash'

const recipeSystemPrompt = `
You are Culina's recipe creator.  
Given a selected meal and some ingredients the user already has, generate a structured recipe that matches this schema:

{
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  steps: string[];
}

Rules:  
- Ingredients should be a clear, well-formatted list.  
- Steps should be a step-by-step set of instructions.  
- Generate a short cover image prompt and return a valid image URL (placeholder if not available).  
- Ensure the recipe is practical and coherent.
`;


const FUNCTIONS = [
    {
        name : "generateRecipe" , 
        description : "Generates the recipe for a given meal" , 
        parameters : {
            type : "object" , 
            properties : {
                name : {
                    type : "string"  , 
                    description : "name of meal"
                } , 

                ingredients : {
                    type : "array" , 
                    items : {type : "string"}, 
                    description : "Ingredients that the user has available"
                }
            }
        }
    }
]



async function generateRecipe({name , ingredients}){
    
    const prompt = `
    ${recipeSystemPrompt}
    name : ${name}
    ingredients : ${ingredients ?? []}
    `

    const response = await ai.models.generateContent({
        model : model , 
        contents : prompt , 
        config : {
            thinkingConfig : {
                thinkingBudget : -1,
            } , 
            responseMimeType : "application/json",
            responseSchema : RECIPE_SCHEMA
        }
    })


    return JSON.parse(response.text)

}

const TOOL_REGISTORY = {
    generateRecipe
}

const TOOLS = [
    {
        functionDeclarations : FUNCTIONS
    }
]



class Culinary {

    constructor(){


        this.config = {
            tools  : TOOLS , 
            responseMimeType : "text/plain"
        }
    }


    async ask(history){


        this.config.systemInstruction = [
            {
                text : conversationSystemPrompt
            }
        ]

        const messages = history.map(function(message){
            return ({
                role :  message.role == "user" ? "user" : "model" , 
                parts : [
                    {
                        text : JSON.stringify(message.content)
                    }
                ]
            })
        })

        const response = await ai.models.generateContent({
            model : model , 
            config : this.config , 
            contents : messages
        })

        let tool_data = null 
        const content = response.candidates[0].content


        const parts = content.parts.sort((a, b) => {
            if (a.functionCall && !b.functionCall) return -1; 
            if (!a.functionCall && b.functionCall) return 1; 
            return 0; 
        });


        const part = parts[0]

        if(part.functionCall){

            const toolName = part.functionCall.name  
            const toolArgs = part.functionCall.args

            if(TOOL_REGISTORY[toolName]){

                let tool_response = await TOOL_REGISTORY[toolName]({...toolArgs})

                tool_response.image = ""
           
                return {
                    id: (Date.now() + 1).toString(),
                    content : tool_response , 
                    role : "assistant" , 
                    timestamp : new Date() , 
                    type : "rich"

                }

            }
        }
        
        else {
            
            let text = part.text?.replaceAll("*" , "")
            text = removeMd(part.text)
            return {

            id: (Date.now() + 1).toString(),
            content : text , 
            role : "assistant" , 
            timestamp : new Date() , 
            type : "text"

        }
    }



    }
}

export function useCulinary(){

    const culinary = new Culinary()
    const [loading , setLoading] = useState(false)


    const sendMessage = async (history : Message[]) => {
  
        try{

            setLoading(true)
            const response = await culinary.ask(history)

            console.log(response , "response")

            return response

        }

        catch(e){
            console.log(e)
            throw e
        } 
        finally{
            setLoading(false)
        }
    }

    return {sendMessage , loading }
}