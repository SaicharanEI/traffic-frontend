import { useState } from "react";
import Toast from "./Toast";

type FetchState<T> = {
  data: T | null;
  loading: boolean;
  error: string | null;
};

const useFetch = <T,>() => {
  const [state, setState] = useState<FetchState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = async (url: string, method: string = "GET", data?: any) => {
    setState({ data: null, loading: true, error: null });
    // console.log(data, url, method);
    const requestOptions: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : undefined,
    };

    try {
      console.log(
        import.meta.env.VITE_API_BASE_URL,
        "import.meta.env.VITE_API_BASE_URL"
      );
      const response = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}${url}`,
        requestOptions
      );
      const responseData = await response.json();
      //   console.log(response, "response", responseData.data);
      if (!response.ok) {
        Toast.fire({
          icon: "error",
          title: responseData.message,
        });
        throw new Error(responseData.message || "Network response was not ok");
      } else {
        if (method !== "GET") {
          Toast.fire({
            icon: "success",
            title: responseData.message,
          });
        }
        setState({ data: responseData.data, loading: false, error: null });
      }
    } catch (error: any) {
      // console.log(error);
      setState({ data: null, loading: false, error: error.message });
    }
  };

  return {
    state,
    fetchData,
  };
};

export default useFetch;
