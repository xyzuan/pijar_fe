import React from "react";
import Logo from "./Logo";
import { kronaOne } from "@/constant/fonts";
import Link from "next/link";

function Header() {
  return (
    <nav className="bg-[#09090b] bg-opacity-55 fixed w-full z-20 top-0 left-0 backdrop-blur-2xl">
      <div className="h-[82px] flex container max-w-screen-xl justify-between items-center mx-auto">
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
    </nav>
  );
}

export default Header;
