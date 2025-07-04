import { IService } from "@interfaces/IService";
import React from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@ui/dialog";
import { ServiceForm } from "@components/Forms/ServiceForm";

interface Props {
  open: boolean;
  onClose: () => void;
  onServiceCreated: () => void;
  service?: IService | null;
}

export const ServiceModal = ({
  open,
  onClose,
  onServiceCreated,
  service,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className="!max-w-[90vw] sm:!max-w-[800px] !w-full"
        aria-describedby={undefined}
      >
        <DialogHeader>
          <DialogTitle>
            {service ? "Editar Servicio" : "Nuevo Servicio"}
          </DialogTitle>
        </DialogHeader>
        <ServiceForm
          service={service}
          onServiceCreated={onServiceCreated}
          onClose={onClose}
        />
      </DialogContent>
    </Dialog>
  );
};
