import { PersonalForm } from "@components/Forms/PersonalForm";
import { IEmployee } from "@interfaces/IEmployee";
import { IService } from "@interfaces/IService";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@ui/dialog";

interface Props {
  open: boolean;
  onClose: () => void;
  onPersonalCreated: () => void;
  employee?: IEmployee | null;
  services: IService[];
}

export const PersonalModal = ({
  open,
  onClose,
  onPersonalCreated,
  employee,
  services,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="!max-w-[90vw] sm:!max-w-[800px] !w-full">
        <DialogHeader>
          <DialogTitle>
            {employee ? "Editar Empleado" : "Nuevo Empleado"}
          </DialogTitle>
        </DialogHeader>
        <PersonalForm
          services={services}
          employee={employee}
          onPersonalCreated={onPersonalCreated}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};
