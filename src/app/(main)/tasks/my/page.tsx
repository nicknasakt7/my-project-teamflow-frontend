'use client';
import CreateMyTaskButton from '@/components/features/tasks/create-my-task-button';
import CreateTaskDialog from '@/components/features/tasks/create-task-dialog';
import MyOwnTasksCard from '@/components/features/tasks/my-own-task-card';
import { myOwnTasks } from '@/components/mocks/mock-data';
import { useState } from 'react';

export default function MyOwnTasks() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <CreateMyTaskButton onClick={() => setOpen(true)} />
      <CreateTaskDialog open={open} onOpenChange={setOpen} />

      {myOwnTasks.map(task => (
        <MyOwnTasksCard key={task.id} {...task} />
      ))}
    </div>
  );
}
