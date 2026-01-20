````md
# 🚀 Custom Onboarding Screen (Expo Router + TypeScript + SVG)

A clean and modern **Onboarding Screen UI** made with **Expo Router + React Native + TypeScript**.

This repo is helpful if you want to build the same onboarding experience in your own app with:

✅ Swipe onboarding screens  
✅ Skip / Next button  
✅ Dots indicator  
✅ SVG illustrations support  
✅ Onboarding shows only **one time** (AsyncStorage)  
✅ File-based routing using Expo Router  

---

## 📸 Preview

> Add your screenshot here (optional)

Example:
```md
![Onboarding Preview](./assets/preview.png)
````

---

## 🧰 Tech Stack

* [Expo](https://expo.dev/)
* [Expo Router](https://docs.expo.dev/router/introduction/)
* React Native
* TypeScript
* AsyncStorage
* `react-native-svg` + `react-native-svg-transformer`

---

## ✅ Features

### 🎉 Onboarding UI

* Center Illustration (SVG)
* Title + Description
* Pagination dots
* Skip
* Next button changes to **Get Started** on last slide

### 💾 Show Onboarding Only Once

This project saves onboarding status using AsyncStorage:

* Key: `hasSeenOnboarding`
* Value: `true`

So onboarding will not show again once completed.

---

## 📂 Folder Structure

```
app/
  index.tsx
  (auth)/
    onboarding.tsx
  (tabs)/
    home.tsx

assets/
  Illustration.svg

metro.config.js
declarations.d.ts
```

---

## ⚙️ Setup & Run the Project

### 1️⃣ Clone the repository

```bash
git clone <YOUR_REPO_URL>
cd <PROJECT_FOLDER>
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the project (recommended with cache clear)

```bash
npx expo start -c
```

You can run it using:

* Expo Go
* Android Emulator
* iOS Simulator
* Development Build

---

## 🖼 SVG Support (Important)

React Native `<Image />` does not support SVG directly.
This project enables SVG rendering using:

✅ `react-native-svg`
✅ `react-native-svg-transformer`

### Installed packages

```bash
npx expo install react-native-svg
npm install --save-dev react-native-svg-transformer
```

### Metro Config

📄 `metro.config.js`

```js
const { getDefaultConfig } = require("expo/metro-config");

const config = getDefaultConfig(__dirname);

config.transformer.babelTransformerPath = require.resolve(
  "react-native-svg-transformer"
);

config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);

config.resolver.sourceExts.push("svg");

module.exports = config;
```

### TypeScript Declaration

📄 `declarations.d.ts`

```ts
declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FC<SvgProps>;
  export default content;
}
```

---

## 🔁 Routing Logic (Expo Router)

### `app/index.tsx`

This file decides where the user goes:

* If onboarding already seen → `/ (tabs) / home`
* Else → `/ (auth) / onboarding`

---

## 🧩 Customize Onboarding Slides

Open:

📄 `app/(auth)/onboarding.tsx`

Find the slides array:

```ts
const slides = [
  {
    id: "1",
    title: "Welcome to Surf.",
    description: "I provide essential stuff for your\nui designs every tuesday!",
    ImageComponent: Illustration,
  },
];
```

### ✅ Add new slides

Just add new objects inside the array.

---

## 🧪 Reset Onboarding (Show Again)

To show onboarding again, clear saved storage:

### Option 1: Clear app storage from device settings/emulator

OR

### Option 2: Remove AsyncStorage key manually

Temporary test code:

```ts
await AsyncStorage.removeItem("hasSeenOnboarding");
```

---

## 📖 Learn More

* Expo Docs: [https://docs.expo.dev/](https://docs.expo.dev/)
* Expo Router: [https://docs.expo.dev/router/introduction/](https://docs.expo.dev/router/introduction/)
* AsyncStorage Docs: [https://react-native-async-storage.github.io/async-storage/](https://react-native-async-storage.github.io/async-storage/)

---

## ⭐ Support

If you found this project useful, please give this repo a ⭐ on GitHub 🙌

```

If you want, I can also generate:
✅ README with badges (Expo / TypeScript / Router)  
✅ a “Download & Setup” section for beginners  
✅ example GIF preview of onboarding swipe
```
