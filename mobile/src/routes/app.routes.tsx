import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from '../pages/Dashboard';
import FinishOrder from '../pages/finish';
import Order from '../pages/Order';

export type StackParamsList = {
  Dashboard: undefined;
  Order: {
    table: number | string
    order_id: string
  }
  Finish: {
    table: number | string
    order_id: string
  }
}

const Stack = createNativeStackNavigator<StackParamsList>();

// -- ROTAS PRIVADAS --
function AppRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Order"
        component={Order}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Finish"
        component={FinishOrder}
        options={{
          title: 'Finalizando',
          headerStyle: {
            backgroundColor: '#1d1d2e'
          },
          headerTintColor: '#fff'
        }}
      />
    </Stack.Navigator>
  )
}

export default AppRoutes
