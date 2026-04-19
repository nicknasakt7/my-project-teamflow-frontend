'use client';

import { useState } from 'react';
import InputFilter from './input-filter';
import ProjectList from './project-list';
import type { ProjectStatus } from '@/lib/api/project/project.type';
import { useDebounce } from '@/lib/hooks/useDebounce';

export default function ProjectsContent() {
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState<ProjectStatus | undefined>(undefined);

  const debouncedSearch = useDebounce(search, 500);

  const handleSearch = (value: string) => {
    setSearch(value);
  };

  return (
    <>
      <InputFilter onSearch={handleSearch} onStatusChange={setStatus} />
      <ProjectList search={debouncedSearch} status={status} />
    </>
  );
}
