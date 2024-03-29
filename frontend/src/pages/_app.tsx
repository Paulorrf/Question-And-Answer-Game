import { queryClient } from "@/services/queryClient";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";
import { Roboto_Flex } from "next/font/google";
import { CookiesProvider } from "react-cookie";

const roboto = Roboto_Flex({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={roboto.className}>
      <CookiesProvider>
        <QueryClientProvider client={queryClient}>
          <Component {...pageProps} />
        </QueryClientProvider>
      </CookiesProvider>
    </div>
  );
}
