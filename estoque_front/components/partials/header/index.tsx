"use client";
import { cn } from "@/lib/utils";
import { useSidebar, useThemeStore } from "@/store";
import React, { useEffect } from "react";
import ProfileInfo from "./profile-info";
import ThemeButton from "./theme-button";
import VerticalHeader from "./vertical-header";

import { useMediaQuery } from "@/hooks/use-media-query";
import FullScreen from "./full-screen";
import ClassicHeader from "./layout/classic-header";
import MobileMenuHandler from "./mobile-menu-handler";

const NavTools = ({ isDesktop }: { isDesktop: boolean }) => {
  return (
    <div className="nav-tools flex items-center  gap-2">
      {isDesktop && <FullScreen />}

      <ThemeButton />

      <div className="ltr:pl-2 rtl:pr-2">
        <ProfileInfo />
      </div>
      {!isDesktop && <MobileMenuHandler />}
    </div>
  );
};
const Header = () => {
  const { collapsed } = useSidebar();
  const { navbarType } = useThemeStore();

  const isDesktop = useMediaQuery("(min-width: 1280px)");

  return (
    <ClassicHeader
      className={cn("", {
        "ltr:xl:ml-[248px] rtl:xl:mr-[248px]": !collapsed,
        "ltr:xl:ml-[72px] rtl:xl:mr-[72px]": collapsed,
        "sticky top-0": navbarType === "sticky",
      })}
    >
      <div className="w-full bg-card/90 backdrop-blur-lg md:px-6 px-[15px] py-3 border-b">
        <div className="flex justify-between items-center h-full">
          <VerticalHeader />
          <NavTools isDesktop={isDesktop} />
        </div>
      </div>
    </ClassicHeader>
  );
};

export default Header;
