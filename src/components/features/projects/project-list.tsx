import { mockProjects } from '@/components/mocks/mock-data';
import ProjectCard from './project-card';

export default function ProjectList() {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 line-clamp-2">
      {/* cards */}
      {mockProjects.map(project => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}
