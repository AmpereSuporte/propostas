import { useState } from "react";
import "../styles/globals.css";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
function MyApp({ Component, pageProps }) {
  const [credentials, setCredentials] = useState({});
  return (
    <DndProvider backend={HTML5Backend}>
      <Component
        setCredentials={setCredentials}
        credentials={credentials}
        {...pageProps}
      />
    </DndProvider>
  );
}

export default MyApp;
