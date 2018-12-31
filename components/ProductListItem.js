import Link from "next/link"
import { linkStyles, itemStyles } from "../styles/components/item"

export default (props) => {
  return (
    <Link
      href={{ pathname: `/product`, query: { id: props.product._id } }}
      as={`/product/${props.product._id}`}>
      <a style={linkStyles}>
        <div style={itemStyles}>{props.product.name}</div>
      </a>
    </Link>
  )
}
