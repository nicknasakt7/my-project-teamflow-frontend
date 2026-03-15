import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type CreateTaskDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function CreateTaskDialog({
  open,
  onOpenChange,
}: CreateTaskDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle>Create New Task</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Title</label>
            <input
              className="border rounded-md p-2"
              placeholder="Enter task title"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="border rounded-md p-2"
              placeholder="Enter task description"
            />
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-medium">Priority</label>
              <select className="border rounded-md p-2">
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label className="text-sm font-medium">Due Date</label>
              <input type="date" className="border rounded-md p-2" />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={() => onOpenChange(false)}
              className="border px-4 py-2 rounded-md"
            >
              Cancel
            </button>

            <button className="bg-secondary text-white px-4 py-2 rounded-md">
              Create Task
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
