'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAppContext } from '@/context/AppContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from "next/link";
import { Send, Bot, User, ArrowLeft, Loader2 , ChevronLeft , ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Message } from '@/types';
import { useCulinary } from '@/ai/use-culinary';
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardTitle } from "@/components/ui/card";
;


interface BaseConversation {
  id: number;
  message: string;
}


const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
    const router = useRouter()
    const handleClick = ()=>{
        localStorage.setItem("fromCulinary" , JSON.stringify(recipe))
        router.push("/culina/1")
    }
    return(
    <Card className="overflow-hidden w-full bg-card h-[fit-content] lg:flex flex-col
     shadow-none rounded-[5px]" onClick={handleClick}>
        <div className="block h-full flex flex-col">
            <CardContent className="p-4 flex gap-4 flex-grow">
            <div className="flex-1 space-y-2">
              <div className="flex flex-row items-center w-full space-between">
                <CardTitle className="font-headline text-lg">{recipe.title}</CardTitle>
                <ChevronRight className="h-6 w-6 text-foreground ml-auto" />

              </div>
                {/* <Separator /> */}
                <CardDescription className="text-sm text-muted-foreground line-clamp-3 flex-grow">
                {recipe.description}
                </CardDescription>
            </div>
            
            </CardContent>
        

        </div>
    </Card>
  )};



export default function CulinaPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();
  const { theme, textSize, largeText } = useAppContext();

  const baseState = useRef(false)

  const {sendMessage ,  loading : isLoading} = useCulinary()

  // Scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Adjust textarea height based on content
  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  // Load base conversation on mount
  useEffect(() => {



    const loadBaseConversation = () => {

      if(baseState.current) return
      console.log("did")
      try {

        baseState.current = true
        const baseConversation = localStorage.getItem('baseConversation');
        

        if(baseConversation){
            const conversation = JSON.parse(baseConversation)

            const welcomeMessage : Message = {
                id : Date.now().toString() , 
                content : conversation.message , 
                role : "user" , 
                timestamp : new Date()
            }

            
        
            handleSendMessage(conversation.message);
        }
        else  {
          // No base conversation found, start with AI welcome message
          const welcomeMessage: Message = {
            id: Date.now().toString(),
            content: "Hi I'm Culina! Tell me what you have and I'll show you what to cook",
            role: 'assistant',
            timestamp: new Date(),
          };

          setMessages([welcomeMessage]);
          return;
        }

        
        // localStorage.removeItem('baseConversation');
      } catch (err) {
        console.error('Error loading base conversation:', err);
        setError('Failed to load conversation. Please try again.');
      }
    };

    loadBaseConversation();
  }, []);

  const handleSendMessage = async (messageContent?: string, isInitial = false) => {

    const content = messageContent || inputValue.trim();


    if (!content) return;

    if (!isInitial) {
 
      setInputValue('');
      // Reset textarea height after sending
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.style.height = 'auto';
        }
      }, 0);
    }


    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date(), 
      type : 'text'
    };

    const history = [...messages , userMessage]

    setMessages(prev => [...prev, userMessage]);

    try {
      // Generate AI response
      const aiResponse = await sendMessage(history)


      setMessages(prev => [...prev, aiResponse]);

    } catch (err) {

      console.error('Error generating response:', err);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm sorry, I encountered an error. Please try again.",
        role: 'assistant',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
    } 
  };


  const getTextSizeClass = () => {
    if (largeText) {
      return 'text-lg';
    }
    switch (textSize) {
      case 33: return 'text-base';
      case 50: return 'text-lg';
      case 75: return 'text-xl';
      case 100: return 'text-2xl';
      default: return 'text-base';
    }
  };


  return (
    <div className="h-full bg-background flex flex-col space-between pb-[5rem]">
      {/* Header */}
      <div className="sticky  top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
         
              <div>
                <h1 className={cn("font-headline font-semibold text-foreground", getTextSizeClass())}>
                  Culina
                </h1>
                <p className={cn("text-muted-foreground", getTextSizeClass())}>
                  Your AI Recipe Assistant
                </p>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="rounded-full bg-card shadow-sm border" asChild>
            <Link href="/">
              <ChevronLeft className="h-6 w-6 text-foreground" />
            </Link>
          </Button>
          </div>
        </div>
      </div>

      {/* Messages Container */}
      <div className="w-full mx-auto px-2 py-6 pb-24 h-[100%] overflow-y-auto ">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex gap-3 animate-in slide-in-from-bottom-2 duration-300",
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
        
              
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-2 shadow-none border-none",
                  message.role === 'user'
                    ? 'bg-secondary text-foreground ml-auto'
                    : 'bg-card text-card-foreground border border-border'
                )}
              >
                {
                    message.type == "rich" ? <RecipeCard recipe={message.content} />

                    :
                <p className={cn("whitespace-pre-line", getTextSizeClass())}>
                  {message.content}
                </p>
              }
            
              </div>

            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-3 justify-start animate-in slide-in-from-bottom-2 duration-300">
              <div className="bg-card text-card-foreground border-none rounded-2xl px-4 py-3 shadow-none">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className={cn("text-muted-foreground", getTextSizeClass())}>
                    Culina is thinking...
                  </span>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="fixed bottom-24 w-full bg-background/95 backdrop-blur-sm border-none mt-auto">
        <div className="max-w-4xl mx-auto px-2 py-4 border-border">
          <div className="w-full border-border border-[1px] rounded-[10px] shadow-sm p-2 bg-background">
 
               <textarea
                 ref={textareaRef}
                 value={inputValue}
                 onChange={(e) => setInputValue(e.target.value)}
          
                 placeholder="Ask Culina about recipes, cooking tips, or ingredients..."
                 className={cn(
                   "focus:outline-none pr-10px pb-[20px] text-foreground bg-background w-full resize-none overflow-hidden",
                   getTextSizeClass()
                 )}
                 disabled={isLoading}
                 rows={1}
                 style={{ minHeight: '40px', maxHeight: '120px' }}
               />
              <Button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isLoading}
                size="sm"
                className="absolute right-4 bottom-2  -translate-y-1/2 h-8 w-8 p-0 rounded-full"
              >
                <Send className="w-4 h-4" />
              </Button>
        
          </div>
        </div>
      </div>
    </div>
  );
}
