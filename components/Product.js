import Link from "next/link"
import {
  wrapperStyles,
  infoWrapperStyles,
  infoStyles,
  editStyles,
} from "../styles/components/product"

const getDateFromTimestamp = (timestamp) => {
  const d = new Date(timestamp)
  const month = (d.getMonth() + 1).toString().padStart(2, 0)
  const day = (d.getDay() + 1).toString().padStart(2, 0)
  const year = d.getFullYear()
  return `${month}/${day}/${year}`
}

export default (props) => {
  return (
    <div style={wrapperStyles}>
      <div style={infoWrapperStyles}>
        <span>Name:</span>
        <span style={infoStyles}>{props.product.name}</span>
      </div>
      <div style={infoWrapperStyles}>
        <span>Price: </span>
        <span style={infoStyles}>
          {(props.product.price / 100).toString()}€
        </span>
      </div>
      <div style={infoWrapperStyles}>
        <span>Creation date: </span>
        <span style={infoStyles}>
          {getDateFromTimestamp(props.product.date)}
        </span>
      </div>
      <Link
        href={{ pathname: `/edit`, query: { id: props.product._id } }}
        as={`/product/${props.product._id}/edit`}>
        <a style={editStyles}>Edit</a>
      </Link>
    </div>
  )
}
