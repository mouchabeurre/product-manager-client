import css from "styled-jsx/css"

const editStyles = css`
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

  button {
    background-color: rgb(199, 89, 89);
    border: none;
    color: white;
    padding: 6px 20px;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    margin-top: 10px;
  }
`

export default editStyles
