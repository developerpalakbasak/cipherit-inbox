export interface Inquiry {
  _id: string;
  fullName: string;
  email: string;
  phone: string;
  plan: string;
  projectType: string;
  message: string;
  isRead: boolean;
  isReplyed: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}


export function getInitials(name: string): string {
  return name
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join("");
}

const AVATAR_COLORS = [
  "#6C63FF", "#FF6584", "#3B82F6", "#10B981",
  "#F59E0B", "#EC4899", "#8B5CF6", "#EF4444",
];
export function getAvatarColor(oid: string): string {
  const sum = oid.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return AVATAR_COLORS[sum % AVATAR_COLORS.length];
}

export function formatRelativeTime(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return "Just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days === 1) return "Yesterday";
  return `${days} days ago`;
}

const PLAN_COLORS: Record<string, string> = {
  Starter: "#3B82F6",
  Pro: "#8B5CF6",
  Enterprise: "#9dfdcd",
};
export function getPlanColor(plan: string): string {
  return PLAN_COLORS[plan] ?? "#585b7a";
}
