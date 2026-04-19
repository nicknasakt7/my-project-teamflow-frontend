import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Plus, UserPlus } from 'lucide-react';
import Link from 'next/link';

export default function QuickOperations() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Quick Operations</CardTitle>
      </CardHeader>

      <CardContent className="space-y-5 h-45">
        <Button
          className="w-full justify-center h-11 gap-2 text-md transition-all duration-200 hover:-translate-y-0.5"
          asChild
        >
          <Link href="/projects/create">
            <Plus className="size-6" />
            Create Project
          </Link>
        </Button>

        <Button
          variant="outline"
          className="w-full justify-center h-11 gap-2 text-md transition-all duration-200 hover:-translate-y-0.5"
          asChild
        >
          <Link href="/employees/create">
            <UserPlus className="size-6" />
            Add Employee
          </Link>
        </Button>

        <Button
          variant="destructive"
          className="w-full justify-center h-11 gap-2 text-md transition-all duration-400
  hover:scale-105 hover:shadow-xl
  relative overflow-hidden
  before:absolute before:inset-0
  before:bg-linear-to-r
  before:from-transparent before:via-white/40 before:to-transparent
  before:translate-x-[-120%]
  hover:before:translate-x-[120%]
  before:transition-transform before:duration-700"
          asChild
        >
          <Link href="/projects/overdue">
            <AlertTriangle className="size-6" />
            View Overdue Tasks
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
