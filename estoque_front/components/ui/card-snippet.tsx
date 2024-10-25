"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React, { ReactNode, useState } from "react";

import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import { Switch } from "@/components/ui/switch";
import { themes } from "@/config/thems";
import { cn, hslToHex } from "@/lib/utils";
import { useThemeStore } from "@/store";
import { useTheme } from "next-themes";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";

interface CardSnippetProps {
  title?: string | ReactNode;
  subtitle?: string | null;
  header?: ReactNode | null;
  children: React.ReactNode;
  code?: string;
  headerClassName?: string;
}
const CardSnippet = ({
  title,
  subtitle,
  header,
  code,
  children,
  headerClassName = "",
}: CardSnippetProps) => {
  const [show, setShow] = useState(false);
  const toggle = () => {
    setShow(!show);
  };
  const { theme: mode } = useTheme();
  const { theme: config, setTheme: setConfig } = useThemeStore();
  const newTheme = themes.find((theme) => theme.name === config);

  const hslPrimary = `hsla(${
    newTheme?.cssVars[mode === "dark" ? "dark" : "light"][
      "secondary-foreground"
    ]
  })`;
  const hslPrimary2 = `hsla(${
    newTheme?.cssVars[mode === "dark" ? "dark" : "light"].secondary
  })`;

  const hexPrimary = hslToHex(hslPrimary);
  const hexPrimary2 = hslToHex(hslPrimary2);
  return (
    <Card>
      <CardHeader
        className={cn("md:flex md:flex-row flex-wrap items-center", headerClassName)}
      >
        {title && (
          <CardTitle className="flex-1 leading-normal"> {title}</CardTitle>
        )}
        {code && (
          <div className="flex-none">
            <Switch id="airplane-mode" onClick={toggle} />
          </div>
        )}
        {subtitle && (
          <div className="grid w-full">
            <div className="block flex-1 leading-normal text-slate-500">
              {" "}
              {subtitle}
            </div>
          </div>
        )}
        {header}
      </CardHeader>
      <CardContent>
        {children}
        <Collapsible open={show}>
          <CollapsibleContent className="CollapsibleContent">
            <SyntaxHighlighter
              language="javascript"
              className=" rounded-md  text-sm mt-6 "
              style={atomOneDark}
              customStyle={{
                padding: "24px",
                backgroundColor: mode !== "dark" ? hexPrimary : hexPrimary2,
              }}
            >
              {`${code}`}
            </SyntaxHighlighter>
          </CollapsibleContent>
        </Collapsible>
      </CardContent>
    </Card>
  );
};

export default CardSnippet;
