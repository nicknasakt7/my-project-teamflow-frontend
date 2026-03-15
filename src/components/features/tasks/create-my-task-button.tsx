type CreateMyTaskButtonProps = {
  onClick: () => void;
};

export default function CreateMyTaskButton({
  onClick,
}: CreateMyTaskButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-secondary px-4 py-3 text-white"
    >
      + Create My Task
    </button>
  );
}
