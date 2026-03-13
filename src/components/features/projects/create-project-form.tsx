'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useForm } from 'react-hook-form';

type FormValues = {
  title: string;
  description: string;
  dueDate: string;
};

export default function CreateProjectForm() {
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };
  return (
    <Card>
      <CardHeader className="text-xl">
        <CardTitle>Project Information</CardTitle>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Title */}

          <div className="space-y-2">
            <Label className="text-lg">
              Title <span className="text-red-500">*</span>
            </Label>

            <Input placeholder="Enter project title" {...register('title')} />
          </div>

          {/* Description */}

          <div className="space-y-2">
            <Label className="text-lg">
              Description <span className="text-red-500">*</span>
            </Label>

            <textarea
              placeholder="Enter project description"
              className="w-full border rounded-md p-2 h-40"
            />
          </div>

          {/* Due Date */}
          <div className="space-y-2">
            <Label className="text-lg">
              Due Date <span className="text-red-500">*</span>
            </Label>

            <Input type="date" {...register('dueDate')} />
          </div>

          {/* Buttons */}

          <div className="flex justify-end gap-3 border-t pt-4">
            <Button type="button" variant="outline">
              <Link href="/projects">Cancel</Link>
            </Button>

            <Button type="submit">
              <Link href="/projects">Create Project</Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
