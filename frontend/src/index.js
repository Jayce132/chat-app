import React from "react";
import { createRoot } from 'react-dom/client';
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { StoreProvider } from "./context/store/storeContext";


const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <StoreProvider>
    <App />
  </StoreProvider>
  );

serviceWorker.unregister();
