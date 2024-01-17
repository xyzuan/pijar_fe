import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { poppins } from "@/constant/fonts";
import { Toaster } from "./ui/sonner";

function BaseLayout({ children }) {
  return (
    <div className={`${poppins.className}`}>
      <Header />
      <div className="my-12">{children}</div>
      <Footer />
      <Toaster richColors position="top-right" />
    </div>
  );
}

export default BaseLayout;
