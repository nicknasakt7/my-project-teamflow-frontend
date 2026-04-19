import RegisterMemberForm from '@/components/features/employees/register-member-form';
import { CircleCheckBig, UserPlus } from 'lucide-react';
import { auth } from '@/lib/auth/auth';
import { notFound } from 'next/navigation';

export default async function RegisterAdminPage() {
  const session = await auth();
  if (session?.user?.roleType !== 'SUPER_ADMIN') notFound();
  return (
    <div className="flex gap-8 p-6 items-stretch">
      {/* LEFT PANEL */}
      <div className="hidden lg:flex w-120 rounded-xl bg-primary p-10 flex-col justify-center gap-6">
        <UserPlus className="rounded-md bg-primary-foreground/10 text-primary-foreground size-15 p-2" />
        <h1 className="text-4xl font-bold mb-4 text-primary-foreground">
          Admin Registration
        </h1>

        <p className="text-primary-foreground/80 mb-6 text-xl">
          Create administrator accounts to manage your team and projects
          efficiently.
        </p>

        <ul className="space-y-3 text-lg text-primary-foreground/80">
          <li className="flex gap-2">
            <CircleCheckBig className="shrink-0" /> Full access to system management
          </li>
          <li className="flex gap-2">
            <CircleCheckBig className="shrink-0" /> Team member oversight
          </li>
          <li className="flex gap-2">
            <CircleCheckBig className="shrink-0" /> Project creation & management
          </li>
        </ul>
      </div>

      {/* RIGHT PANEL */}
      <div className="flex flex-1 justify-center items-stretch">
        <div className="w-200 rounded-xl border bg-card p-6 shadow-sm flex flex-col">
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
