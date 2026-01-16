import React, { useMemo, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import CustomBottomSheet from "../components/CustomBottomSheet";

export default function App() {
  const [isVisible, setIsVisible] = useState(false);

  const openBottomSheet = () => setIsVisible(true);
  const closeBottomSheet = () => setIsVisible(false);

  // Dummy transactions
  const transactions = useMemo(
    () => [
      { id: "1", title: "Netflix Subscription", amount: "-$12.99", icon: "🎬", date: "Today" },
      { id: "2", title: "Salary", amount: "+$2,450.00", icon: "💰", date: "Jan 10" },
      { id: "3", title: "Coffee", amount: "-$4.50", icon: "☕", date: "Jan 09" },
      { id: "4", title: "Shopping", amount: "-$89.99", icon: "🛍️", date: "Jan 08" },
      { id: "5", title: "Gym Membership", amount: "-$25.00", icon: "🏋️", date: "Jan 07" },
    ],
    []
  );

  const renderTransaction = ({ item }:any) => {
    const isPositive = item.amount.startsWith("+");

    return (
      <View style={styles.txCard}>
        <View style={styles.txLeft}>
          <View style={styles.txIconWrap}>
            <Text style={styles.txIcon}>{item.icon}</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.txTitle}>{item.title}</Text>
            <Text style={styles.txDate}>{item.date}</Text>
          </View>
        </View>

        <Text style={[styles.txAmount, isPositive ? styles.amountPositive : styles.amountNegative]}>
          {item.amount}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.topHeader}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Text style={styles.headerSubtitle}>
          Tap below to view your bottom sheet 👇
        </Text>
      </View>

      {/* Open Button */}
      <TouchableOpacity style={styles.button} activeOpacity={0.85} onPress={openBottomSheet}>
        <Text style={styles.buttonText}>✨ Open Bottom Sheet</Text>
      </TouchableOpacity>

      <CustomBottomSheet visible={isVisible} onClose={closeBottomSheet} snapPoint={0.95}>
        {/* Handle */}
        {/* <View style={styles.handle} /> */}

        {/* Sheet Header */}
        <View style={styles.sheetHeaderRow}>
          <View>
            <Text style={styles.sheetTitle}>Your Profile</Text>
            <Text style={styles.sheetDescription}>
              Visual dummy data preview
            </Text>
          </View>

          <TouchableOpacity style={styles.closeX} onPress={closeBottomSheet}>
            <Text style={styles.closeXText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>AR</Text>
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.profileName}>Areeb Raza</Text>
            <Text style={styles.profileRole}>Mobile Developer • React Native</Text>
          </View>

          <View style={styles.badge}>
            <Text style={styles.badgeText}>PRO</Text>
          </View>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Orders</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>$3.2k</Text>
            <Text style={styles.statLabel}>Earnings</Text>
          </View>

          <View style={styles.statCard}>
            <Text style={styles.statValue}>4.9</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </View>
        </View>

        {/* Recent Transactions */}
        <View style={styles.sectionRow}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <Text style={styles.sectionLink}>View All</Text>
        </View>

        <FlatList
          data={transactions}
          keyExtractor={(item) => item.id}
          renderItem={renderTransaction}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 18 }}
        />

        {/* Bottom Close Button */}
        <TouchableOpacity style={styles.closeButton} activeOpacity={0.9} onPress={closeBottomSheet}>
          <Text style={styles.closeButtonText}>Close Sheet</Text>
        </TouchableOpacity>
      </CustomBottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1220",
    paddingHorizontal: 18,
    justifyContent: "center",
  },

  topHeader: {
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "800",
    color: "white",
    letterSpacing: 0.3,
  },
  headerSubtitle: {
    marginTop: 8,
    fontSize: 15,
    color: "#A7B0C0",
    lineHeight: 20,
  },

  button: {
    backgroundColor: "#2D6BFF",
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: "#2D6BFF",
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 8 },
    elevation: 8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "700",
  },

  // Bottom Sheet
  handle: {
    width: 56,
    height: 6,
    borderRadius: 999,
    backgroundColor: "#E5E7EB",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 16,
    opacity: 0.8,
  },

  sheetHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 16,
    paddingHorizontal: 6,
  },
  sheetTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#111827",
  },
  sheetDescription: {
    marginTop: 4,
    fontSize: 14,
    color: "#6B7280",
  },

  closeX: {
    width: 36,
    height: 36,
    backgroundColor: "#F3F4F6",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  closeXText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#111827",
  },

  profileCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#111827",
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
  },
  avatar: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#2D6BFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  avatarText: {
    color: "white",
    fontSize: 18,
    fontWeight: "900",
  },
  profileName: {
    color: "white",
    fontSize: 16,
    fontWeight: "800",
  },
  profileRole: {
    marginTop: 4,
    color: "#A7B0C0",
    fontSize: 13,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: "#10B981",
  },
  badgeText: {
    color: "white",
    fontWeight: "900",
    fontSize: 12,
    letterSpacing: 1,
  },

  statsRow: {
    flexDirection: "row",
    gap: 10,
    marginBottom: 18,
  },
  statCard: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "900",
    color: "#111827",
  },
  statLabel: {
    marginTop: 6,
    fontSize: 12,
    color: "#6B7280",
    fontWeight: "700",
  },

  sectionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 6,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#111827",
  },
  sectionLink: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2D6BFF",
  },

  txCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFFFFF",
    padding: 12,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  txLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 12,
  },
  txIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
  },
  txIcon: { fontSize: 20 },
  txTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#111827",
  },
  txDate: {
    marginTop: 4,
    fontSize: 12,
    color: "#9CA3AF",
    fontWeight: "600",
  },
  txAmount: {
    fontSize: 14,
    fontWeight: "900",
  },
  amountPositive: { color: "#10B981" },
  amountNegative: { color: "#EF4444" },

  closeButton: {
    marginTop: 10,
    backgroundColor: "#111827",
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontSize: 15,
    fontWeight: "800",
  },
});
