import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { setup } from "./dojo/generated/setup.ts";
import { DojoProvider } from "./dojo/DojoContext.tsx";
import { dojoConfig } from "../dojoConfig.ts";
import { ThemeContextProvider } from "./Theme";
import NavBar from './components/NavBar/NavBar';
import Loader from "@/components/Loader/Loader";

import "./globals.scss";
import 'react-loading-skeleton/dist/skeleton.css'
// import "bootstrap/dist/css/bootstrap.min.css";
import "./components/Button/Button.css"

async function init() {
  const rootElement = document.getElementById("root");
  if (!rootElement) throw new Error("React root not found");
  // Style html
  const html = document.querySelector("html");
  if (html) {
    html.setAttribute("data-bs-theme", "dark");
    html.classList.add("theme-dark")
    html.classList.add("h-100")
  }
  const root = ReactDOM.createRoot(rootElement as HTMLElement);

  const setupResult = await setup(dojoConfig);
  {/* <React.StrictMode> */}
  {/* </React.StrictMode> */}
  root.render(
      <DojoProvider value={setupResult}>
        <ThemeContextProvider>
        <NavBar />
        <div className="m-4">
          <App />
        </div>
        <Loader/>
        </ThemeContextProvider>
      </DojoProvider>
  );
}

init();
