import { Link } from 'react-router-dom';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.path ? (
            <Link
              to={item.path}
              className="text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-sm font-medium text-gray-800">{item.label}</span>
          )}
          {index < items.length - 1 && (
            <span className="text-sm font-medium text-gray-400">/</span>
          )}
        </div>
      ))}
    </div>
  );
}
