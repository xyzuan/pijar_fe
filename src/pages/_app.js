import "@/styles/globals.css";

import { store } from "@/redux/store";
import { Provider } from "react-redux";
import BaseLayout from "@/components/BaseLayout";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <BaseLayout>
        <Component {...pageProps} />
      </BaseLayout>
    </Provider>
  );
}
