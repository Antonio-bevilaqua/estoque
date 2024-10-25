"use client";

import authBg from "@/public/images/auth/161313.jpg";
import ForgotForm from "./forgot-form";
import { useState } from "react";
import SentEmail from "./sent-email";

export default function page() {
  const [sent, setSent] = useState(false);
  return (
    <div
      className="loginwrapper grid w-full grid-cols-1 justify-end items-end relative overflow-hidden"
      style={{
        backgroundImage: `url(${authBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="w-full bg-white/90 md:bg-white md:w-[60vw] lg:w-[50vw] xl:w-[35vw] shadow-[0_0_30px_0_rgba(0,0,0,0.3)] py-8 rounded-none flex items-center relative z-10 p-2 md:p-14 bg-neutral-100 h-full">
        {!sent ? <ForgotForm setSent={setSent} /> : <SentEmail />}
      </div>
    </div>
  );
}
