import React from "react"
import Link from "next/link"
import Router from "next/router"
import { notify } from "react-notify-toast"

import Layout from "../layouts/Main"
import addStyles from "../styles/pages/add"
import { createProduct } from "../api/product"

import ProductForm from "../components/ProductForm"

const onSubmit = async (values) => {
  try {
    const res = await createProduct(values)
    const json = await res.json()
    if (res.status === 200) {
      const id = json.data._id
      const asUrl = `/product/${id}`
      Router.push(
        {
          pathname: "/product",
          query: { id, message: "created" },
        },
        asUrl
      )
    } else {
      notify.show(json.error, "warning")
    }
  } catch (e) {
    notify.show("An error occurred", "error")
  }
}

export default () => (
  <Layout title="Add a new product">
    <h1>New product</h1>
    <h3>Add a new product to the store</h3>
    <div className="nav">
      <Link href={`/`}>
        <a>Home</a>
      </Link>
    </div>
    <ProductForm onSubmit={onSubmit} />
    <style jsx>{addStyles}</style>
  </Layout>
)
