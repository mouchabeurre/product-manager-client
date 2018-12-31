import Head from "next/head"
import Notifications from "react-notify-toast"

const mainStyles = {
  width: "20%",
  minWidth: 320,
}

const wrapperStyles = {
  background:
    "linear-gradient(-145deg, rgba(158, 200, 208, 0.8), rgba(255,0,0,0) 70.71%), linear-gradient(90deg, rgba(125, 123, 152, 0.8), rgba(0,255,0,0)), linear-gradient(-20deg, rgba(84, 102, 109, 0.8), rgba(0,0,255,0))",
  minHeight: "100vh",
  minWidth: "100vw",
  position: "absolute",
  top: 0,
  left: 0,
  color: "white",
}

export default ({ children, title }) => {
  const dynamicTitle = title ? `Amazno | ${title}` : "Amazno"
  return (
    <>
      <Notifications options={{ timeout: 2000 }} />
      <Head>
        <title>{dynamicTitle}</title>
      </Head>
      <center style={wrapperStyles}>
        <main style={mainStyles}>{children}</main>
      </center>
    </>
  )
}
