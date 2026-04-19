import AssignedTaskList from '@/components/features/tasks/assigned-task-list';

export default function AssignedTasksPage() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-4xl font-semibold">Assigned Tasks</h1>
        <p className="text-xl text-muted-foreground">
          Tasks assigned to you
        </p>
      </div>
      <AssignedTaskList />
    </div>
  );
}
