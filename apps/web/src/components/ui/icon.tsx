import {
  Archive,
  Book,
  BookOpen,
  Brush,
  Circle,
  Clock,
  Code,
  Globe,
  Map,
  MapPinned,
  Orbit,
  Palette,
  Scale,
  Share2,
  Sparkles,
  Star,
  Store,
  Swords,
  Users,
  type LucideIcon,
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  Archive,
  Book,
  BookOpen,
  Brush,
  Circle,
  Clock,
  Code,
  Globe,
  Map,
  MapPinned,
  Orbit,
  Palette,
  Scale,
  Share2,
  Sparkles,
  Star,
  Store,
  Swords,
  Users,
};

export function Icon({
  name,
  color,
  size,
  className,
}: {
  name: string;
  color: string;
  size: number;
  className?: string;
}) {
  const LucideIcon = icons[name] ?? Circle;
  return <LucideIcon color={color} size={size} className={className} />;
}
