import BaseLayout from "@/components/BaseLayout";
import Header from "@/components/Header";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <BaseLayout>
        <body>
          <Main />
          <NextScript />
        </body>
      </BaseLayout>
    </Html>
  );
}
