import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";

const iconMap = Icons as unknown as Record<string, LucideIcon>;

export function getIcon(name: string): LucideIcon {
  return iconMap[name] ?? Icons.Wrench;
}
