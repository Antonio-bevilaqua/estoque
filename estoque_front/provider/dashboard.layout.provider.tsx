"use client";
import RequireAuthStatus from "@/components/auth/require-auth-status";
import Header from "@/components/partials/header";
import Sidebar from "@/components/partials/sidebar";
import MobileSidebar from "@/components/partials/sidebar/mobile-sidebar";
import { AuthStatus } from "@/hooks/use-auth";
import { useMounted } from "@/hooks/use-mounted";
import { cn } from "@/lib/utils";
import { useSidebar } from "@/store";
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import React from "react";
const DashBoardLayoutProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { collapsed } = useSidebar();
  const location = usePathname();
  const mounted = useMounted();

  const isLoginPage = () => {
    return location.includes("login");
  };

  if (!mounted) {
    return <></>;
  }

  if (isLoginPage() || location === "/" || location === "") {
    return (
      <RequireAuthStatus
        status={AuthStatus.GUEST}
        onFailureRedirectRoute="/inicio"
      >
        {children}
      </RequireAuthStatus>
    );
  }

  if (location.includes("suporte")) {
    return <>{children}</>;
  }

  return (
    <RequireAuthStatus
      status={AuthStatus.AUTHENTICATED}
      onFailureRedirectRoute="/login"
    >
      <Header />
      <Sidebar />

      <div
        className={cn("content-wrapper transition-all duration-150 ", {
          "ltr:xl:ml-[248px] rtl:xl:mr-[248px] ": !collapsed,
          "ltr:xl:ml-[72px] rtl:xl:mr-[72px]": collapsed,
        })}
      >
        <div className={cn("  pt-6 px-6 pb-8  page-min-height ", {})}>
          <LayoutWrapper location={location}>{children}</LayoutWrapper>
        </div>
      </div>
    </RequireAuthStatus>
  );
};

export default DashBoardLayoutProvider;

const LayoutWrapper = ({
  children,
  location,
}: {
  children: React.ReactNode;
  location: any;
}) => {
  return (
    <>
      <motion.div
        key={location}
        initial="pageInitial"
        animate="pageAnimate"
        exit="pageExit"
        variants={{
          pageInitial: {
            opacity: 0,
            y: 50,
          },
          pageAnimate: {
            opacity: 1,
            y: 0,
          },
          pageExit: {
            opacity: 0,
            y: -50,
          },
        }}
        transition={{
          type: "tween",
          ease: "easeInOut",
          duration: 0.5,
        }}
      >
        <main>{children}</main>
      </motion.div>

      <MobileSidebar className="left-[300px]" />
    </>
  );
};
