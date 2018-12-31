import React from "react"
import Link from "next/link"
import { notify } from "react-notify-toast"

import Layout from "../layouts/Main"
import productStyles from "../styles/pages/product"
import { getProduct } from "../api/product"

import Product from "../components/Product"

export default class ProductPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: props.product,
      message: props.message,
      error: undefined,
    }
  }

  componentDidMount() {
    const { message } = this.state
    if (message) {
      switch (message) {
        case "updated":
          notify.show("product updated", "success")
          break
        case "created":
          notify.show("product added", "success")
          break
        case "removed":
          notify.show("product removed", "success")
          break
      }
    }
  }

  render() {
    const { product, error } = this.state
    return (
      <Layout title={`Product: ${product.name}`}>
        <h1>Product overview</h1>
        <h3>A closer look at the product</h3>
        <div className="nav">
          <Link href={`/`}>
            <a>Back to the list</a>
          </Link>
        </div>
        {error ? (
          <div className="error">{error}</div>
        ) : (
          <Product product={product} />
        )}
        <style jsx>{productStyles}</style>
      </Layout>
    )
  }

  static async getInitialProps({ query }) {
    try {
      const { id, message } = query
      const res = await getProduct(id)
      const json = await res.json()
      if (res.status === 200) {
        return { product: json.data, message }
      } else {
        return { error: json.error }
      }
    } catch (e) {
      return { error: "An error occurred" }
    }
  }
}
