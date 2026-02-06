import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function CustomDrawer(props: any) {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
    >
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
          <Image
            source={{ uri: "https://via.placeholder.com/80" }}
            style={styles.profileImage}
          />
          <Text style={styles.name}>John Doe</Text>
          <Text style={styles.email}>john.doe@example.com</Text>
        </View>
      </View>

      {/* Drawer Items */}
      <View style={styles.drawerItems}>
        <DrawerItemList {...props} />
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="settings-outline" size={22} color="#666" />
          <Text style={styles.footerText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerItem}>
          <Ionicons name="log-out-outline" size={22} color="#666" />
          <Text style={styles.footerText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    backgroundColor: "#e2b44a",
    borderRadius: 30,
  },
  profileSection: {
    alignItems: "center",
    marginTop: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 3,
    borderColor: "white",
  },
  name: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  email: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 14,
    marginTop: 4,
  },
  drawerItems: {
    flex: 1,
    paddingTop: 10,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    padding: 20,
  },
  footerItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  footerText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#666",
  },
});
