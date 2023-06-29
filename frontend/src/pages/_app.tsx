import { queryClient } from "@/services/queryClient";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { Roboto_Flex } from "next/font/google";

axios.defaults.baseURL =
  "https://question-and-answer-game-production.up.railway.app/";

const roboto = Roboto_Flex({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={roboto.className}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </div>
  );
}
