'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CheckSquare } from 'lucide-react';
import AssignSelect from './assign-select';
import PrioritySelect from './priority-select';
import Link from 'next/link';

export default function CreateTaskForm() {
  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="flex flex-row items-center gap-6">
        <div className="bg-chart-4 p-2 rounded-md ">
          <CheckSquare className="size-6 bg-chart-4 " />
        </div>

        <div>
          <CardTitle className="text-xl">Task Details</CardTitle>
          <p className="text-md text-muted-foreground">
            Define the task scope, assignment, and timeline.
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Title */}
        <div className="space-y-2">
          <Label className="text-md">Task Title *</Label>
          <Input placeholder="e.g. Implement user authentication" />
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label className="text-md">Description</Label>
          <textarea
            placeholder="Describe the task in detail..."
            className="border rounded-md w-full h-40 p-2"
          />
        </div>

        {/* Priority + Status */}
        <div className="grid gap-4 ">
          <PrioritySelect />
        </div>

        {/* Due Date */}
        <div className="space-y-2">
          <Label className="text-md">Due Date *</Label>
          <Input type="date" />
        </div>

        {/* Assign */}
        <AssignSelect />

        {/* Buttons */}
        <div className="flex justify-end gap-6 pt-4">
          <Button variant="outline">
            <Link href="/projects/:projectId">Cancel</Link>
          </Button>

          <Button>Create Task</Button>
        </div>
      </CardContent>
    </Card>
  );
}
