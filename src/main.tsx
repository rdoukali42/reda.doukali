import { createRoot } from "react-dom/client";
import { MotionProvider } from "@/components/motion/MotionProvider";
import App from "./App.tsx";
import "@fontsource/jetbrains-mono/latin-500.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <MotionProvider>
    <App />
  </MotionProvider>,
);
