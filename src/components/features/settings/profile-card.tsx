'use client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Edit } from 'lucide-react';

export default function ProfileCard() {
  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Profile Information</CardTitle>
        <Button variant="outline" size="lg">
          <Edit />
          Edit Profile Contact Your Admin
        </Button>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          <div className="flex items-center justify-center w-28 h-28 rounded-full bg-primary text-lg text-accent font-semibold">
            SC
          </div>

          <div>
            <p className="font-semibold text-xl">Sarah Chen</p>
            <p className="text-muted-foreground text-md">Product Manager</p>
          </div>
        </div>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-md font-medium">First Name</label>
            {/* <Input value="Sarah" /> */}
          </div>

          <div className="space-y-1">
            <label className="text-md font-medium">Last Name</label>
            {/* <Input value="Chen" /> */}
          </div>

          <div className="space-y-1">
            <label className="text-md font-medium">Email Address</label>
            {/* <Input value="sarah@teamflow.com" /> */}
          </div>

          <div className="space-y-1">
            <label className="text-md font-medium">Position</label>
            {/* <Input value="Product Manager" /> */}
          </div>

          <div className="space-y-1">
            <label className="text-md font-medium">Level</label>
            {/* <Input value="Senior" /> */}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
