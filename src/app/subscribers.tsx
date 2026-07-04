import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SubscriberCard from "../components/SubscriberCard";
import { type Subscriber } from "../data/subscribers";
import axiosInstance from "../api/axiosInstance";

export default function SubscribersScreen() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSubscribers = async (showLoader = true) => {
    if (showLoader) setIsLoading(true);
    try {
      const response = await axiosInstance.get<Subscriber[]>("/subscribers");
      setSubscribers(response.data);
    } catch (error) {
      console.error("Failed to fetch subscribers", error);
    } finally {
      if (showLoader) setIsLoading(false);
    }
  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    await fetchSubscribers(false);
    setIsRefreshing(false);
  };

  useFocusEffect(
    useCallback(() => {
      fetchSubscribers();
    }, [])
  );


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
              Subscribers
            </Text>
            <Text className="text-ink-muted text-[11px] font-medium -mt-0.5">
              CipherIt
            </Text>
          </View>
        </View>
      </View>



      {/* ── List ── */}
      <FlatList
        data={subscribers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <SubscriberCard
            item={item}
          />
        )}
        ListEmptyComponent={() => {
          if (isLoading) {
            return (
              <View className="flex-1 items-center justify-center py-20">
                <ActivityIndicator size="large" color="#9dfdcd" />
              </View>
            );
          }
          return (
            <View className="flex-1 items-center justify-center pb-16">
              <Text className="text-5xl mb-4">✅</Text>
              <Text className="text-xl font-bold text-ink-primary mb-2">
                All caught up!
              </Text>
              <Text className="text-ink-muted text-sm text-center px-10">
                Your subscribers list is empty.
              </Text>
            </View>
          );
        }}
        contentContainerClassName="px-4 pb-8"
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  );
}
