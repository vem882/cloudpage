import { ReactNode } from "react";

interface NeumorphicCardProps {
  children: ReactNode;
  className?: string;
}

export const NeumorphicCard: React.FC<NeumorphicCardProps> = ({
  children,
  className = "",
}) => (
  <div className={`neumorphic rounded-xl p-8 ${className}`}>{children}</div>
);