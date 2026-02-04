interface StatsCardProps {
  label: string;
  value: string | number;
  className?: string;
}

export default function StatsCard({ label, value, className = '' }: StatsCardProps) {
  return (
    <div
      className={`flex flex-col gap-2 rounded-xl p-6 border border-gray-200 bg-white ${className}`}
    >
      <p className="text-sm font-medium text-gray-600">{label}</p>
      <p className="text-3xl font-bold tracking-tight text-gray-900">{value}</p>
    </div>
  );
}
