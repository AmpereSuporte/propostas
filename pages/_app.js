import { useState } from "react";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const [credentials, setCredentials] = useState({});
  return (
    <Component
      setCredentials={setCredentials}
      credentials={credentials}
      {...pageProps}
    />
  );
}

export default MyApp;
