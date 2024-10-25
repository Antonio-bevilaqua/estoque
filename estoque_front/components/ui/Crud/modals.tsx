import React, { useContext } from "react";
import CrudSaveModal, { CrudSaveModalProps } from "./save-modal";
import CrudDeleteModal, { CrudDeleteModalProps } from "./delete-modal";
import { ModalOptionsContext } from "./provider";
import CrudRegisterModal from "./register-modal";

export type CrudModalProps = {
  saveModalProps: Omit<CrudSaveModalProps, "open" | "setOpen" | "element">;
  deleteModalProps: Omit<CrudDeleteModalProps, "open" | "setOpen" | "element">;
  withAdd?: boolean;
  withEdit?: boolean;
  withRemove?: boolean;
};

export default function CrudModals({
  saveModalProps,
  deleteModalProps,
  withAdd = true,
  withEdit = true,
  withRemove = true,
}: CrudModalProps) {
  const { state, setState } = useContext(ModalOptionsContext);
  return (
    <>
      {withAdd && (
        <CrudRegisterModal
          open={state.newOpen}
          setOpen={(open: boolean) =>
            setState({
              ...state,
              newOpen: open,
              element: null,
            })
          }
          element={state.element}
          {...saveModalProps}
        />
      )}

      {withEdit && (
        <CrudSaveModal
          open={state.editOpen}
          setOpen={(open: boolean) =>
            setState({
              ...state,
              editOpen: open,
              element: open ? state.element : null,
            })
          }
          element={state.element}
          {...saveModalProps}
        />
      )}

      {withRemove && (
        <CrudDeleteModal
          open={state.removeOpen}
          setOpen={(open: boolean) =>
            setState({
              ...state,
              removeOpen: open,
              element: open ? state.element : null,
            })
          }
          element={state.element}
          {...deleteModalProps}
        />
      )}
    </>
  );
}
