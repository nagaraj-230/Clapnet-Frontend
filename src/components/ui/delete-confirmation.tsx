import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface DeleteConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
  description?: string;
  itemName?: string;
  destructiveAction?: string;
}

export const DeleteConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  itemName = "item",
  destructiveAction = "Delete"
}: DeleteConfirmationProps) => {
  const defaultTitle = `Confirm ${destructiveAction}`;
  const defaultDescription = `Are you sure you want to ${destructiveAction.toLowerCase()} this ${itemName}? This action cannot be undone.`;

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title || defaultTitle}</AlertDialogTitle>
          <AlertDialogDescription>
            {description || defaultDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction 
            onClick={onConfirm} 
            className="bg-destructive hover:bg-destructive/90"
          >
            {destructiveAction}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};