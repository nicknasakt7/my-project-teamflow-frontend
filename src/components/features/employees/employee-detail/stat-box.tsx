export default function StatBox({
  title,
  value,
}: {
  title: string;
  value: number;
}) {
  return (
    <div className="p-4 rounded bg-primary text-center">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-md text-card">{title}</p>
    </div>
  );
}
