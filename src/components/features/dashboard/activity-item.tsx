import { formatDistanceToNow } from 'date-fns';

type ActivityItemProps = {
  message: string;
  createdAt: Date | string;
};

export default function ActivityItem({
  message,
  createdAt,
}: ActivityItemProps) {
  const initials = message
    .split(' ')
    .slice(0, 2)
    .map(word => word[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex gap-3 rounded-lg p-2 transition hover:bg-muted/40">
      {/* Avatar */}
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-semibold">
        {initials}
      </div>

      {/* Text */}
      <div className="text-sm leading-snug">
        <p>{message}</p>

        <p className="text-xs text-muted-foreground">
          {formatDistanceToNow(new Date(createdAt), {
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  );
}
