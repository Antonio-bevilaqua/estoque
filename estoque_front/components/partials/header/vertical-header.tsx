import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store";
import React from "react";
import VerticalLogo from "../logo/vertical-logo";

const MenuBar = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}) => {
  return (
    <button
      className="relative group  disabled:cursor-not-allowed opacity-50"
      onClick={() => setCollapsed(!collapsed)}
    >
      <div>
        <div
          className={cn(
            "flex flex-col justify-between w-[20px] h-[16px] transform transition-all duration-300 origin-center overflow-hidden",
            {
              "-translate-x-1.5 rotate-180": collapsed,
            }
          )}
        >
          <div
            className={cn(
              "bg-card-foreground h-[2px] transform transition-all duration-300 origin-left delay-150",
              {
                "rotate-[42deg] w-[11px]": collapsed,
                "w-7": !collapsed,
              }
            )}
          ></div>
          <div
            className={cn(
              "bg-card-foreground h-[2px] w-7 rounded transform transition-all duration-300",
              {
                "translate-x-10": collapsed,
              }
            )}
          ></div>
          <div
            className={cn(
              "bg-card-foreground h-[2px] transform transition-all duration-300 origin-left delay-150",
              {
                "-rotate-[43deg] w-[11px]": collapsed,
                "w-7": !collapsed,
              }
            )}
          ></div>
        </div>
      </div>
    </button>
  );
};

const VerticalHeader: React.FC = () => {
  const { collapsed, setCollapsed, subMenu } = useSidebar();
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  let menuBarContent = null;
  let mobileIcon = null;

  menuBarContent = (
    <MenuBar collapsed={collapsed} setCollapsed={setCollapsed} />
  );

  if ((subMenu && isDesktop) || !isDesktop) {
    menuBarContent = null;
    mobileIcon = <VerticalLogo className="h-[2.75rem] w-auto" />;
  }

  return (
    <>
      <div className="flex items-center md:gap-6 gap-3">
        {mobileIcon}
        {menuBarContent}
      </div>
    </>
  );
};

export default VerticalHeader;
