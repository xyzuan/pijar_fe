import { kronaOne } from "@/constant/fonts";
import React from "react";

function Logo() {
  return (
    <div>
      <h3 className={`${kronaOne.className} text-[32px]`}>
        Pijar<span className="text-[#F04BFF]">.</span>
      </h3>
    </div>
  );
}

export default Logo;
