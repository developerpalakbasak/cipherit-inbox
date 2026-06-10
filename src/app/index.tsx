import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect, router } from "expo-router";
import InquiryCard from "../components/InquiryCard";
import { INQUIRIES, type Inquiry } from "../data/inquiries";

type Tab = "unread" | "pending" | "all";

export default function InboxScreen() {
  const [activeTab, setActiveTab] = useState<Tab>("unread");
  const [inquiries, setInquiries] = useState<Inquiry[]>(INQUIRIES);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const onRefresh = () => {
    setIsRefreshing(true);
    // Simulate data reload – replace with real fetch if needed
    setInquiries([...INQUIRIES]);
    setIsRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      setInquiries([...INQUIRIES]);
    }, [])
  );

  const unreadCount = inquiries.filter((i) => !i.isRead).length;
  const pendingCount = inquiries.filter((i) => i.isRead && !i.isReplyed).length;

  const displayed =
    activeTab === "unread"
      ? inquiries.filter((i) => !i.isRead)
      : activeTab === "pending"
      ? inquiries.filter((i) => i.isRead && !i.isReplyed)
      : inquiries;

  function markAsRead(oid: string) {
    setInquiries((prev) =>
      prev.map((i) =>
        i._id.$oid === oid ? { ...i, isRead: true } : i
      )
    );
    const index = INQUIRIES.findIndex((i) => i._id.$oid === oid);
    if (index !== -1) {
      INQUIRIES[index].isRead = true;
    }
  }

  function markAllRead() {
    setInquiries((prev) => prev.map((i) => ({ ...i, isRead: true })));
    INQUIRIES.forEach((i) => {
      i.isRead = true;
    });
  }

  return (
    <SafeAreaView className="flex-1 bg-surface" edges={["top"]}>

      {/* ── Top header ── */}
      <View className="flex-row items-center justify-between px-5 pt-3 pb-2">
        <View className="flex-row items-center gap-3">
          <Image
            source={require("../../assets/images/icon.png")}
            className="w-8 h-8 rounded-lg"
            resizeMode="contain"
          />
          <View>
            <Text className="text-ink-primary text-xl font-extrabold tracking-tight">
              Inbox
            </Text>
            <Text className="text-ink-muted text-[11px] font-medium -mt-0.5">
              CipherIt
            </Text>
          </View>
        </View>

        {/* Mark all read — only visible on Unread tab */}
        {activeTab === "unread" && unreadCount > 0 && (
          <TouchableOpacity
            onPress={markAllRead}
            className="bg-surface-card-unread border border-border-active rounded-full px-3.5 py-1.5"
          >
            <Text className="text-brand text-[12px] font-semibold">
              Mark all read
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {/* ── Custom top tab bar ── */}
      <View className="flex-row mx-5 mt-1 mb-3 bg-surface-card rounded-2xl p-1 border border-border">
        <TouchableOpacity
          onPress={() => setActiveTab("unread")}
          className={`flex-1 flex-row items-center justify-center gap-2 py-2.5 rounded-xl ${
            activeTab === "unread" ? "bg-surface-card-unread" : "bg-transparent"
          }`}
          activeOpacity={0.8}
        >
          <Text
            className={`text-[14px] font-bold ${
              activeTab === "unread" ? "text-brand" : "text-ink-muted"
            }`}
          >
            Unread
          </Text>
          {unreadCount > 0 && (
            <View className="bg-brand rounded-full min-w-[20px] h-5 items-center justify-center px-1.5">
              <Text className="text-surface text-[11px] font-extrabold">
                {unreadCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("pending")}
          className={`flex-1 flex-row items-center justify-center gap-2 py-2.5 rounded-xl ${
            activeTab === "pending" ? "bg-surface-card-unread" : "bg-transparent"
          }`}
          activeOpacity={0.8}
        >
          <Text
            className={`text-[14px] font-bold ${
              activeTab === "pending" ? "text-brand" : "text-ink-muted"
            }`}
          >
            Pending
          </Text>
          {pendingCount > 0 && (
            <View className="bg-ink-primary rounded-full min-w-[20px] h-5 items-center justify-center px-1.5">
              <Text className="text-surface text-[11px] font-extrabold">
                {pendingCount}
              </Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setActiveTab("all")}
          className={`flex-1 flex-row items-center justify-center gap-2 py-2.5 rounded-xl ${
            activeTab === "all" ? "bg-surface-card-unread" : "bg-transparent"
          }`}
          activeOpacity={0.8}
        >
          <Text
            className={`text-[14px] font-bold ${
              activeTab === "all" ? "text-brand" : "text-ink-muted"
            }`}
          >
            All
          </Text>
          <View className="bg-surface-overlay rounded-full min-w-[20px] h-5 items-center justify-center px-1.5">
            <Text className="text-ink-muted text-[11px] font-bold">
              {inquiries.length}
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ── Divider ── */}
      <View className="h-px bg-border mx-5 mb-3" />

      {/* ── List ── */}
      <FlatList
  data={displayed}
  keyExtractor={(item) => item._id.$oid}
  renderItem={({ item }) => (
    <InquiryCard
      item={item}
      onPress={() => router.push(`/inquiry/${item._id.$oid}`)}
    />
  )}
  ListEmptyComponent={() => (
    <View className="flex-1 items-center justify-center pb-16">
      <Text className="text-5xl mb-4">✅</Text>
      <Text className="text-xl font-bold text-ink-primary mb-2">
        All caught up!
      </Text>
      <Text className="text-ink-muted text-sm text-center px-10">
        {activeTab === "unread" && "No unread inquiries at the moment."}
        {activeTab === "pending" && "No pending inquiries at the moment."}
        {activeTab === "all" && "Your inbox is empty."}
      </Text>
    </View>
  )}
  contentContainerClassName="px-4 pb-8"
  showsVerticalScrollIndicator={false}
  refreshControl={<RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />}
  onEndReached={onRefresh}
  onEndReachedThreshold={0.5}
/>
    </SafeAreaView>
  );
}
