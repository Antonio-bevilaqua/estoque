import {
  Collapsible,
  CollapsibleContent
} from "@/components/ui/collapsible";
import { cn, getDynamicPath, isLocationMatch } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
const MultiNestedMenu = ({
  subItem,
  subIndex,
  activeMultiMenu,
}: {
  subItem: any;
  subIndex: number;
  activeMultiMenu: number | null;
}) => {
  const pathname = usePathname();
  const locationName = getDynamicPath(pathname);

  return (
    <Collapsible open={activeMultiMenu === subIndex}>
      <CollapsibleContent className="CollapsibleContent">
        <ul className="space-y-3 pl-1">
          {subItem?.multi_menu?.map((item: any, i: number) => (
            <li className=" first:pt-3" key={i}>
              <Link href={item.href}>
                <span
                  className={cn(
                    "text-sm flex gap-3  items-center transition-all duration-150 capitalize hover:text-primary",
                    {
                      " text-primary  ": isLocationMatch(
                        item.href,
                        locationName
                      ),
                      " text-default-600": !isLocationMatch(
                        item.href,
                        locationName
                      ),
                    }
                  )}
                >
                  <span
                    className={cn(
                      "inline-flex h-2 w-2  border border-default-500 rounded-full ",
                      {
                        "bg-primary ring-primary/30   ring-[4px]  border-primary  ":
                          isLocationMatch(item.href, locationName),
                      }
                    )}
                  ></span>
                  <span className="flex-1">{item.title}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default MultiNestedMenu;