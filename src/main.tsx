import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@emotion/react";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
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
      // refetchOnReconnect: true,
      // refetchOnMount: true,
      refetchIntervalInBackground: true,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
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
    </BrowserRouter>
  </React.StrictMode>
);
