import React from "react"
import Link from "next/link"
import { notify } from "react-notify-toast"

import Layout from "../layouts/Main"
import homeStyles from "../styles/pages/index"
import { getProducts } from "../api/product"

import ProductListItem from "../components/ProductListItem"

export default class IndexPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      products: props.products,
      message: props.message,
      error: undefined,
    }
  }

  componentDidMount() {
    const { message } = this.state
    if (message) {
      switch (message) {
        case "removed":
          notify.show("product removed", "success")
          break
      }
    }
  }

  render() {
    const { error, products } = this.state
    return (
      <Layout>
        <h1>Welcome to Amazno</h1>
        <h2>
          <i>The</i> best online store
        </h2>
        <h4>when it comes to look like a todo-list!</h4>
        {error && <div>There was an error: {error}</div>}
        <Link href="/add">
          <a>[+] New product</a>
        </Link>
        {products && products.length > 0 ? (
          <ul>
            {products.map((p) => (
              <li key={p._id}>
                <ProductListItem product={p} />
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty">No product in the store!</div>
        )}
        <style jsx>{homeStyles}</style>
      </Layout>
    )
  }

  static async getInitialProps({ query }) {
    try {
      const res = await getProducts()
      const json = await res.json()
      if (res.status === 200) {
        const { message } = query
        return { products: json.data, message }
      } else {
        return { error: json.error }
      }
    } catch (e) {
      return { error: "An error occured" }
    }
  }
}
