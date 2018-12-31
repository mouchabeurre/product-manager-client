import css from "styled-jsx/css"

const addStyles = css`
  h1,
  h3,
  a {
    font-family: Arial;
  }

  h1,
  h3 {
    text-align: left;
  }

  h1 {
    margin-bottom: 0;
  }
  h3 {
    margin-top: 0;
  }

  .nav {
    text-align: left;
    margin-bottom: 20px;
  }

  a {
    color: #5a5a5a;
    text-decoration: none;
    border: solid 2px;
    padding: 5px;
    font-size: 17px;
  }
`

export default addStyles
