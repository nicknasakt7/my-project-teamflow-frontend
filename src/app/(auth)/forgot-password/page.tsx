import ForgotPasswordForm from '@/components/auth/forgot-password-form';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ForgotPasswordPage() {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      {/* LEFT IMAGE */}
      <div className="relative hidden lg:block">
        <Image src="/login-bg.png" alt="background" fill className="object-cover" />
      </div>

      {/* RIGHT FORM */}
      <div className="flex items-center justify-center min-h-screen bg-primary/40 px-4 py-8 relative">
        <Link
          href="/login"
          className="absolute top-5 left-5 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="size-4" />
          Back to Login
        </Link>

        <Card className="w-full max-w-md shadow-2xl border border-stone-300 rounded-4xl px-6">
          <CardHeader className="space-y-1 mt-6 text-center pb-4">
            <div className="flex justify-center items-center">
              <Image src="/logo.png" alt="logo" width={64} height={64} />
            </div>
            <CardTitle className="text-2xl font-bold">Forgot Password</CardTitle>
            <p className="text-sm text-muted-foreground">
              Enter your email and we&apos;ll send you a reset link
            </p>
          </CardHeader>

          <div className="px-2 pb-8">
            <ForgotPasswordForm />
          </div>
        </Card>
      </div>
    </div>
  );
}
