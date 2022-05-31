import Head from "next/head";
import { ChangeEvent, FormEvent, useState } from "react";
import { FiUpload } from "react-icons/fi";
import { toast } from "react-toastify";
import { Header } from "../../components/Header";
import { setupAPIClient } from "../../services/api";
import { canSSRAuth } from "../../utils/canSSRAuth";
import styles from './styles.module.scss'

type ItemProps = {
  id: string
  name: string
}

interface CategoryProps {
  categories: ItemProps[]
}

export default function Product({ categories }: CategoryProps) {
  const [avatarUrl, setAvatarUrl] = useState('')
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')
  const [price, setPrice] = useState('')
  const [category_id, setCategory_id] = useState('')
  const [description, setDescription] = useState('')

  function handleFile(event: ChangeEvent<HTMLInputElement>) {
    if (!event.target.files)  return;

    const image = event.target.files[0]

    if (!image) return;

    if (image.type === 'image/jpeg' || image.type === 'image/png') {
      setFile(image)
      setAvatarUrl(URL.createObjectURL(image)) // gerar um link com preview da imagem
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()

    if (!name || !price || !description || !file) {
      toast.error("Preencha todos os dados")
      return
    }
    if (!category_id || category_id === "0") {
      toast.error("Informe a categoria")
      return
    }

    try {
      const data = new FormData()
      console.log('categoria:', category_id)

      data.append('name', name)
      data.append('price', price)
      data.append('description', description)
      data.append('category_id', category_id)
      data.append('file', file)

      const api = setupAPIClient()

      await api.post('/products', data)

      toast.success('Produto cadastrado com sucesso!')

    } catch(err) {
      console.log(err)
      toast.error("Erro ao cadastrar!")
    }

    setName('')
    setPrice('')
    setDescription('')
    setAvatarUrl('')
    setCategory_id('0')
    setFile(null)
  }

  return (
    <>
      <Head>
        <title>My-Piza - Novo produto</title>
      </Head>
      <div>
        <Header />

        <main className={styles.container}>
          <h1>Novo produto</h1>

          <form className={styles.form} onSubmit={handleSubmit}>

            <label className={styles.avatar}>
              <span>
                <FiUpload size={30} color="#fff" />
              </span>

              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleFile}
              />

              {
                avatarUrl && (
                  <img
                    src={avatarUrl}
                    className={styles.preview}
                    alt="Foto do produto"
                    width={250}
                    height={250}
                  />
                )
              }
            </label>

            <select
              value={category_id}
              onChange={(e) => setCategory_id(e.target.value)}
            >
              <option key="0" value="0">Selecione a Categoria</option>
              {
                categories.map((item) => (
                  <option key={ item.id } value={ item.id }>
                    { item.name }
                  </option>
                ))
              }
            </select>

            <input type="text"
              placeholder="Digite o nome do produto"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input type="number"
              placeholder="Preço do produto (R$)"
              className={styles.input}
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <textarea
              placeholder="Descreva seu produto..."
              className={styles.input}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit" className={styles.button}>
              Cadastrar
            </button>
          </form>
        </main>
      </div>
    </>
  )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const api = setupAPIClient(ctx)

  const response = await api.get('/categories')

  return {
    props: {
      categories: response.data || []
    }
  }
})