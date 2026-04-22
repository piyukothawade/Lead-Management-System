import Modal from "./Modal";
import { Button } from "./button";

function ConfirmModal({
  open,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
}) {
  return (
    <Modal open={open} onClose={onClose} title={title}>
      <p className="text-sm text-gray-600 mb-4">
        {description}
      </p>

      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>

        <Button
          className="bg-red-600 hover:bg-red-700"
          onClick={onConfirm}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmModal;