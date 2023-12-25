import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { poppins } from "@/constant/fonts";

function BaseLayout({ children }) {
  return (
    <div className={`${poppins.className}`}>
      <Header />
      {children}
      <Footer />
    </div>
  );
}

export default BaseLayout;
