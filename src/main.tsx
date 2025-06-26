import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { GlobalStyles, StyledEngineProvider } from "@mui/material";
import WeatherCard from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <StyledEngineProvider enableCssLayer>
      <GlobalStyles styles="@layer theme, base, mui, components, utilities;" />
      <WeatherCard />
    </StyledEngineProvider>
  </StrictMode>
);
