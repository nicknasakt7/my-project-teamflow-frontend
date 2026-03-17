export default function ProjectItem({
  title,
  progress,
  status,
}: {
  title: string;
  progress: number;
  status: string;
}) {
  return (
    <div className="p-4 border rounded space-y-2">
      <div className="flex justify-between">
        <p className="font-medium">{title}</p>
        <span className="text-md text-card bg-muted px-2 py-1 rounded">
          {status}
        </span>
      </div>

      <div className="w-full h-2 bg-muted rounded">
        <div
          className="h-2 bg-black rounded"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
