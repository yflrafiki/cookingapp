
import type { Recipe } from "@/types";

export const allRecipes: Recipe[] = [
  {
    id: '1',
    title: 'Jollof Rice',
    description: 'A classic West African dish, rich in flavor and tradition',
    image: '/jollof flavour.jpg',
    dataAiHint: 'pasta carbonara',
    ingredients: ['Tomatoes', 'Onions', 'Salt', 'Thyme'],
    steps: [
      "Cook spaghetti according to package directions. Reserve 1 cup of pasta water before draining.",
      "While pasta is cooking, heat olive oil in a large skillet over medium heat. Add diced pancetta and cook until crisp.",
      "In a separate bowl, whisk together eggs, grated Parmesan cheese, and a generous amount of black pepper.",
      "Drain the hot pasta and immediately add it to the skillet with the pancetta. Toss to combine. Remove from heat.",
      "Quickly pour the egg and cheese mixture over the pasta, stirring constantly to create a creamy sauce. The heat from the pasta will cook the eggs.",
      "If the sauce is too thick, add a little of the reserved pasta water until it reaches the desired consistency.",
      "Serve immediately, garnished with more Parmesan cheese and black pepper."
    ]
  },
  {
    id: '2',
    title: 'Jollof Rice',
    description: 'A classic West African dish, rich in flavor and tradition.',
    image: '/jollof flavour.jpg',
    dataAiHint: 'jollof rice',
    ingredients: ['Tomatoes', 'Onions', 'Salt', 'Thyme'],
    steps: [
        "Blend tomatoes, onions, bell peppers, and scotch bonnet peppers into a smooth puree.",
        "In a large pot, heat vegetable oil and fry the blended puree until the water has evaporated and the stew is thick.",
        "Stir in tomato paste and cook for another 5 minutes.",
        "Add thyme, curry powder, bay leaves, and season with salt and stock cubes.",
        "Add the rice to the pot and stir until well coated with the stew.",
        "Pour in just enough water or broth to cover the rice, cover the pot with a tight-fitting lid, and cook on low heat.",
        "Cook for 20-30 minutes, or until the rice is tender and has absorbed all the liquid. Do not stir during this time.",
        "Once cooked, fluff the rice with a fork and serve hot."
    ]
  },
  {
    id: '3',
    title: 'Classic Tomato Soup',
    description: 'A creamy and delicious tomato soup, perfect for any season. Made with fresh tomatoes and herbs.',
    image: '/noddles.jpg',
    dataAiHint: 'tomato soup',
    ingredients: ['Tomatoes', 'Onions', 'Salt', 'Thyme'],
    steps: [
        "Melt butter in a large pot over medium heat. Add chopped onion and garlic, and cook until softened.",
        "Add canned or fresh chopped tomatoes and vegetable broth. Bring to a simmer.",
        "Reduce heat and let it simmer for 20 minutes to let the flavors meld.",
        "Use an immersion blender to blend the soup until smooth.",
        "Stir in heavy cream and fresh basil.",
        "Season with salt and pepper to taste.",
        "Serve hot, garnished with a swirl of cream or croutons."
    ]
  },
    {
    id: '4',
    title: 'Egusi Soup',
    description: 'A rich and savory soup made from ground melon seeds, vegetables, and your choice of protein.',
    image: '/noddles.jpg',
    dataAiHint: 'egusi soup',
    ingredients: ['Tomatoes', 'Onions', 'Salt', 'Thyme'],
    steps: [
      "Wash and cook the beef and stockfish until tender. Reserve the stock.",
      "Heat palm oil in a pot, add chopped onions and fry until translucent.",
      "Make a paste with the ground egusi and a little water. Add to the pot and fry, stirring continuously for about 10 minutes.",
      "Gradually add the meat stock, stirring to prevent lumps. Add more water if needed to achieve desired consistency.",
      "Add the cooked beef, stockfish, and ground crayfish. Simmer for 15 minutes.",
      "Add the chopped spinach or ugu leaves and cook for another 5 minutes.",
      "Season with salt and pepper to taste.",
      "Serve hot with fufu, pounded yam, or rice."
    ]
  },
];
