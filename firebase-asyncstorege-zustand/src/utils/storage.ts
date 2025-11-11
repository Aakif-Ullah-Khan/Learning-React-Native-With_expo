import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveUserToStorage = async (user: any) => {
  try {
    await AsyncStorage.setItem("user", JSON.stringify(user));
  } catch (error) {
    console.log("Error saving user:", error);
  }
};

export const getUserFromStorage = async () => {
  try {
    const user = await AsyncStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  } catch (error) {
    console.log("Error getting user:", error);
    return null;
  }
};

export const removeUserFromStorage = async () => {
  try {
    await AsyncStorage.removeItem("user");
  } catch (error) {
    console.log("Error removing user:", error);
  }
};

export const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.log("Error clearing storage:", error);
  }
};