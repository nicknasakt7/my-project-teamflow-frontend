import CreateMemberForm from '@/components/features/employees/create-member-form';
import { CircleCheckBig, UserPlus } from 'lucide-react';

export default function CreateMemberPage() {
  return (
    <div className="flex gap-8 p-6 items-stretch">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-125 rounded-xl bg-primary p-10 flex-col justify-center gap-6">
        <UserPlus className="rounded-md bg-primary-foreground/10 text-primary-foreground size-15 p-2" />
        <h1 className="text-4xl font-bold mb-4 text-primary-foreground">
          Add Team Member
        </h1>

        <p className="text-primary-foreground/80 mb-6 text-xl">
          Create new team member accounts to collaborate on projects and tasks.
        </p>

        <ul className="space-y-3 text-lg text-primary-foreground/80">
          <li className="flex gap-2">
            <CircleCheckBig className="shrink-0" /> Access to assigned projects
          </li>
          <li className="flex gap-2">
            <CircleCheckBig className="shrink-0" /> Task management capabilities
          </li>
          <li className="flex gap-2">
            <CircleCheckBig className="shrink-0" /> Team collaboration tools
          </li>
        </ul>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-1 justify-center items-stretch">
        <div className="w-200 rounded-xl border bg-card p-6 shadow-sm flex flex-col">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Create Member</h2>

            <p className="text-lg text-muted-foreground">
              Fill in the information below to add a new member.
            </p>
          </div>

          <CreateMemberForm />
        </div>
      </div>
    </div>
  );
}
