import AsyncStorage from "@react-native-async-storage/async-storage";
import { signOut } from "firebase/auth";
import { create } from "zustand";
import { auth } from "../config/firebaseConfig";


interface UserState {
  user: any;
  setUser: (user: any) => void;
  removeUser: () => void;
  logout: () => Promise<void>;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  setUser: (user: any) => set({ user }),
  removeUser: () => set({ user: null }),

  logout: async () => {
    try {
      // 1️⃣ Sign out from Firebase
      await signOut(auth);

      // 2️⃣ Remove user from AsyncStorage
      await AsyncStorage.removeItem("user");

      // 3️⃣ Reset Zustand state
      set({ user: null });

      console.log("User logged out successfully!");
    } catch (error) {
      console.log("Logout Error:", error);
    }
  },
}));

export default useUserStore;
