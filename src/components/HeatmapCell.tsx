interface HeatmapCellProps {
  value: number;
}

export default function HeatmapCell({ value }: HeatmapCellProps) {
  const opacity = value / 100;
  const textColor = value >= 85 ? 'text-white' : 'text-gray-900';

  return (
    <div
      className={`flex h-[72px] items-center justify-center rounded-lg text-sm font-medium ${textColor}`}
      style={{
        backgroundColor: `rgb(37 99 235 / ${opacity})`,
      }}
    >
      {value}%
    </div>
  );
}
