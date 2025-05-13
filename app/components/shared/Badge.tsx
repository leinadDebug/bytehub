interface BadgeProps {
  status: "success" | "warning" | "error" | "info";
  children: React.ReactNode;
}

const statusStyles = {
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
  error: "bg-red-100 text-red-800",
  info: "bg-blue-100 text-blue-800",
};

export default function Badge({ status, children }: BadgeProps) {
  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${statusStyles[status]}`}
    >
      {children}
    </span>
  );
}
