/* eslint-disable @next/next/inline-script-id */
import "../styles/globals.css";

import Analytics from "analytics";
import type { AppProps } from "next/app";
import { useAnalytics } from "../utils/analytics";

function MyApp({ Component, pageProps }: AppProps) {
  useAnalytics();
  return <Component {...pageProps} />;
}

export default MyApp;
