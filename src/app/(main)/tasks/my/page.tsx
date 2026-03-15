'use client';
import CreateMyTaskButton from '@/components/features/tasks/create-my-task-button';
import CreateTaskDialog from '@/components/features/tasks/create-task-dialog';
import MyOwnTasksCard from '@/components/features/tasks/my-own-task-card';
import { myOwnTasks } from '@/components/mocks/mock-data';
import SearchInput from '@/components/shared/search-input';
import StatusFilter from '@/components/shared/status-filter';
import { useState } from 'react';

export default function MyOwnTasks() {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex flex-col gap-4">
      <CreateMyTaskButton onClick={() => setOpen(true)} />
      <CreateTaskDialog open={open} onOpenChange={setOpen} />
      <div className="flex gap-4 items-center mb-4 mt-4">
        <SearchInput />
        <StatusFilter />
      </div>

      {myOwnTasks.map(task => (
        <MyOwnTasksCard key={task.id} {...task} />
      ))}
    </div>
  );
}
