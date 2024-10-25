"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import InitialsAvatar from "@/components/ui/initials-avatar";
import useAuth from "@/hooks/use-auth";
import { Icon } from "@iconify/react";
import Link from "next/link";
import UserAvatar from "../user-avatar";
const ProfileInfo = () => {
  const { data, logout } = useAuth();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className=" cursor-pointer">
        <div className=" flex items-center">
          <UserAvatar
            src={null}
            initials={data.user?.name ?? null}
            className={
              "transition-all hover:ring-8 ring-default-100 dark:ring-default-200"
            }
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 p-0" align="end">
        <DropdownMenuLabel className="flex gap-2 items-center mb-1 p-3">
          <InitialsAvatar name={data.user?.name ?? "Sem Nome"} />
          <div>
            <div className="text-sm font-medium text-default-800 capitalize ">
              {data?.user?.name}
            </div>
            <Link
              href="/"
              className="text-xs text-default-600 hover:text-primary"
            >
              {"@administrador"}
            </Link>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {[
            {
              name: "meus dados",
              icon: "heroicons:user",
              href: "/meus-dados", //"/perfil",
            },
          ].map((item, index) => (
            <Link
              href={item.href}
              key={`info-menu-${index}`}
              className="cursor-pointer"
            >
              <DropdownMenuItem className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize px-3 py-1.5 dark:hover:bg-background cursor-pointer">
                <Icon icon={item.icon} className="w-4 h-4" />
                {item.name}
              </DropdownMenuItem>
            </Link>
          ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={() => logout()}
          className="flex items-center gap-2 text-sm font-medium text-default-600 capitalize my-1 px-3 dark:hover:bg-background cursor-pointer"
        >
          <Icon icon="heroicons:power" className="w-4 h-4" />
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileInfo;
