import { Stack } from "expo-router";
import { useColorScheme } from "nativewind";
import { FlatList, Text, TouchableOpacity, View } from "react-native";

const Seating = () => {
  const { colorScheme } = useColorScheme();

  // sample data
  const seats = [
    { id: "1", name: "Seat A1", status: "Available" },
    { id: "2", name: "Seat A2", status: "Occupied" },
    { id: "3", name: "Seat B1", status: "Available" },
    { id: "4", name: "Seat B2", status: "Occupied" },
  ];

  return (
    <View className="flex-1 bg-white dark:bg-black px-5">
      <Stack.Screen
        options={{
          title: "Seating Plan",
          headerTitleAlign: "center",
          headerTintColor: colorScheme === "dark" ? "white" : "black",
          headerStyle: {
            backgroundColor: colorScheme === "dark" ? "black" : "white",
          },
        }}
      />

      <FlatList
        data={seats}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 20, paddingBottom: 40 }}
        renderItem={({ item }) => (
          <TouchableOpacity className="w-full rounded-2xl px-5 py-4 mb-4 bg-black dark:bg-neutral-600">
            <Text className="text-lg font-semibold text-white dark:text-white">
              {item.name}
            </Text>
            <Text className="text-lg font-semibold text-white dark:text-white">
              {item.status}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Seating;
