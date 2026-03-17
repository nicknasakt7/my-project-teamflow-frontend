import { Card, CardContent } from '@/components/ui/card';
import { Briefcase, Calendar, Mail } from 'lucide-react';

export default function ProfileCard() {
  return (
    <Card>
      <CardContent className="p-6 flex justify-between items-start">
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-purple-500 flex items-center justify-center text-white font-bold text-xl">
            SC
          </div>

          {/* Info */}
          <div>
            <h2 className="text-xl font-semibold">Sarah Chen</h2>
            <p className="text-muted-foreground">Product Manager</p>

            <span className="inline-block mt-1 px-2 py-1 text-sm font-semibold rounded bg-green-100 text-green-700">
              Active
            </span>
            <div className="flex gap-2 mt-6">
              <Calendar />
              Apr/15/1992
              <Mail />
              Sarah.ad@mail.com
              <Briefcase />
              Joined Jan 15, 2024
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
