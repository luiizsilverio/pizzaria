import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList
} from 'react-native'

import React, { useEffect, useState } from 'react'
import { useRoute, RouteProp, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Feather } from '@expo/vector-icons'

import { api } from '../../services/api'
import ModalPicker from '../../components/ModalPicker'
import ListItem from '../../components/ListItem'
import { StackParamsList } from '../../routes/app.routes'

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

type ProductProps = {
  id: string
  name: string
}

type ItemProps = {
  id: string
  product_id: string
  name: string
  amount: string | number
}

export default function Order() {
  const route = useRoute<OrderRouteProps>()
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>()

  const [categories, setCategories] = useState<CategoryProps[] | []>([])
  const [category, setCategory] = useState<CategoryProps | undefined>()
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false)

  const [products, setProducts] = useState<ProductProps[] | []>([])
  const [product, setProduct] = useState<ProductProps | undefined>()
  const [modalProductVisible, setModalProductVisible] = useState(false)

  const [amount, setAmount] = useState('1')
  const [items, setItems] = useState<ItemProps[]>([])


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


  function handleChangeProduct(item: ProductProps) {
    setProduct(item)
  }


  async function handleAdd() {
    const response = await api.post('/orders/add', {
      order_id: route.params?.order_id,
      product_id: product?.id,
      amount: Number(amount)
    })

    let data = {
      id: response.data.id,
      product_id: product?.id as string,
      name: product?.name as string,
      amount
    }

    setItems((oldValue) => [...oldValue, data])
  }


  async function handleDeleteItem(item_id: string) {
    await api.delete('/orders/remove', {
      params: {
        item_id
      }
    })

    const lista = items.filter(item => item.id !== item_id)

    setItems(lista)
  }


  function handleFinishOrder() {
    navigation.navigate("Finish", {
      table: route.params?.table,
      order_id: route.params?.order_id
    })
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


  useEffect(() => {
    async function loadProducts() {
      const response = await api.get('/categories/products', {
        params: {
          category_id: category?.id
        }
      })

      setProducts(response.data)
      setProduct(response.data[0])
    }

    loadProducts()
  }, [category])


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>
          Mesa {route.params.table}
        </Text>
        {
          items.length === 0 && (
            <TouchableOpacity onPress={handleDelete}>
              <Feather name="trash-2" size={28} color="#ff3f4b" />
            </TouchableOpacity>
          )
        }
      </View>

      {
        categories.length > 0 && (
          <TouchableOpacity
            style={styles.input}
            onPress={() => setModalCategoryVisible(true)}
          >
            <Text style={{color: '#fff'}}>
              { category?.name }
            </Text>
          </TouchableOpacity>
        )
      }

      {
        products.length > 0 && (
          <TouchableOpacity
            style={styles.input}
            onPress={() => setModalProductVisible(true)}
          >
            <Text style={{color: '#fff'}}>
              { product?.name }
            </Text>
          </TouchableOpacity>
        )
      }

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
        <TouchableOpacity style={styles.btnAdd} onPress={handleAdd}>
          <Text style={[styles.btnText, {fontSize: 20, color: '#fff'}]}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.btn, { opacity: items.length === 0 ? 0.3 : 1 }]}
          disabled={items.length === 0}
          onPress={handleFinishOrder}
        >
          <Text style={styles.btnText}>Avançar</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 24 }}
        data={ items }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListItem data={ item } deleteItem={handleDeleteItem} />
        )}
      />

      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType="fade"
      >
        <ModalPicker
          handleClose={() => setModalCategoryVisible(false)}
          options={categories}
          selectedItem={handleChangeCategory}
        />
      </Modal>

      <Modal
        transparent={true}
        visible={modalProductVisible}
        animationType="fade"
      >
        <ModalPicker
          handleClose={() => setModalProductVisible(false)}
          options={products}
          selectedItem={handleChangeProduct}
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