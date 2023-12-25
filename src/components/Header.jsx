import React from "react";
import Logo from "./Logo";
import { kronaOne } from "@/constant/fonts";

function Header() {
  return (
    <header>
      <div className="flex container max-w-screen-xl justify-between items-center">
        <div>
          <Logo />
        </div>
        <nav>
          <ul className={`${kronaOne.className} flex flex-row gap-8`}>
            <li>Home</li>
            <li>About Us</li>
            <li>Ticket</li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
