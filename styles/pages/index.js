import css from "styled-jsx/css"

const homeStyles = css`
  h1,
  h2,
  h4,
  div,
  a {
    font-family: Arial;
  }

  h2,
  h4 {
    margin: 0;
  }

  h1 {
    color: #5a5a5a;
  }

  h4 {
    margin-bottom: 20px;
  }

  ul {
    list-style: none;
    padding: 0;
    margin-top: 25px;
  }

  ul > li:nth-child(odd) {
    background-color: #9aadb6;
  }

  ul > li:nth-child(even) {
    background-color: #a4b1be;
  }

  li {
    margin-bottom: 25px;
    box-shadow: -1px 1px 8px 0px #00000038;
    transition: 150ms ease-in-out;
  }

  li:hover {
    box-shadow: -1px 1px 8px 0px #0000005c;
  }

  a {
    color: #93ffb1;
    text-decoration: none;
    font-size: 17px;
    border: solid 2px;
    padding: 5px;
  }

  .empty {
    margin-top: 50px;
    font-size: 20px;
  }
`

export default homeStyles
