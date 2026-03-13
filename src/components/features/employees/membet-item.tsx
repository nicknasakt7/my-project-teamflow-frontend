export default function MemberItem({
  name,
  role,
}: {
  name: string;
  role: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white">
        {name[0]}
      </div>

      <div className="flex flex-col">
        <span className="text-sm font-medium">{name}</span>
        <span className="text-xs text-muted-foreground">{role}</span>
      </div>
    </div>
  );
}
