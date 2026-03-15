import ChangePasswordCard from '@/components/features/settings/change-password-card';
import ProfileCard from '@/components/features/settings/profile-card';
import SettingsSidebar from '@/components/features/settings/setting-sidebar';

export default function SettingPage() {
  return (
    <div className="flex gap-6 p-6">
      <SettingsSidebar />
      <div className="flex flex-col gap-6 w-full max-w-3xl">
        <ProfileCard />
        <ChangePasswordCard />
      </div>
    </div>
  );
}
