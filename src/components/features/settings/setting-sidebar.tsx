import { Button } from '@/components/ui/button';

export default function SettingsSidebar() {
  return (
    <div className="w-60">
      <div className="border rounded-xl p-2">
        <Button className="w-full text-left px-3 py-2 rounded-lg bg-primary font-medium text-foreground">
          Profile
        </Button>
      </div>
    </div>
  );
}
