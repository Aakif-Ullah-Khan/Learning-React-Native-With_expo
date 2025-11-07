import React, { useEffect, useState } from "react";
import { Button, Dimensions, Platform, StatusBar, View } from "react-native";
import {
  AdEventType,
  BannerAd,
  BannerAdSize,
  InterstitialAd,
  TestIds,
} from "react-native-google-mobile-ads";

const interstitialAdUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-7749772136752736/9876543210"; // your real interstitial ad ID

const bannerAdUnitId = __DEV__
  ? TestIds.BANNER
  : "ca-app-pub-7749772136752736/1234567890"; // your real banner ad ID

const interstitial = InterstitialAd.createForAdRequest(interstitialAdUnitId, {
  keywords: ["fashion", "clothing"],
});

export default function Index() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => setLoaded(true)
    );

    const unsubscribeOpened = interstitial.addAdEventListener(
      AdEventType.OPENED,
      () => {
        if (Platform.OS === "ios") StatusBar.setHidden(true);
      }
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        if (Platform.OS === "ios") StatusBar.setHidden(false);
        interstitial.load(); // ✅ just reload next ad, don’t show automatically
      }
    );

    interstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeOpened();
      unsubscribeClosed();
    };
  }, []);

  // ✅ show only when user triggers it
  const showAd = () => {
    if (loaded) {
      interstitial.show();
      setLoaded(false); // reset state
    } else {
      console.log("Ad not loaded yet");
    }
  };

  const { width } = Dimensions.get("window");

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button title="Show Interstitial Ad" onPress={showAd} />

      <View
        style={{
          position: "absolute",
          bottom: 0,
          width: width,
          alignItems: "center",
        }}
      >
        <BannerAd
          unitId={bannerAdUnitId}
          size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
          requestOptions={{
            networkExtras: { collapsible: "bottom" },
          }}
        />
      </View>
    </View>
  );
}
