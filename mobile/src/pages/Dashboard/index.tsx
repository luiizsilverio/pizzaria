import { useContext, useState } from "react";

import {
  Text,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
  Alert
} from "react-native";

import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { AuthContext } from "../../contexts/AuthContext";
import { StackParamsList } from "../../routes/app.routes";
import { api } from "../../services/api";

export default function Dashboard() {
  const [table, setTable] = useState('')
  const { signOut } = useContext(AuthContext)
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  async function openOrder() {
    if (!table) return;
    if (isNaN(parseInt(table))) {
      Alert.alert("Informe o Nº da mesa")
    }

    const response = await api.post('orders', {
      table: Number(table)
    })

    setTable('')

    navigation.navigate('Order', { table, order_id: response.data.id })
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo pedido</Text>

      <TextInput
        placeholder="Número da mesa"
        placeholderTextColor="#f0f0f0"
        keyboardType="numeric"
        style={styles.input}
        value={table}
        onChangeText={setTable}
      />

      <TouchableOpacity style={styles.button} onPress={openOrder}>
        <Text style={styles.btnText}>Abrir mesa</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    backgroundColor: '#1d1d2e'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 24
  },
  input: {
    width: '90%',
    height: 60,
    color: '#fff',
    backgroundColor: '#101026',
    borderRadius: 4,
    paddingHorizontal: 8,
    textAlign: "center",
    fontSize: 22
  },
  button: {
    width: '90%',
    height: 40,
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    marginVertical: 12,
    justifyContent: "center",
    alignItems: "center"
  },
  btnText: {
    fontSize: 18,
    color: '#101026',
    fontWeight: "bold"
  }
})