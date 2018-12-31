import React from "react"

import { existsByName } from "../api/product"
import {
  formStyles,
  buttonStyles,
  wrapperStyles,
  labelStyles,
  inputStyles,
} from "../styles/components/form"

export default class ProductForm extends React.Component {
  constructor(props) {
    super(props)
    this.debounceTimeout = undefined
    this.initialState = {
      name: props.product ? props.product.name : undefined,
      price: props.product ? (props.product.price / 100).toString() : undefined,
    }
    this.state = {
      name: props.product ? props.product.name : "",
      price: props.product ? (props.product.price / 100).toString() : "",
      error: undefined,
      disabled: true,
    }
  }

  debounce = (func, time) => {
    return (...args) => {
      clearTimeout(this.debounceTimeout)
      this.debounceTimeout = setTimeout(() => func.apply(this, args), time)
    }
  }

  onNameChange = (e) => {
    const name = e.target.value
    this.setState({ disabled: true })
    if (!name || name.match(/^\w+$/)) {
      this.setState({ name })
      this.debounce(async () => {
        clearTimeout(this.debounceTimeout)
        this.debounceTimeout = undefined
        if (name) {
          try {
            const res = await existsByName(name)
            const json = await res.json()
            if (res.status === 200) {
              if (json.exists && name !== this.initialState.name) {
                this.setState({ error: "This product already exists" })
              } else {
                this.setState({ error: undefined })
                if (
                  name !== this.initialState.name &&
                  this.state.price !== ""
                ) {
                  this.setState({ disabled: false })
                }
              }
            }
          } catch (e) {
            this.setState({ error: "Couldn't look up name availability" })
          }
        }
      }, 500)()
    }
  }

  onAmountChange = (e) => {
    const price = e.target.value
    if (!price || price.match(/^\d+(\.\d{0,2})?$/)) {
      this.setState({ price })
      if (!price) {
        this.setState({ disabled: true })
      } else {
        if (
          this.state.error === undefined &&
          price !== this.initialState.price &&
          this.state.name !== "" &&
          !this.debounceTimeout
        ) {
          this.setState({ disabled: false })
        } else {
          this.setState({ disabled: true })
        }
      }
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.setState({ error: undefined })
    this.props.onSubmit({
      name: this.state.name,
      price: parseFloat(this.state.price, 10) * 100,
    })
  }

  componentWillUnmount() {
    clearTimeout(this.debounceTimeout)
  }

  render() {
    const { name, price, error, disabled } = this.state
    return (
      <div>
        <form style={formStyles} onSubmit={this.onSubmit}>
          <div style={wrapperStyles}>
            <label style={labelStyles}>Name</label>
            <input
              type="text"
              placeholder="Name"
              style={inputStyles}
              value={name}
              onChange={this.onNameChange}
              required
              autoFocus
            />
          </div>
          <div style={wrapperStyles}>
            <label style={labelStyles}>Price</label>
            <input
              type="text"
              style={inputStyles}
              placeholder="Price"
              value={price}
              onChange={this.onAmountChange}
              required
            />
          </div>
          <button style={buttonStyles} type="submit" disabled={disabled}>
            Save
          </button>
          {error && <p>{error}</p>}
        </form>
        <style jsx>{`
          button:disabled {
            background-color: #5d5d5d !important;
            cursor: default !important;
          }
        `}</style>
      </div>
    )
  }
}
