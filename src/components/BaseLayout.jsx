import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { poppins } from "@/constant/fonts";

function BaseLayout({ children }) {
  return (
    <div className={`${poppins.className}`}>
      <Header />
      <div className="my-12">{children}</div>
      <Footer />
    </div>
  );
}

export default BaseLayout;
