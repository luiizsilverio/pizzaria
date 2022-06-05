import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";

interface CategoryProps {
  id: string
  name: string
}

interface ModalProps {
  options: CategoryProps[]
  handleClose: () => void
  selectedItem: (item: CategoryProps) => void
}

const { width: largura, height: altura } = Dimensions.get('window')

export default function ModalPicker({ options, handleClose, selectedItem }: ModalProps) {

  const lista = options.map((item, index) => (
    <TouchableOpacity
    key={ item.id }
    style={styles.lista}
    onPress={() => onPressItem(item)}
    >
      <Text style={styles.item}>
        {item?.name}
      </Text>
    </TouchableOpacity>
  ))

  function onPressItem(item: CategoryProps) {
    selectedItem(item)
    handleClose()
  }

  return (
    <TouchableOpacity style={styles.container} onPress={handleClose}>
      <View style={styles.content}>
        <ScrollView
          showsVerticalScrollIndicator={false}
        >
          { lista }
        </ScrollView>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  content: {
    width: largura - 20,
    height: altura / 2,
    backgroundColor: '#fff',
    borderWidth: 0.8,
    borderColor: '#8a8a8a',
    borderRadius: 4
  },
  lista: {
    alignItems: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: '#8a8a8a'
  },
  item: {
    margin: 18,
    fontSize: 14,
    fontWeight: "bold",
    color: '#101026'
  }
})
