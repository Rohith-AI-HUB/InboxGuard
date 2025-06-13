# InboxGuard

A smart email management application that helps users organize their inbox with advanced filtering and categorization features.

## 📱 Features

- **Smart Inbox Management**: Categorize emails into Inbox, Spam, Archive, and Deleted sections
- **Message Details View**: Detailed view for each email message
- **Bottom Navigation**: Easy access to all main sections of the app
- **Cross-platform Support**: Works seamlessly on both Android and iOS devices

## ⚙️ Technology Stack

- **React Native**: 0.80.0 - Cross-platform mobile development framework
- **TypeScript**: 5.0.4 - Typed JavaScript superset for better code maintainability
- **React**: 19.1.0 - UI component library
- **Navigation**: 
  - @react-navigation/native: ^7.1.10
  - @react-navigation/bottom-tabs: ^7.3.14
  - @react-navigation/native-stack: ^7.3.14
- **UI Components**:
  - react-native-paper: ^5.14.5 - Material Design library
  - react-native-vector-icons: ^10.2.0 - Icon library

## 📁 Project Structure

```
src/
├── navigation/        # Application navigation setup
│   └── AppNavigator.tsx # Main navigation configuration using React Navigation
└── screens/           # UI screens components
    ├── HomeScreen.tsx     # Inbox messages screen
    ├── SpamScreen.tsx     # Spam/junk messages screen
    ├── ArchiveScreen.tsx  # Archived messages screen
    ├── DeletedScreen.tsx  # Deleted messages screen
    └── MessageDetails.tsx # Detailed view of a single message
```

## 🛠️ Installation

1. Clone the repository:
```sh
git clone https://github.com/yourusername/InboxGuard.git
```

2. Install dependencies:
```sh
cd InboxGuard
npm install
# or
yarn install
```

3. For iOS only (first time setup):
```sh
bundle install
bundle exec pod install
```

## ▶️ Running the Application

1. Start Metro bundler:
```sh
npm start
# or
yarn start
```

2. Run the app on your preferred platform:
```sh
# Android
npm run android
# or
yarn android

# iOS
npm run ios
# or
yarn ios
```

## 🧪 Testing

Run tests using:
```sh
npm test
# or
yarn test
```

## 🧹 Linting

Run ESLint for code quality checks:
```sh
npm run lint
# or
yarn lint
```

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the project
2. Create a new branch (`git checkout -b feature-name`)
3. Commit your changes (`git commit -m 'Add some feature'`)
4. Push to the branch (`git push origin feature-name`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
