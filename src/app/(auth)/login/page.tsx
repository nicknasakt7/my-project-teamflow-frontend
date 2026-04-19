import LoginForm from '@/components/auth/login-form';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

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
      <div className="flex items-center justify-center min-h-screen bg-primary/40 px-4 py-4 relative">
        <Link href="/" className="absolute top-5 left-5 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="size-4" />
          Home
        </Link>
        <Card className="w-full max-w-md shadow-2xl border border-stone-300 rounded-4xl px-4">
          <CardHeader className="space-y-1 mt-4 text-center pb-1">
            <div className="flex justify-center items-center">
              <Image src="/logo.png" alt="logo" width={64} height={64} />
            </div>
            <CardTitle className="text-2xl space-y-0.5 font-bold">
              <h1>TEAM FLOW</h1>
              <h1>MANAGEMENT SYSTEM</h1>
            </CardTitle>

            <p className="text-sm text-muted-foreground">
              Sign in to continue to your workspace
            </p>
          </CardHeader>
          <LoginForm />
          <p className="mb-6 mt-2 text-center text-sm text-muted-foreground">
            Don&apos;t have an account? Please contact your manager.
          </p>
        </Card>
      </div>
    </div>
  );
}
