/**
 * ============================================================
 * REDIRECT — app/index.tsx
 * ============================================================
 *
 * WHY THIS FILE EXISTS:
 * When the app first opens, Expo Router looks for `index.tsx`
 * in the `app/` folder. We use <Redirect> to immediately send
 * the user to the "(tabs)" group, which shows the Home tab.
 *
 * Without this, the app would show a blank screen on launch.
 * ============================================================
 */

import { Redirect } from "expo-router";

export default function Index() {
    // Redirect to the tabs group — the home tab is the default
    return <Redirect href="/(tabs)/home" />;
}
