# Tic Tac Toe 2.0

A modern, animated Tic Tac Toe game built with React Native and Expo, featuring both single-player and two-player modes.

## Features

- Two game modes: Single Player (vs AI) and Over the Board (2 players)
- Three AI difficulty levels
- Smooth animations and transitions
- Modern, clean UI design
- Sound effects
- Responsive layout for all screen sizes

## Project Structure

```
├── app/                    # Main application screens
│   ├── (tabs)/            # Tab-based navigation screens
│   │   ├── game.tsx       # Single player game screen
│   │   └── overTheBoard.tsx # Two player game screen
├── components/            # Reusable UI components
│   ├── Cell.tsx          # Individual game cell component
│   ├── GameBoard.tsx     # Main game board component
│   ├── GameHeader.tsx    # Score display and title
│   ├── GameStatus.tsx    # Game state and turn indicator
│   └── GameSettings.tsx  # Game configuration options
├── contexts/             # React Context providers
│   └── GameContext.tsx   # Game state management
├── utils/               # Utility functions
│   └── gameLogic.ts     # Game rules and AI logic
├── types/               # TypeScript type definitions
│   └── game.ts         # Game-related type definitions
├── assets/             # Static assets
│   ├── images/        # Images and icons
│   └── sounds/        # Sound effects
└── app.json           # Expo configuration
```

## Key Components

### Game Logic
- `GameContext.tsx`: Manages game state, player turns, and scoring
- `gameLogic.ts`: Contains win-checking logic and AI move calculation

### UI Components
- `GameBoard.tsx`: Renders the 3x3 game grid with animated cells
- `Cell.tsx`: Individual cell component with X/O animations
- `GameStatus.tsx`: Shows current game state and player turns
- `GameHeader.tsx`: Displays scores and game title

## Game Modes

### Single Player
- Play against an AI opponent
- Three difficulty levels (Easy, Medium, Hard)
- Score tracking

### Over the Board
- Two-player mode
- Players take turns placing X and O
- Score tracking

## Getting Started

1. Install dependencies:
```
npm install
```

2. Start the development server:
```
npx expo start
```

3. Run on your preferred platform:
- Press `i` for iOS simulator
- Press `a` for Android emulator
- Scan QR code with Expo Go app for physical device

## Technologies Used

- React Native
- Expo
- TypeScript
- React Native Reanimated
- Expo Router
- Lucide React Native (icons)

## Contributing

Feel free to submit issues and enhancement requests!