import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./components";
import "./styles/index.scss";
// make web component available with an import
// import "./webComponents/Counter";

const root = createRoot(document.getElementById("root"));

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
