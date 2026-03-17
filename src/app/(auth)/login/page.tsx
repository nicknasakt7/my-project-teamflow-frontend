import LoginForm from '@/components/auth/login-form';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';

import { Metadata } from 'next';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Login',
};

export default function LoginPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* LEFT IMAGE */}
      <div className="relative hidden lg:block">
        <Image
          src="/login-bg.png"
          alt="dashboard"
          fill
          className="object-cover"
        />
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center min-h-screen bg-primary/40 px-4 py-16 ">
        <Card className="w-150 shadow-2xl border border-stone-300 rounded-4xl px-8">
          <CardHeader className="space-y-2 mt-10 text-center">
            <div className="flex justify-center items-center">
              <Image src="/logo.png" alt="logo" width={100} height={100} />
            </div>
            <CardTitle className="text-3xl space-y-2 font-bold">
              <h1>TEAM FLOW</h1>
              <h1>MANAGEMENT SYSTEM</h1>
            </CardTitle>

            <p className="text-md text-muted-foreground">
              Sign in to continue to your workspace
            </p>
          </CardHeader>
          <LoginForm />
          <p className="m-10 text-center text-sm text-muted-foreground">
            Don&apos;t have an account? Please contact your manager.
          </p>
        </Card>
      </div>
    </div>
  );
}
