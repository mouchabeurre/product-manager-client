import fetch from "isomorphic-unfetch"

const baseUrl = "http://localhost:2000/api"

export const getProducts = () => fetch(`${baseUrl}/`)
export const getProduct = (id) => fetch(`${baseUrl}/product/${id}`)
export const existsByName = (name) => fetch(`${baseUrl}/existsByName/${name}`)

export const createProduct = (values) =>
  fetch(`${baseUrl}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  })
export const updateProduct = (id, values) =>
  fetch(`${baseUrl}/product/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(values),
  })
export const deleteProduct = (id) =>
  fetch(`${baseUrl}/product/${id}`, {
    method: "DELETE",
  })
