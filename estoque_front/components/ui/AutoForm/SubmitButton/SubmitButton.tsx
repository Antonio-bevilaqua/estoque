import { AutoFormContext } from "@/components/ui/AutoForm/Context/AutoFormProvider";
import { Button, ButtonProps } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Loader2Icon } from "lucide-react";
import { ReactNode, useContext } from "react";

export type SubmitButtonProps = Omit<ButtonProps, "onSubmit" | "onClick"> & {
  onSubmit: (formData: FormData | { [key: string]: any }) => Promise<any> | any;
  className?: string;
  loading?: boolean;
  disabled?: boolean;
  asForm?: boolean;
  text: string | ReactNode;
  icon?: string;
};

const SubmitButton = ({
  onSubmit,
  className = "",
  loading = false,
  disabled = false,
  asForm = false,
  text = "Salvar Alterações",
  icon = "heroicons:check-circle",
  ...props
}: SubmitButtonProps) => {
  const ctx = useContext(AutoFormContext);

  const handleOnClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.preventDefault();
    if (ctx.isValid()) {
      return onSubmit(asForm ? ctx.getFormData() : ctx.getValues());
    }
  };

  return (
    <Button
      className={className}
      disabled={disabled || loading}
      onClick={handleOnClick}
      {...props}
    >
      {text}{" "}
      {loading ? (
        <Loader2Icon className="animate-spin h-5 w-5 ml-2" />
      ) : (
        <Icon icon={icon} className=" h-5 w-5 ml-2" />
      )}
    </Button>
  );
};

export default SubmitButton;
