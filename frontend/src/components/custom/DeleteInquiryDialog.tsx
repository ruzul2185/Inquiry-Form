import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { Inquiry } from "../../types/InquiryTypes";

interface DeleteInquiryDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
  data: Inquiry | null;  // added prop
}

export default function DeleteInquiryDialog({
  open,
  setOpen,
  onConfirm,
  data,
}: DeleteInquiryDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this inquiry? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        {/* Show inquiry details */}
        {data ? (
          <div className="mb-4 space-y-1 p-4 border rounded bg-gray-50 text-sm text-gray-700">
            <p><strong>Full Name:</strong> {data.full_name}</p>
            <p><strong>Phone Number:</strong> {data.phone_number}</p>
            <p><strong>Email:</strong> {data.email || "N/A"}</p>
            <p><strong>Reference:</strong> {data.reference}</p>
            {/* Add any other fields you'd like here */}
          </div>
        ) : (
          <p className="mb-4 text-sm text-gray-500">Loading inquiry details...</p>
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="mr-2">Cancel</Button>
          </DialogClose>
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
