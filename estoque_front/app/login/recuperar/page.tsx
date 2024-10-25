"use client";

import authBg from "@/public/images/auth/161313.jpg";
import RecoveryForm from "./recovery-form";

export default function page() {

  return (
    <div
      className="loginwrapper grid w-full grid-cols-1 justify-start items-start relative overflow-hidden"
      style={{
        backgroundImage: `url(${authBg.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="w-full bg-white/90 md:bg-white md:w-[60vw] lg:w-[50vw] xl:w-[35vw] shadow-[0_0_30px_0_rgba(0,0,0,0.3)] py-8 rounded-none flex items-center relative z-10 p-2 md:p-14 bg-neutral-100 h-full">
        <RecoveryForm />
      </div>
    </div>
  );
}
