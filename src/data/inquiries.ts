export interface Inquiry {
  _id: { $oid: string };
  fullName: string;
  email: string;
  phone: string;
  plan: string;
  projectType: string;
  message: string;
  isRead: boolean;
  isReplyed: boolean;
  createdAt: { $date: string };
  updatedAt: { $date: string };
  __v: number;
}

export const INQUIRIES: Inquiry[] = [
  {
    _id: { $oid: "6a28f35a0f6feab9311738de" },
    fullName: "Fahmidur",
    email: "fahmidurrahamanshanto@gmail.com",
    phone: "01640301028",
    plan: "Starter",
    projectType: "Custom Software Development",
    message: "Ttt",
    isRead: false,
    isReplyed: false,
    createdAt: { $date: "2026-06-10T05:17:14.701Z" },
    updatedAt: { $date: "2026-06-10T05:17:14.701Z" },
    __v: 0,
  },
  {
    _id: { $oid: "6a28f35a0f6feab9311738df" },
    fullName: "Sarah Khan",
    email: "sarah.khan@example.com",
    phone: "01812345678",
    plan: "Pro",
    projectType: "Mobile App Development",
    message: "We need a cross-platform mobile app for our e-commerce business.",
    isRead: false,
    isReplyed: false,
    createdAt: { $date: "2026-06-09T11:42:00.000Z" },
    updatedAt: { $date: "2026-06-09T11:42:00.000Z" },
    __v: 0,
  },
  {
    _id: { $oid: "6a28f35a0f6feab9311738e0" },
    fullName: "James Okafor",
    email: "james.okafor@techfirm.io",
    phone: "01987654321",
    plan: "Enterprise",
    projectType: "Web Application",
    message: "Looking for a full-stack team to build an internal HR portal.",
    isRead: false,
    isReplyed: true,
    createdAt: { $date: "2026-06-08T08:15:00.000Z" },
    updatedAt: { $date: "2026-06-08T08:15:00.000Z" },
    __v: 0,
  },
  {
    _id: { $oid: "6a28f35a0f6feab9311738e1" },
    fullName: "Priya Mehta",
    email: "priya.mehta@startup.co",
    phone: "01712345000",
    plan: "Starter",
    projectType: "UI/UX Design",
    message: "Need a complete redesign of our landing page and onboarding flow.",
    isRead: true,
    isReplyed: false,
    createdAt: { $date: "2026-06-07T14:30:00.000Z" },
    updatedAt: { $date: "2026-06-07T14:30:00.000Z" },
    __v: 0,
  },
  {
    _id: { $oid: "6a28f35a0f6feab9311738e2" },
    fullName: "Alex Rahman",
    email: "alex.rahman@ventures.com",
    phone: "01600000001",
    plan: "Pro",
    projectType: "API Integration",
    message: "We have 3rd party services that need to be integrated into our platform.",
    isRead: true,
    isReplyed: true,
    createdAt: { $date: "2026-06-06T09:00:00.000Z" },
    updatedAt: { $date: "2026-06-06T09:00:00.000Z" },
    __v: 0,
  },
];

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
