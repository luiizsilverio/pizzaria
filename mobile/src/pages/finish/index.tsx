import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from '@expo/vector-icons'

import { StackParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";

type RouteParams = {
  Finish: {
    table: string | number
    order_id: string
  }
}

type FinishOrderRouteProp = RouteProp<RouteParams, 'Finish'>

export default function FinishOrder() {
  const route = useRoute<FinishOrderRouteProp>()
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  async function handleFinish() {
    try {
      await api.put('/orders/send', {
        order_id: route.params?.order_id
      })

      navigation.popToTop() // volta para a primeira rota da stack

    } catch (err) {
      console.log('Erro ao finalizar')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.alert}>Deseja finalizar o pedido?</Text>
      <Text style={styles.title}>Mesa {route.params.table}</Text>

      <TouchableOpacity style={styles.btn} onPress={handleFinish}>
        <Text style={styles.textBtn}>Finalizar pedido</Text>
        <Feather name="shopping-cart" size={20} color='#1d1d2e' />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d2e',
    paddingVertical: '5%',
    paddingHorizontal: '4%',
    alignItems: 'center',
    justifyContent: "center"
  },
  alert: {
    fontSize: 20,
    color: '#fff',
    fontWeight: "bold",
    marginBottom: 12
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: '#fff',
    marginBottom: 12
  },
  btn: {
    backgroundColor: '#3fffa3',
    flexDirection: "row",
    width: '65%',
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4
  },
  textBtn: {
    fontSize: 18,
    marginRight: 8,
    fontWeight: "bold",
    color: '#1d1d2e'
  }
})