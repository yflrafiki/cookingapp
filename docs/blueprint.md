# **App Name**: Culinary Canvas

## Core Features:

- Responsive Home Screen: Display a responsive home screen with a search bar, category grid, and featured content sections that adapts to mobile and desktop screens, utilizing React.js, TypeScript and shadcn/ui.
- Adaptive Video Player: Show cooking videos with overlay controls in full screen mode on mobile or a side panel on desktop for related details, enhanced with react-player component.
- Dynamic Recipe Form: Provide an add recipe form that adapts between full-screen on mobile and a two-column layout with live preview on desktop, making extensive use of shadcn/ui form components.
- Realtime settings updates: Enable settings adjustment with a list view on mobile or categorized panel on desktop that updates instantly using zustand
- Smart recipe grid: Generate a list of food recipes that can display with one column on mobile but transforms to display a 3-4 column grid on the desktop with many sorting options.
- Smart Recipe Suggestion: Let the user generate recipe ideas based on available ingredients using a generative AI tool.
- PWA support: Progressive Web App (PWA) support with offline functionality, optimized for touch, mouse, and keyboard accessibility. Service workers will be used for caching.

## Style Guidelines:

- Primary color: HSL(150, 55%, 60%) - A refreshing light-green hue (#7BD997 in hex) that subtly suggests healthy, natural ingredients.
- Background color: HSL(150, 20%, 95%) - An off-white shade of pale green (#F2FAF4 in hex), appropriate to a light scheme but distinct from pure white, adding depth.
- Accent color: HSL(120, 45%, 50%) - A slightly darker, cooler green (#4CAF50 in hex) used sparingly for interactive elements and highlights, clearly distinguishable from the primary and background.
- Body text: 'PT Sans', a modern humanist sans-serif.
- Headline font: 'Space Grotesk', a versatile computerized sans-serif
- Use flat style, outline icons with rounded corners to provide a friendly, approachable appearance.
- Employ a mobile-first approach with a single-column layout on smaller screens, transitioning to multi-column grids with collapsible sidebars on larger screens to maximize content visibility.