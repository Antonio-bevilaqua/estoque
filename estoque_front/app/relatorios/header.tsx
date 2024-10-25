import { Button } from "@/components/ui/button";
import { CardTitle } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import React, { useContext } from "react";
import { ReportsContext } from "../../components/partials/reports/provider/Provider";

export default function Header() {
  const { setState } = useContext(ReportsContext);
  return (
    <CardTitle className="flex-1 flex flex-col md:flex-row justify-between leading-normal">
      Relatórios{" "}
      <Button
        variant="soft"
        onClick={() => setState((values) => ({ ...values, modal: true }))}
      >
        <Icon icon="heroicons:plus-circle" className=" h-5 w-5 mr-2 " /> Gerar
      </Button>
    </CardTitle>
  );
}
