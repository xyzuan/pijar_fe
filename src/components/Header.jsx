import React from "react";
import Logo from "./Logo";
import { kronaOne } from "@/constant/fonts";
import Link from "next/link";

function Header() {
  return (
    <header>
      <div className="flex container max-w-screen-xl justify-between items-center">
        <Link href="/">
          <Logo />
        </Link>
        <nav>
          <ul className={`${kronaOne.className} flex flex-row gap-8`}>
            <Link href="/">
              <li>Home</li>
            </Link>
            <li>About Us</li>
            <Link href="/events">
              <li>Events</li>
            </Link>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
