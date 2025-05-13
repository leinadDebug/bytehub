interface CardProps {
  title?: string;
  children: React.ReactNode;
  className?: string;
}

export default function Card({ title, children, className = "" }: CardProps) {
  return (
    <div className={`p-4 rounded-lg shadow-sm border text-white ${className}`}>
      {title && (
        <h3 className="font-semibold text-lg mb-4 text-white">{title}</h3>
      )}
      {children}
    </div>
  );
}
