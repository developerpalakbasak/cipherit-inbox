import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import type { Inquiry } from "../data/inquiries";
import {
  getInitials,
  getAvatarColor,
  formatRelativeTime,
  getPlanColor,
} from "../data/inquiries";

interface Props {
  item: Inquiry;
  onPress?: (id: string) => void;
}

export default function InquiryCard({ item, onPress }: Props) {
  const initials = getInitials(item.fullName);
  const avatarColor = getAvatarColor(item._id);
  const planColor = getPlanColor(item.plan);
  const time = formatRelativeTime(item.createdAt);


  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={() => onPress?.(item._id)}

      className={`rounded-2xl p-4 mb-3 border relative ${
        !item.isRead
          ? "bg-surface-card-unread border-border-active"
          : "bg-surface-card border-border"
      }`}
    >
      {/* Unread dot */}
      {!item.isRead && (
        <View className="absolute top-4 right-4 w-2 h-2 rounded-full bg-brand" />
      )}

      {/* Row 1: Avatar + Name + Time */}
      <View className="flex-row items-center mb-3">
        <View
          className="w-11 h-11 rounded-full items-center justify-center mr-3 shrink-0"
          style={{ backgroundColor: avatarColor }}
        >
          <Text className="text-white text-sm font-bold tracking-wider">
            {initials}
          </Text>
        </View>

        <View className="flex-1">
          <View className="flex-row items-center justify-between">
            <Text
              className={`text-[15px] flex-1 mr-2 ${
                !item.isRead
                  ? "text-ink-primary font-bold"
                  : "text-ink-secondary font-semibold"
              }`}
              numberOfLines={1}
            >
              {item.fullName}
            </Text>
            <Text className="text-ink-muted text-[11px]">{time}</Text>
          </View>

          {/* Email */}
          <Text className="text-ink-muted text-xs mt-0.5" numberOfLines={1}>
            {item.email}
          </Text>
        </View>
      </View>

      {/* Row 2: Plan badge + Project type */}
      <View className="flex-row items-center mb-2.5 gap-2">
        {/* Plan badge */}
        <View
          className="rounded-full px-2.5 py-0.5"
          style={{ backgroundColor: planColor + "22" }}
        >
          <Text className="text-[11px] font-bold" style={{ color: planColor }}>
            {item.plan}
          </Text>
        </View>

        {/* Project type */}
        <View className="flex-1 flex-row items-center">
          <View className="w-1 h-1 rounded-full bg-ink-muted mr-1.5" />
          <Text className="text-ink-muted text-[12px] flex-1" numberOfLines={1}>
            {item.projectType}
          </Text>
        </View>
      </View>

      {/* Row 3: Message */}
      <Text className="text-ink-muted text-[13px] leading-5 mb-3" numberOfLines={2}>
        {item.message}
      </Text>

      {/* Row 4: Status pills */}
      <View className="flex-row gap-2">
        <View
          className={`flex-row items-center gap-1 rounded-full px-2.5 py-1 ${
            item.isRead ? "bg-brand-dim" : "bg-surface-overlay"
          }`}
        >
          <View
            className={`w-1.5 h-1.5 rounded-full ${item.isRead ? "bg-brand" : "bg-ink-muted"}`}
          />
          <Text
            className={`text-[11px] font-semibold ${
              item.isRead ? "text-brand" : "text-ink-muted"
            }`}
          >
            {item.isRead ? "Read" : "Unread"}
          </Text>
        </View>

        <View
          className={`flex-row items-center gap-1 rounded-full px-2.5 py-1 ${
            item.isReplyed ? "bg-brand-dim" : "bg-surface-overlay"
          }`}
        >
          <View
            className={`w-1.5 h-1.5 rounded-full ${item.isReplyed ? "bg-brand" : "bg-ink-muted"}`}
          />
          <Text
            className={`text-[11px] font-semibold ${
              item.isReplyed ? "text-brand" : "text-ink-muted"
            }`}
          >
            {item.isReplyed ? "Replied" : "Pending"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
