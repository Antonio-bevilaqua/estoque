import useAutoForm from "@/components/ui/AutoForm/hook/use-auto-form";
import ReactSelect from "@/components/ui/react-select";
import { dateIntervals } from "@/lib/date-intervals";
import toast from "react-hot-toast";

export default function PreDefinitions() {
  const { setValues } = useAutoForm();

  const preDefinitionHandler = (option: any) => {
    const idx = Number(option.value);
    const initial_date = dateIntervals[idx].initial_date;
    const final_date = dateIntervals[idx].final_date;

    setValues({
      initial_date: initial_date,
      final_date: final_date,
    });
    toast.success(
      `Pŕe-definição "${dateIntervals[idx].name}" preenchida com sucesso.`
    );
  };

  return (
    <div className={"min-w-[250px]"}>
      <ReactSelect
        id="pre-definicoes"
        name="pre-definicoes"
        placeholder="Pré-definições de intervalos"
        value=""
        options={dateIntervals.map((element, index) => ({
          label: element.name,
          value: index.toString(),
        }))}
        onChange={preDefinitionHandler}
      />
    </div>
  );
}
