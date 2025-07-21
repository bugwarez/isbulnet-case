import { Badge } from "@/components/ui/badge";

type BadgeVariant = "status" | "info";
type StatusType = "Alive" | "Dead" | "unknown";

interface CharacterBadgeProps {
  variant: BadgeVariant;
  status?: StatusType;
  text?: string;
  className?: string;
}

export function CharacterBadge({
  variant,
  status,
  text,
  className = "",
}: CharacterBadgeProps) {
  if (variant === "status" && status) {
    const getStatusColor = (status: StatusType) => {
      switch (status) {
        case "Alive":
          return "bg-green-500/20 text-green-400 border-green-500/30";
        case "Dead":
          return "bg-red-500/20 text-red-400 border-red-500/30";
        default:
          return "bg-gray-500/20 text-gray-400 border-gray-500/30";
      }
    };

    const getStatusText = (status: StatusType) => {
      switch (status) {
        case "Alive":
          return "Hayatta";
        case "Dead":
          return "Ölü";
        default:
          return "Bilinmiyor";
      }
    };

    const getDotColor = (status: StatusType) => {
      switch (status) {
        case "Alive":
          return "bg-green-400";
        case "Dead":
          return "bg-red-400";
        default:
          return "bg-gray-400";
      }
    };

    return (
      <Badge
        variant="outline"
        className={`${getStatusColor(status)} font-medium ${className}`}
      >
        <div className={`w-2 h-2 rounded-full mr-2 ${getDotColor(status)}`} />
        {getStatusText(status)}
      </Badge>
    );
  }

  if (variant === "info" && text) {
    return (
      <Badge variant="secondary" className={`text-xs ${className}`}>
        {text}
      </Badge>
    );
  }

  return null;
}
