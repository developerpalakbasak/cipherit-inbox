import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import type { Subscriber } from "../data/subscribers";
import { getAvatarColor, formatRelativeTime } from "../data/inquiries";

interface Props {
  item: Subscriber;
  onPress?: (id: string) => void;
}

export default function SubscriberCard({ item, onPress }: Props) {
  const emailUsername = item.email.substring(0, item.email.indexOf("@")) || item.email;
  const initials = emailUsername
    .substring(0, 2)
    .toUpperCase();
  const avatarColor = getAvatarColor(item._id);
  const time = formatRelativeTime(item.subscribedAt);

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => onPress?.(item._id)}
      className={`rounded-2xl p-4 mb-3 border relative bg-surface-card border-border`}
    >
      {/* Row 1: Avatar + Name + Time */}
      <View className="flex-row items-center mb-1">
        <View className="relative mr-3 shrink-0">
          <View
            className="w-11 h-11 rounded-full items-center justify-center"
            style={{ backgroundColor: avatarColor }}
          >
            <Text className="text-white text-sm font-bold tracking-wider">
              {initials}
            </Text>
          </View>
          <View
            className={`absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full border-2 border-surface-card ${
              item.isActive ? "bg-brand" : "bg-red-500"
            }`}
          />
        </View>

        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text
              className={`text-[15px] flex-1 mr-2 text-ink-primary font-bold`}
              numberOfLines={1}
            >
              {item.email}
            </Text>
            <Text className="text-ink-muted text-[11px]">{time}</Text>
          </View>

          {/* Email */}
          <Text className="text-ink-muted text-xs mt-0.5" numberOfLines={1}>
            Subscribed
          </Text>
        </View>
      </View>


    </TouchableOpacity>
  );
}
