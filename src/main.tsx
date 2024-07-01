import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { store } from "./store/store";
import "./index.css";
// import { PersistGate } from "redux-persist/integration/react";
// import persistStore from "redux-persist/es/persistStore";
import theme from "./utils/theme";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       gcTime: 1000 * 60 * 60 * 24, // 24 hours
//     },
//   },
// });

import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});
// let persistor = persistStore(store);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <PersistGate persistor={persistor}> */}
        <ThemeProvider theme={theme}>
          {/* <QueryClientProvider client={queryClient}> */}
          <PersistQueryClientProvider
            client={queryClient}
            persistOptions={{ persister }}
          >
            <App />
            <ReactQueryDevtools client={queryClient} />
            {/* </QueryClientProvider> */}
          </PersistQueryClientProvider>
        </ThemeProvider>
        {/* </PersistGate> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
