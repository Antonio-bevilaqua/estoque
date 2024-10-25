import { useSidebar } from "@/store";
import HorizontalLogo from "../../logo/horizontal-logo";
import VerticalLogo from "../../logo/vertical-logo";

const SidebarLogo = ({ hovered }: { hovered?: boolean }) => {
  const { sidebarType, setCollapsed, collapsed } = useSidebar();
  return (
    <div className="px-4 py-2 ">
      <div className=" flex items-center">
        <div className="flex flex-1 items-center justify-center gap-x-3  ">
          {!collapsed || hovered ? (
            <HorizontalLogo className="h-[2.75rem] w-auto" />
          ) : (
            <VerticalLogo className="h-[2.75rem] w-auto" />
          )}
        </div>
        {sidebarType === "classic" && (!collapsed || hovered) && (
          <div className="flex-none lg:block hidden">
            <div
              onClick={() => setCollapsed(!collapsed)}
              className={`h-4 w-4 border-[1.5px] border-default-900 dark:border-default-200 rounded-full transition-all duration-150
          ${
            collapsed
              ? ""
              : "ring-2 ring-inset ring-offset-4 ring-default-900  bg-default-900  dark:ring-offset-default-300"
          }
          `}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SidebarLogo;
