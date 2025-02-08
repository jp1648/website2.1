import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";

const theme = createTheme();

const root = createRoot(document.getElementById("root"));
root.render(
  <ThemeProvider theme={theme}>
    <App />
    <Analytics />
  </ThemeProvider>
);
