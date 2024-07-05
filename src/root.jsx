import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./components/Layout";
import { ProvideContext } from "./context";
import "./root.scss";
import Home from "./routes/Home";
import Saved from "./routes/Saved";
import Time from "./routes/Time";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="saved" element={<Saved />} />
      <Route path="time" element={<Time />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ProvideContext>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </ProvideContext>
);
