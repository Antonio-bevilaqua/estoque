import Image from "next/image";
import InitialsAvatar from "../ui/initials-avatar";
import { cn } from "@/lib/utils";

function UserAvatar({
  src = null,
  initials = null,
  className = "",
  width = 36,
  height = 36,
}: {
  src?: any;
  initials?: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    <div className="flex items-center">
      {src ? (
        <Image
          src={src}
          alt=""
          width={36}
          height={36}
          className={cn("rounded-full", className)}
        />
      ) : (
        <InitialsAvatar name={initials ?? "S N"} className={className} style={{
          width: `${width}px`,
          height: `${height}px`
        }} />
      )}
    </div>
  );
}

export default UserAvatar;
