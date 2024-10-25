import useAutoTable from "@/components/ui/AutoTable/hook/useAutoTable";
import { Button } from "@/components/ui/button";
import useApi from "@/hooks/use-api";
import { RefreshCcwIcon } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

function SyncButton({ endpoint }: { endpoint: string }) {
  const fetcher = useApi();
  const { refresh, page, setPage } = useAutoTable();
  const [state, setState] = useState({
    sincronizing: false,
  });

  const onSynchronize = async () => {
    if (state.sincronizing) return;

    setState({ sincronizing: true });
    const response = await fetcher.post(endpoint, {});

    setState({ sincronizing: false });

    if (!response)
      return toast.error("Ops... erro ao sincronizar dados, tente novamente");

    if (page === 1) {
      refresh();
    } else {
      setPage(1);
    }
    toast.success("Dados sincronizados com sucesso!");
  };

  return (
    <Button
      type="button"
      variant="soft_bordered"
      disabled={state.sincronizing}
      onClick={() => onSynchronize()}
    >
      <RefreshCcwIcon
        size={"1rem"}
        className={state.sincronizing ? "animate-spin mr-1" : "mr-1"}
      />{" "}
      {state.sincronizing ? "Sincronizando..." : "Sincronizar"}
    </Button>
  );
}

export default SyncButton;
