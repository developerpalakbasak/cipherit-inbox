import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { INQUIRIES, formatRelativeTime, getAvatarColor, getInitials, getPlanColor, type Inquiry } from "../../data/inquiries";

export default function InquiryDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    const found = INQUIRIES.find(i => i._id.$oid === id);
    if (found) {
      setInquiry(found);
    }
  }, [id]);

  if (!inquiry) {
    return (
      <SafeAreaView className="flex-1 bg-surface items-center justify-center">
        <Text className="text-ink-secondary">Inquiry not found.</Text>
        <TouchableOpacity onPress={() => router.back()} className="mt-4 p-2 bg-surface-card rounded-lg border border-border">
          <Text className="text-brand font-bold">Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const initials = getInitials(inquiry.fullName);
  const avatarColor = getAvatarColor(inquiry._id.$oid);
  const planColor = getPlanColor(inquiry.plan);
  const time = formatRelativeTime(inquiry.createdAt.$date);

  function handleMarkAsRead() {
    const idx = INQUIRIES.findIndex(i => i._id.$oid === id);
    if (idx !== -1) {
      INQUIRIES[idx].isRead = true;
      setInquiry({ ...INQUIRIES[idx] });
    }
  }

  function handleMarkAsReplied() {
    const idx = INQUIRIES.findIndex(i => i._id.$oid === id);
    if (idx !== -1) {
      INQUIRIES[idx].isReplyed = true;
      setInquiry({ ...INQUIRIES[idx] });
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top", "bottom"]}>
      {/* Header */}
      <View className="flex-row items-center justify-between px-5 pt-3 pb-2 border-b border-border">
        <TouchableOpacity onPress={() => router.back()} className="py-2">
          <Text className="text-ink-primary font-semibold text-base">← Back</Text>
        </TouchableOpacity>
        <Text className="text-ink-primary text-lg font-bold">Inquiry Details</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-5 pt-5" showsVerticalScrollIndicator={false}>
        {/* User Info */}
        <View className="flex-row items-center mb-6">
          <View
            className="w-16 h-16 rounded-full items-center justify-center mr-4 shrink-0"
            style={{ backgroundColor: avatarColor }}
          >
            <Text className="text-white text-xl font-bold tracking-wider">{initials}</Text>
          </View>
          <View className="flex-1">
            <Text className="text-ink-primary text-xl font-bold">{inquiry.fullName}</Text>
            <Text className="text-ink-muted text-sm mt-1">{inquiry.email}</Text>
            <Text className="text-ink-muted text-sm mt-0.5">{inquiry.phone}</Text>
          </View>
        </View>

        {/* Project & Plan */}
        <View className="flex-row items-center gap-3 mb-6">
          <View className="rounded-full px-3 py-1.5" style={{ backgroundColor: planColor + "22" }}>
            <Text className="text-[13px] font-bold" style={{ color: planColor }}>{inquiry.plan} Plan</Text>
          </View>
          <View className="bg-surface-overlay rounded-full px-3 py-1.5 border border-border">
            <Text className="text-ink-secondary text-[13px] font-semibold">{inquiry.projectType}</Text>
          </View>
        </View>

        {/* Status Indicators */}
        <View className="flex-row items-center gap-3 mb-6">
          <View className={`flex-row items-center gap-1.5 rounded-full px-3 py-1.5 border ${inquiry.isRead ? "bg-brand-dim border-transparent" : "bg-surface border-border-active"}`}>
            <View className={`w-2 h-2 rounded-full ${inquiry.isRead ? "bg-brand" : "bg-ink-muted"}`} />
            <Text className={`text-xs font-semibold ${inquiry.isRead ? "text-brand" : "text-ink-muted"}`}>
              {inquiry.isRead ? "Read" : "Unread"}
            </Text>
          </View>
          <View className={`flex-row items-center gap-1.5 rounded-full px-3 py-1.5 border ${inquiry.isReplyed ? "bg-brand-dim border-transparent" : "bg-surface border-border-active"}`}>
            <View className={`w-2 h-2 rounded-full ${inquiry.isReplyed ? "bg-brand" : "bg-ink-muted"}`} />
            <Text className={`text-xs font-semibold ${inquiry.isReplyed ? "text-brand" : "text-ink-muted"}`}>
              {inquiry.isReplyed ? "Replied" : "Pending"}
            </Text>
          </View>
          <View className="flex-1 items-end justify-center">
            <Text className="text-ink-muted text-xs font-medium">{time}</Text>
          </View>
        </View>

        {/* Message */}
        <View className="bg-surface-card border border-border rounded-2xl p-5 mb-8">
          <Text className="text-ink-secondary text-sm font-semibold mb-2">Message Content</Text>
          <Text className="text-ink-primary text-[15px] leading-6">
            {inquiry.message}
          </Text>
        </View>

        {/* Actions */}
        <View className="gap-3 pb-12">
          {!inquiry.isRead && (
            <TouchableOpacity
              onPress={handleMarkAsRead}
              className="bg-brand py-4 rounded-xl items-center shadow-sm"
              activeOpacity={0.8}
            >
              <Text className="text-black font-bold text-base">Mark as Read</Text>
            </TouchableOpacity>
          )}
          {!inquiry.isReplyed && (
            <TouchableOpacity
              onPress={handleMarkAsReplied}
              className="bg-ink-primary py-4 rounded-xl items-center shadow-sm"
              activeOpacity={0.8}
            >
              <Text className="text-surface font-bold text-base">Mark as Replied</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
