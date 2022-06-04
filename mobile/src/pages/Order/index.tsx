import { View, Text, StyleSheet } from 'react-native'
import { useRoute, RouteProp } from '@react-navigation/native'

type RouteParams = {
  Order: {
    number: string | number
    order_id: string
  }
}

type OrderRouteProps = RouteProp<RouteParams, 'Order'>

export default function Order() {
  const route = useRoute<OrderRouteProps>()

  return (
    <View style={styles.container}>
      <Text>ORDER</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {

  }
})