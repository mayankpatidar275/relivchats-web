// src/components/category/CategoryIcon.tsx
import { Briefcase, Heart, Home, LucideProps, Users } from "lucide-react";

const iconMap = {
  Heart,
  Users,
  Home,
  Briefcase,
};

interface CategoryIconProps extends Omit<LucideProps, "ref"> {
  iconName: string;
}

export default function CategoryIcon({
  iconName,
  ...props
}: CategoryIconProps) {
  const Icon = iconMap[iconName as keyof typeof iconMap] || Heart;
  return <Icon {...props} />;
}
