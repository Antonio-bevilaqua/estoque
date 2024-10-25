import {
  Cart,
  ClipBoard,
  Components,
  DashBoard,
  Graph,
  Settings
} from "@/components/svg";

export interface MenuItemProps {
  title: string;
  icon?: any;
  href?: string;
  child?: MenuItemProps[];
  megaMenu?: MenuItemProps[];
  multi_menu?: MenuItemProps[];
  nested?: MenuItemProps[];
  onClick?: () => void;
  isHeader?: boolean;
}

interface sidebarNavType {
  classic: MenuItemProps[];
}

interface menuConfigType {
  sidebarNav: sidebarNavType;
}

export const menusConfig: menuConfigType = {
  sidebarNav: {
    classic: [
      {
        isHeader: true,
        title: "Navegação",
      },
      {
        title: "inicio",
        icon: DashBoard,
        href: "/inicio",
      },
      {
        title: "produtos",
        icon: Components,
        href: "/produtos",
      },
      {
        title: "despesas",
        icon: ClipBoard,
        href: "/despesas",
      },
      {
        title: "vendas",
        icon: Cart,
        href: "/vendas",
      },
      {
        title: "relatórios",
        icon: Graph,
        href: "/relatorios",
      },
      {
        title: "configurações",
        icon: Settings,
        href: "/configuracoes",
      },
    ],
  },
};

export type ClassicNavType = (typeof menusConfig.sidebarNav.classic)[number];
