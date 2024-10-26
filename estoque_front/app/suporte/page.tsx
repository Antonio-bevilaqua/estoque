"use client";

import authBg from "@/public/images/auth/161313.jpg";
import SupportForm from "./support-form";
import Script from "next/script";

export default function page() {
  return (
    <>
      <div
        className="loginwrapper grid w-full grid-cols-1 justify-start items-start relative overflow-hidden"
        style={{
          backgroundImage: `url(${authBg.src})`,
          backgroundSize: "cover",
          backgroundPosition: "center center",
        }}
      >
        <div className="w-full bg-background/90 md:bg-background md:w-[60vw] lg:w-[50vw] xl:w-[35vw] shadow-[0_0_30px_0_rgba(0,0,0,0.3)] py-8 rounded-none flex items-center relative z-10 p-2 md:p-14 h-full">
          <SupportForm />
        </div>
      </div>
      <Script strategy="lazyOnload" src="https://embed.tawk.to/6712a23c2480f5b4f58fadf8/1iagcjf08" />
    </>
  );
}
