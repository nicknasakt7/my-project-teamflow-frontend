'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LockKeyhole, Eye, EyeOff } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useSession } from 'next-auth/react';
import { apiClient } from '@/lib/api/api-client';
import { toast } from 'sonner';

function PasswordInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <Input
        type={show ? 'text' : 'password'}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        className="pr-10"
      />
      <button
        type="button"
        onClick={() => setShow(v => !v)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
      >
        {show ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}

export default function ChangePasswordCard() {
  const { data: session } = useSession();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      apiClient.patch<void>(
        '/employees/change-password',
        { currentPassword, newPassword },
        session?.user?.accessToken,
      ),
    onSuccess: () => {
      toast.success('Password updated successfully');
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    },
    onError: (error: Error) =>
      toast.error(error.message ?? 'Failed to update password'),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    mutate();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <LockKeyhole />
          <CardTitle className="text-xl">Change Password</CardTitle>
        </div>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <PasswordInput
            placeholder="Current Password"
            value={currentPassword}
            onChange={setCurrentPassword}
          />
          <PasswordInput
            placeholder="New Password"
            value={newPassword}
            onChange={setNewPassword}
          />
          <PasswordInput
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={setConfirmPassword}
          />

          <Button
            type="submit"
            disabled={
              isPending || !currentPassword || !newPassword || !confirmPassword
            }
            className="w-fit text-sm font-semibold mt-2 text-foreground"
          >
            {isPending ? 'Updating...' : 'Update Password'}
          </Button>

          <div className="bg-background p-3 rounded-md text-sm text-foreground">
            <p className="font-medium mb-1">Password requirements:</p>
            <ul className="list-disc ml-4 space-y-0.5">
              <li>At least 6 characters</li>
              <li>Letters and numbers only</li>
            </ul>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
