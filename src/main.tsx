import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";

// const queryClient = new QueryClient({
//   defaultOptions: {
//     queries: {
//       gcTime: 1000 * 60 * 60 * 24, // 24 hours
//     },
//   },
// });

// import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
// import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: false,
      staleTime: 24 * 60 * 60 * 1000,
    },
  },
});

// const persister = createSyncStoragePersister({
//   storage: window.localStorage,
// });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        {/* <PersistQueryClientProvider
          client={queryClient}
          persistOptions={{ persister }}
        > */}
        <App />
        <ReactQueryDevtools client={queryClient} />
      </QueryClientProvider>
      {/* </PersistQueryClientProvider> */}
    </BrowserRouter>
  </React.StrictMode>
);
