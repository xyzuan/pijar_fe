import Logo from "./Logo";
import Link from "next/link";
import React, { useState } from "react";
import { kronaOne } from "@/constant/fonts";
import Auth from "./Auth";
import { Button } from "./ui/button";

function Header() {
  const [showNav, setShowNav] = useState(false);

  function handleMobileNav() {
    if (showNav) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }

  return (
    <header className="bg-[#09090b] bg-opacity-55 fixed w-full z-20 top-0 left-0 backdrop-blur-2xl  rounded-b-3xl">
      <div className="h-[82px] flex container max-w-screen-xl justify-between items-center mx-auto">
        <Link href="/">
          <Logo />
        </Link>
        <nav>
          <ul
            className={`${kronaOne.className}  flex-row gap-8 items-center md:flex hidden`}
          >
            <Link href="/">
              <li>Home</li>
            </Link>
            <li>About Us</li>
            <Link href="/events">
              <li>Events</li>
            </Link>
            <Auth />
          </ul>
          <Button
            className="md:hidden visible"
            onClick={() => handleMobileNav()}
          >
            X
          </Button>
        </nav>
      </div>
      {showNav && (
        <div className="w-full">
          <nav>
            <ul
              className={`${kronaOne.className} flex flex-col gap-8 justify-center items-center w-full p-8`}
            >
              <Link href="/">
                <li>Home</li>
              </Link>
              <li>About Us</li>
              <Link href="/events">
                <li>Events</li>
              </Link>
              <Auth />
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;
