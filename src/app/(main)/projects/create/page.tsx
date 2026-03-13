import CreateProjectForm from '@/components/features/projects/create-project-form';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateProject() {
  return (
    <div className="mx-auto max-w-3xl space-y-6 p-6">
      <Link
        href="/projects"
        className="text-md gap-2 font-semibold text-muted-foreground flex justify-start items-center pl-2 hover:bg-accent w-60 h-8 rounded-xl"
      >
        <ArrowLeft />
        Back to Projects
      </Link>

      <div>
        <h1 className="text-3xl font-semibold">Create New Project</h1>

        <p className="text-muted-foreground">
          Fill in the details to create a new project
        </p>
      </div>

      <CreateProjectForm />
    </div>
  );
}
