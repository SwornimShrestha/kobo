import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "@mantine/core/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dates/styles.css";
import "mantine-react-table/styles.css";

import { MantineProvider } from "@mantine/core";
import { ApiConfigProvider } from "./context/ApiConfigContext.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiConfigProvider>
      <MantineProvider>
        <App />
      </MantineProvider>
    </ApiConfigProvider>
  </StrictMode>
);
