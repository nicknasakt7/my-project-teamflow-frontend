import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { members } from '@/components/mocks/mock-data';
import { Users } from 'lucide-react';
export type Member = {
  name: string;
  role: string;
  initials: string;
  color: string;
  tasks: number;
};
export default function TeamMembers() {
  return (
    <Card className="rounded-xl">
      <CardHeader className="flex flex-row items-center gap-2">
        <Users className="h-5 w-5 text-blue-500" />
        <CardTitle className="text-lg font-semibold">Team Members</CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        {/* All Members Button */}

        <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-blue-600">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <span className="font-medium">All Members</span>
          </div>

          <span className="rounded-full border px-3 py-1 text-sm">
            {members.length}
          </span>
        </div>

        {/* Members List */}

        {members.map(member => (
          <div key={member.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white ${member.color}`}
              >
                {member.initials}
              </div>

              <div className="flex flex-col">
                <span className="font-medium">{member.name}</span>
                <span className="text-sm text-muted-foreground">
                  {member.role}
                </span>
              </div>
            </div>

            <span className="rounded-full border px-3 py-1 text-sm mr-4 text-muted-foreground">
              {member.tasks}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
