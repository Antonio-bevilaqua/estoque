"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import MobileSidebar from "./mobile-sidebar";
import PopoverSidebar from "./popover";

const Sidebar = () => {
  const isDesktop = useMediaQuery("(min-width: 1280px)");

  let selectedSidebar = null;

  if (!isDesktop) {
    selectedSidebar = <MobileSidebar />;
  } else {
    selectedSidebar = <PopoverSidebar />;
  }

  return <div>{selectedSidebar}</div>;
};

export default Sidebar;
