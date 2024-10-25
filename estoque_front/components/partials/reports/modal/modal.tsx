import AutoFormModal from "@/components/ui/AutoForm/AutoFormModal/AutoFormModal";
import React, { useContext } from "react";
import { ReportsContext } from "../provider/Provider";
import { Report } from "@/types/Report";
import { HttpMethods } from "@/lib/type";
import { inputs } from "./inputs";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Icon } from "@iconify/react";
import PreDefinitions from "./preDefinitions";

export default function ReportModal() {
  const { state, setState } = useContext(ReportsContext);
  const generate = (data: Report) => {
    setState((values) => ({
      ...values,
      report: data,
      loading: false,
      initialized: true,
    }));
  };

  return (
    <AutoFormModal
      endpoint={`/reports/dre`}
      open={state.modal}
      setOpen={(open: boolean) =>
        setState((values) => ({ ...values, modal: open }))
      }
      onStart={() =>
        setState((values) => ({ ...values, loading: true, initialized: true }))
      }
      onFinish={generate}
      method={HttpMethods.GET}
      size={"lg"}
      fields={inputs}
      submitProps={{
        text: "Gerar Relatórios",
      }}
      dismissProps={{
        variant: "soft_bordered",
        color: "secondary",
      }}
    >
      <>
        <DialogHeader>
          <DialogTitle className="text-lg leading-6  flex items-center font-medium text-default-700 max-w-[230px] ">
            <Icon icon="heroicons:document" className="mr-1" fontSize={20} />{" "}
            Gerar Relatórios
          </DialogTitle>
        </DialogHeader>
        <p>
          Defina as datas inicial e final abaixo, ou selecione uma pré definição
          de intervalos para gerar o relatório.
        </p>
        <div className={"min-w-[250px]"}>
          <PreDefinitions />
        </div>
      </>
    </AutoFormModal>
  );
}
