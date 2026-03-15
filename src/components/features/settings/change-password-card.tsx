import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LockKeyhole } from 'lucide-react';

export default function ChangePasswordCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <LockKeyhole />
          <CardTitle className="text-xl">Change Password</CardTitle>
        </div>
      </CardHeader>

      <CardContent className="flex flex-col gap-4">
        <Input placeholder="Current Password" />
        <Input placeholder="New Password" />
        <Input placeholder="Confirm New Password" />

        <Button className="w-fit text-md font-semibold mt-2">
          Update Password
        </Button>

        <div className="bg-muted p-3 rounded-md text-md text-card">
          <p>Password requirements:</p>
          <ul className="list-disc ml-4">
            <li>At least 6 characters</li>
            {/* <li>Mix of uppercase and lowercase</li> */}
            {/* <li>Include numbers and special characters</li> */}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
