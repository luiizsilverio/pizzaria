import { createNativeStackNavigator } from '@react-navigation/native-stack'
import SignIn from '../pages/SignIn'

const Stack = createNativeStackNavigator();

// -- ROTAS PÚBLICAS --
function AuthRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}

export default AuthRoutes
