import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import AuthProvider from './src/contexts/AuthContext';
import Routes from './src/routes';

export default function App() {
  return (
    <NavigationContainer>

      <StatusBar
        backgroundColor="#1d1d2e"
        barStyle="light-content"
        translucent={false}
      />

      <AuthProvider>
        <Routes />
      </AuthProvider>

    </NavigationContainer>
  );
}
