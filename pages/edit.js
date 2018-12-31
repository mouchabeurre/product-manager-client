import React from "react"
import Link from "next/link"
import Router from "next/router"
import { notify } from "react-notify-toast"

import Layout from "../layouts/Main"
import editStyles from "../styles/pages/edit"
import { getProduct, updateProduct, deleteProduct } from "../api/product"

import ProductForm from "../components/ProductForm"

export default class AddProductPage extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      product: props.product,
      error: undefined,
    }
  }

  onSubmit = async (values) => {
    try {
      const id = this.state.product._id
      const res = await updateProduct(id, values)
      const json = await res.json()
      if (res.status === 200) {
        const asUrl = `/product/${this.state.product._id}`
        Router.push(
          {
            pathname: "/product",
            query: { id: this.state.product._id, message: "updated" },
          },
          asUrl
        )
      } else {
        notify.show(json.error, "warning")
      }
    } catch (e) {
      notify.show("an error occurred", "error")
    }
  }

  onRemove = async (e) => {
    try {
      const id = this.state.product._id
      const res = await deleteProduct(id)
      const json = await res.json()
      if (json.success) {
        const asUrl = "/"
        Router.push(
          {
            pathname: "/",
            query: { message: "removed" },
          },
          asUrl
        )
      } else {
        notify.show("failed to update product", "error")
      }
    } catch (e) {
      notify.show("failed to update product", "error")
    }
  }

  render() {
    const { error, product } = this.state
    return (
      <Layout title={`Edit ${product.name}`}>
        <h1>Edit product</h1>
        <h3>Change the product properties</h3>
        <div className="nav">
          <Link href={`/`}>
            <a>Home</a>
          </Link>
        </div>
        <ProductForm onSubmit={this.onSubmit} product={product} />
        {error && <div>An error occured: {error}</div>}
        <button onClick={this.onRemove}>Delete</button>
        <style jsx>{editStyles}</style>
      </Layout>
    )
  }

  static async getInitialProps({ query }) {
    try {
      const res = await getProduct(query.id)
      const json = await res.json()
      if (json.success) {
        return { product: json.data }
      } else {
        return { error: "Server error" }
      }
    } catch (e) {
      return { error: "Failed to fetch product" }
    }
  }
}
