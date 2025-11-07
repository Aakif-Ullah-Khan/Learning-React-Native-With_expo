import { Stack, useRouter } from "expo-router";
import { useColorScheme } from "nativewind";
import { Switch, Text, TouchableOpacity, View } from "react-native";

export default function Index() {
  const { colorScheme, toggleColorScheme } = useColorScheme();
  const router = useRouter(); // router hook

  return (
    <View className="flex-1 bg-white dark:bg-black px-6">
      <Stack.Screen
        options={{
          title: "Settings",
          headerTitleAlign: "center",
          headerTintColor: colorScheme === "dark" ? "white" : "black",
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "#0D0D0D" : "#F9F9F9",
          },
        }}
      />

      <View className="mt-10 w-full gap-6">
        {/* Dark Mode Card */}
        <View className="w-full bg-gray-100 dark:bg-neutral-900 rounded-2xl px-5 py-4 flex-row justify-between items-center shadow-md dark:shadow-none">
          {/* Label */}
          <Text className="text-lg font-semibold text-black dark:text-white">
            Dark Mode
          </Text>
          <Switch
            value={colorScheme === "dark"}
            onValueChange={toggleColorScheme}
            trackColor={{ false: "#E5E7EB", true: "#4F46E5" }} // light gray / blue
            thumbColor={colorScheme === "dark" ? "#FFFFFF" : "#F9FAFB"} // white thumb
            ios_backgroundColor="#E5E7EB"
            style={{ width: 34, height: 20 }} // fix thumb/track proportion
          />
        </View>

        {/* Navigate Button */}
        <TouchableOpacity
          className="w-full bg-blue-600 dark:bg-green-500 rounded-2xl px-5 py-4 items-center"
          onPress={() => router.push("/seating")} // path to Seating screen
        >
          <Text className="text-white text-lg font-semibold">
            Go to Seating
          </Text>
        </TouchableOpacity>

        <Text className="text-base text-neutral-600 dark:text-neutral-400 self-center pt-4">
          Your theme will follow system by default.
        </Text>
      </View>
    </View>
  );
}
