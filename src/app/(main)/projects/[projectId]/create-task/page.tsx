import CreateTaskForm from '@/components/features/tasks/task-form';
import { employeeService } from '@/lib/api/employee/employee.service';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

type Params = { projectId: string };

export default async function CreateTask({ params }: { params: Promise<Params> }) {
  const { projectId } = await params;

  let members: { id: string; firstName: string; lastName: string }[] = [];
  try {
    const res = await employeeService.getEmployees({ limit: 100 });
    members = res.employees.map((e) => ({
      id: e.id,
      firstName: e.firstName,
      lastName: e.lastName,
    }));
  } catch {
    // members stays empty — AssignSelect will show empty list
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-start ml-80 items-center gap-3 mb-6">
        <Link
          href={`/projects/${projectId}`}
          className="gap-4 text-md font-semibold text-muted-foreground flex items-center p-2 hover:bg-accent h-8 rounded-xl"
        >
          <ArrowLeft />
          Back to Project
        </Link>
      </div>

      <CreateTaskForm projectId={projectId} members={members} />
    </div>
  );
}
