import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal } from 'react-native'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'
import { api } from '../../services/api'
import { useEffect, useState } from 'react'
import ModalPicker from '../../components/ModalPicker'

type RouteParams = {
  Order: {
    table: string | number
    order_id: string
  }
}

type OrderRouteProps = RouteProp<RouteParams, 'Order'>

type CategoryProps = {
  id: string
  name: string
}

export default function Order() {
  const route = useRoute<OrderRouteProps>()
  const navigation = useNavigation()
  const [categories, setCategories] = useState<CategoryProps[] | []>([])
  const [category, setCategory] = useState<CategoryProps>()
  const [amount, setAmount] = useState('1')
  const [modalVisible, setModalVisible] = useState(false)

  async function handleDelete() {
    try {
      await api.delete('/orders', {
        params: {
          order_id: route.params?.order_id
        }
      })

      navigation.goBack()

    } catch (err) {
      console.log(err)
    }
  }

  function handleChangeCategory(item: CategoryProps) {
    setCategory(item)
  }

  useEffect(() => {
    async function loadInfo() {
      const response = await api.get('/categories')

      setCategories(response.data)

      if (response.data.length > 0) {
        setCategory(response.data[0])
      } else {
        setCategory({} as CategoryProps)
      }
    }

    loadInfo()
  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Mesa {route.params.table}
        </Text>
        <TouchableOpacity onPress={handleDelete}>
          <Feather name="trash-2" size={28} color="#ff3f4b" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.input} onPress={() => setModalVisible(true)}>
        <Text style={{color: '#fff'}}>
          { category?.name }
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.input}>
        <Text style={{color: '#fff'}}>
          Pizza de calabresa
        </Text>
      </TouchableOpacity>

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>
        <TextInput
          placeholderTextColor="#f0f0f0"
          keyboardType="numeric"
          style={[styles.input, {width: '60%', textAlign: 'center'}]}
          value={amount}
          onChangeText={setAmount}
        />
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.btnAdd}>
          <Text style={[styles.btnText, {fontSize: 20, color: '#fff'}]}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
      >
        <ModalPicker
          handleClose={() => setModalVisible(false)}
          options={categories}
          selectedItem={handleChangeCategory}
        />
      </Modal>
    </View>
  )}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1d1d2e',
    paddingVertical: '5%',
    paddingHorizontal: '4%'
  },
  header: {
    flexDirection: 'row',
    marginBottom: 12,
    alignItems: 'center',
    marginTop: 24
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginRight: 14
  },
  input: {
    backgroundColor: '#101026',
    color: '#fff',
    borderRadius: 4,
    width: '100%',
    height: 40,
    marginBottom: 12,
    justifyContent: 'center',
    paddingHorizontal: 8,
    fontSize: 20
  },
  qtdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  qtdText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff'
  },
  actions: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },
  btnAdd: {
    width: '20%',
    height: 40,
    backgroundColor: '#3fd1ff',
    color: '#fff',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btnText: {
    color: '#101026',
    fontSize: 18,
    fontWeight: 'bold'
  },
  btn: {
    backgroundColor: '#3fffa3',
    borderRadius: 4,
    height: 40,
    width: '75%',
    alignItems: 'center',
    justifyContent: 'center'
  }
})