import { struct } from "@/lib/type";
import { cn, initials } from "@/lib/utils";
import React from "react";

function InitialsAvatar({
  name,
  className = "",
  separator = " ",
  maxChars = 2,
  ...props
}: {
  name: string;
  className?: string;
  separator?: string;
  maxChars?: number;
  [key: string]: any;
}) {
  return (
    <div
      className={cn(
        "w-[36px] h-[36px] rounded-full bg-primary text-primary-foreground flex justify-center items-center capitalize font-bold",
        className
      )}
      {...props}
    >
      {initials(name, separator, maxChars)}
    </div>
  );
}

export default InitialsAvatar;
