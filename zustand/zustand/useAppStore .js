import { create } from "zustand";

const useAppStore = create((set) => ({
  // ✅ States
  profile: {
    name: "Aakif",
    email: "aakif@example.com",
    imageUri: null,
  },

  // ✅ Actions (functions to update state)
  setProfile: (name, email) =>
    set((state) => ({
      profile: {
        ...state.profile,
        name,
        email,
      },
    })),

  setImageUri: (uri) =>
    set((state) => ({
      profile: {
        ...state.profile,
        imageUri: uri,
      },
    })),
}));

export default useAppStore;
