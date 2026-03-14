import RegisterMemberForm from '@/components/features/employees/register-member-form';
import { CircleCheckBig, UserPlus } from 'lucide-react';

export default function RegisterAdminPage() {
  return (
    <div className="flex gap-8 p-6 ">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-120 h-[calc(96vh-1rem)] rounded-xl bg-card-foreground p-10 flex-col justify-center gap-6">
        <UserPlus className="rounded-md bg-muted text-background size-15 p-2" />
        <h1 className="text-4xl font-bold mb-4 text-background">
          Admin Registration
        </h1>

        <p className="text-background mb-6 text-xl">
          Create administrator accounts to manage your team and projects
          efficiently.
        </p>

        <ul className=" space-y-3 text-lg text-background">
          <li className="flex gap-2">
            <CircleCheckBig /> Full access to system management
          </li>
          <li className="flex gap-2">
            <CircleCheckBig /> Team member oversight
          </li>
          <li className="flex gap-2">
            <CircleCheckBig /> Project creation & management
          </li>
        </ul>
      </div>

      {/* RIGHT PANEL */}

      {/* <AddMemberForm /> */}

      {/* RIGHT PANEL */}
      <div className="flex flex-1 justify-center items-start">
        <div className="w-200 rounded-xl border bg-card p-6 shadow-sm">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold">Create Administrator</h2>

            <p className="text-lg text-muted-foreground">
              Create an administrator account
            </p>
          </div>

          <RegisterMemberForm />
        </div>
      </div>
    </div>
  );
}
