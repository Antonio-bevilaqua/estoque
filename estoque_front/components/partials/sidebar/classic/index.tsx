"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { menusConfig } from "@/config/menus";
import { cn, getDynamicPath, isLocationMatch } from "@/lib/utils";
import { useSidebar, useThemeStore } from "@/store";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import SidebarLogo from "../common/logo";
import MenuLabel from "../common/menu-label";
import NestedSubMenu from "../common/nested-menus";
import SingleMenuItem from "./single-menu-item";
import SubMenuHandler from "./sub-menu-handler";
const ClassicSidebar = () => {
  const { sidebarBg } = useSidebar();
  const [activeSubmenu, setActiveSubmenu] = useState<number | null>(null);
  const [activeMultiMenu, setMultiMenu] = useState<number | null>(null);
  const menus = menusConfig?.sidebarNav?.classic || [];
  const { collapsed, setCollapsed } = useSidebar();
  const { isRtl } = useThemeStore();
  const [hovered, setHovered] = useState<boolean>(false);

  const toggleSubmenu = (i: number) => {
    if (activeSubmenu === i) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(i);
    }
  };

  const toggleMultiMenu = (subIndex: number) => {
    if (activeMultiMenu === subIndex) {
      setMultiMenu(null);
    } else {
      setMultiMenu(subIndex);
    }
  };

  const pathname = usePathname();
  const locationName = getDynamicPath(pathname);

  React.useEffect(() => {
    let subMenuIndex = null;
    let multiMenuIndex = null;
    menus?.map((item: any, i: number) => {
      if (item?.child) {
        item.child.map((childItem: any, j: number) => {
          if (isLocationMatch(childItem.href, locationName)) {
            subMenuIndex = i;
          }
          if (childItem?.multi_menu) {
            childItem.multi_menu.map((multiItem: any, k: number) => {
              if (isLocationMatch(multiItem.href, locationName)) {
                subMenuIndex = i;
                multiMenuIndex = j;
              }
            });
          }
        });
      }
    });
    setActiveSubmenu(subMenuIndex);
    setMultiMenu(multiMenuIndex);
  }, [locationName]);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={cn(
        "fixed  z-[999] top-0  bg-card h-full hover:!w-[248px]  border-r  ",
        {
          "w-[248px]": !collapsed,
          "w-[72px]": collapsed,
          "shadow-md": collapsed || hovered,
        }
      )}
    >
      {sidebarBg !== "none" && (
        <div
          className=" absolute left-0 top-0   z-[-1] w-full h-full bg-cover bg-center opacity-[0.07]"
          style={{ backgroundImage: `url(${sidebarBg})` }}
        ></div>
      )}

      <SidebarLogo hovered={hovered} />

      <ScrollArea
        className={cn("sidebar-menu  h-[calc(100%-80px)] ", {
          "px-4": !collapsed || hovered,
        })}
      >
        <ul
          dir={isRtl ? "rtl" : "ltr"}
          className={cn(" space-y-1", {
            " space-y-2 text-center": collapsed,
            "text-start": collapsed && hovered,
          })}
        >
          {menus.map((item, i) => (
            <li key={`menu_key_${i}`}>
              {/* single menu  */}

              {!item.child && !item.isHeader && (
                <SingleMenuItem
                  item={item}
                  collapsed={collapsed}
                  hovered={hovered}
                />
              )}

              {/* menu label */}
              {item.isHeader && !item.child && (!collapsed || hovered) && (
                <MenuLabel item={item} />
              )}

              {/* sub menu */}
              {item.child && (
                <>
                  <SubMenuHandler
                    item={item}
                    toggleSubmenu={toggleSubmenu}
                    index={i}
                    activeSubmenu={activeSubmenu}
                    collapsed={collapsed}
                    hovered={hovered}
                  />

                  {(!collapsed || hovered) && (
                    <NestedSubMenu
                      toggleMultiMenu={toggleMultiMenu}
                      activeMultiMenu={activeMultiMenu}
                      activeSubmenu={activeSubmenu}
                      item={item}
                      index={i}
                    />
                  )}
                </>
              )}
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  );
};

export default ClassicSidebar;