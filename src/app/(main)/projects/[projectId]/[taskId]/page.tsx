type MyOwnDetailTasksPageProps = {
  params: {
    taskId: string;
  };
};

export default function MyOwnDetailTasksPage({
  params,
}: MyOwnDetailTasksPageProps) {
  const { taskId } = params;
  return (
    <div>
      <h1>My Task Detail</h1>
      <p>Task ID: {taskId}</p>
    </div>
  );
}
