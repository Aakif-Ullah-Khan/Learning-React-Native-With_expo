import { useState } from "react";
import { RefreshControl, ScrollView, Text, View } from "react-native";

export default function HomeScreen() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    // Simulate API call or data fetching
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // Fetch your data here
    // await fetchData();
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View>
        <Text>Pull down to refresh</Text>
        {/* Your content here */}
      </View>
    </ScrollView>
  );
}
