import React from 'react';
import { LogBox } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

LogBox.ignoreAllLogs();

function App(): React.ReactElement {
  return <AppNavigator />;
}

export default App;
