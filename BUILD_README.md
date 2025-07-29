# Tic Tac Toe 2.0 - Build & Publish Guide

## 🚀 Pre-Build Steps

### 1. Install EAS CLI
```bash
npm install -g eas-cli
```

### 2. Login to Expo
```bash
eas login
```

### 3. Configure Build
```bash
eas build:configure
```

## 📱 Building for Production

### Android Build
```bash
npm run build:android
```

### iOS Build
```bash
npm run build:ios
```

### Both Platforms
```bash
npm run build:all
```

## 🏪 Publishing to App Stores

### Android (Google Play Store)
1. Build production APK/AAB
2. Create Google Play Console account
3. Upload build to Google Play Console
4. Fill out store listing details
5. Submit for review

### iOS (App Store)
1. Build production IPA
2. Create Apple Developer account
3. Upload to App Store Connect
4. Fill out store listing details
5. Submit for review

## 📋 App Store Requirements

### Android (Google Play)
- Privacy Policy URL
- App description
- Screenshots (phone, tablet)
- Feature graphic
- Content rating

### iOS (App Store)
- Privacy Policy URL
- App description
- Screenshots (iPhone, iPad)
- App icon (1024x1024)
- Content rating

## 🔧 Build Configuration

Your `eas.json` is already configured with:
- Development builds for testing
- Preview builds for internal distribution
- Production builds with auto-increment

## 📝 Store Listing Info

### App Name
"Tic Tac Toe 2.0"

### Description
Modern Tic Tac Toe game with AI opponent and local multiplayer modes. Features smooth animations, sound effects, and responsive design for all devices.

### Keywords
tic tac toe, tictactoe, game, puzzle, multiplayer, AI, strategy

### Categories
- Android: Game > Puzzle
- iOS: Games > Puzzle

## 🎯 Next Steps

1. **Test thoroughly** on both platforms
2. **Create store assets** (screenshots, descriptions)
3. **Set up privacy policy** (required for both stores)
4. **Build and submit** to app stores
5. **Monitor analytics** and user feedback

## 📞 Support

For build issues, check:
- EAS documentation: https://docs.expo.dev/build/introduction/
- Expo forums: https://forums.expo.dev/ 