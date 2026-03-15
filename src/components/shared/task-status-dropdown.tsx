'use client';
import { useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';

type TaskStatus = 'Todo' | 'In progress' | 'Done';

type TaskStatusDropdownProps = {
  status: TaskStatus;
};

const statusStyles: Record<TaskStatus, string> = {
  Todo: 'bg-gray-100 text-gray-600',
  'In progress': 'bg-blue-100 text-blue-600',
  Done: 'bg-green-100 text-green-600',
};
export default function TaskStatusDropdown({
  status,
}: TaskStatusDropdownProps) {
  const [taskStatus, setTaskStatus] = useState(status);
  return (
    <Select
      value={taskStatus}
      onValueChange={value => setTaskStatus(value as TaskStatus)}
    >
      <SelectTrigger
        onClick={e => e.stopPropagation()}
        className={`h-7 w-35 text-md ${statusStyles[taskStatus]}`}
      >
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value="Todo">Todo</SelectItem>
        <SelectItem value="In progress">In progress</SelectItem>
        <SelectItem value="Done">Done</SelectItem>
      </SelectContent>
    </Select>
  );
}
