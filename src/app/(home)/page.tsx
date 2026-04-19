import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { manrope } from '@/styles/fonts';
import { Badge } from '@/components/ui/badge';
import { Settings2, LogOut, LogIn } from 'lucide-react';
import { auth } from '@/lib/auth/auth';
import { logout } from '@/lib/actions/auth.action';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'TeamFlow — Manage Projects with Precision',
};

export default async function HomePage() {
  const session = await auth();
  const isLoggedIn = !!session;
  const role = session?.user?.roleType;
  const dashboardHref = role === 'EMPLOYEE' ? '/tasks' : '/dashboard';

  return (
    <div className={`min-h-screen bg-background ${manrope.variable}`}>
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-5 border-b border-border">
        <span className="text-xl font-bold tracking-widest text-foreground uppercase">
          Team Flow
        </span>

        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <Link href={dashboardHref}>
              <Button size="sm" className="rounded-full px-5 gap-2 text-sm">
                Go to App
              </Button>
            </Link>
            <form action={async () => { 'use server'; await logout(); }}>
              <Button type="submit" variant="ghost" size="sm" className="gap-2 text-muted-foreground">
                <LogOut className="size-4" />
                Logout
              </Button>
            </form>
          </div>
        ) : (
          <Link
            href="/login"
            className="flex items-center gap-2 text-md font-semibold text-foreground hover:text-primary transition-colors"
          >
            <LogIn className="size-4" />
            Login
          </Link>
        )}
      </header>

      {/* Hero */}
      <main className="max-w-6xl mx-auto px-8 py-20 flex flex-col lg:flex-row items-center gap-12">
        {/* Left */}
        <div className="flex-1 space-y-6">
          <Badge
            variant="outline"
            className="gap-2 px-3 py-1.5 text-xs font-semibold tracking-widest uppercase border-border text-muted-foreground bg-secondary"
          >
            <Settings2 className="size-3.5" />
            Engineered for Precision
          </Badge>

          <h1
            className="text-5xl lg:text-6xl font-extrabold leading-[1.05] tracking-tight text-foreground"
            style={{ fontFamily: 'var(--font-manrope), sans-serif' }}
          >
            Manage
            <br />
            Project with
            <br />
            absolute
            <br />
            precision.
          </h1>

          <p className="max-w-sm text-base text-muted-foreground leading-relaxed">
            A project management platform built for small tech organizations.
            Admins create and assign tasks to team members, track progress
            across projects, and keep everything on schedule — while members
            stay focused with clear task ownership, due dates, and team-wide
            collaboration through comments.
          </p>
        </div>

        {/* Right */}
        <div className="flex-1 flex justify-center lg:justify-end">
          <div className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden shadow-2xl bg-secondary">
            <Image
              src="/home-pic.png"
              alt="Team working"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </main>
    </div>
  );
}
