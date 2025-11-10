import { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import Wheel from "react-native-spin-the-wheel";

export default function Index() {
  const [winner, setWinner] = useState<string | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState(""); // input field
  const [segments, setSegments] = useState(
    Array.from({ length: 6 }, (_, i) => ({ text: `User ${i + 1}` }))
  );

  const colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "pink",
    "orange",
    "purple",
    "cyan",
    "lime",
    "magenta",
    "teal",
    "brown",
    "gray",
    "indigo",
    "gold",
  ];

  const onWheelFinish = (v: any) => {
    setWinner(v.text);
    setModalVisible(true); // show modal
  };

  const closeModal = () => {
    setModalVisible(false);
    setWinner(null);
  };

  const addUser = () => {
    const trimmed = userName.trim();
    if (!trimmed) {
      Alert.alert("Error", "Name cannot be empty");
      return;
    }
    if (trimmed.length > 20) {
      Alert.alert("Error", "Name must be under 20 characters");
      return;
    }
    setSegments((prev) => [...prev, { text: trimmed }]);
    setUserName("");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Add Users</Text>
      <View style={styles.inputRow}>
        <TextInput
          placeholder="Enter user name"
          style={styles.input}
          value={userName}
          onChangeText={setUserName}
        />
        <TouchableOpacity style={styles.addButton} onPress={addUser}>
          <Text style={styles.buttonText}>Add</Text>
        </TouchableOpacity>
      </View>

      <Wheel
        outlineWidth={0}
        segments={segments}
        segColors={colors}
        textColors={["white"]}
        onFinished={onWheelFinish}
        pinImage={require("../assets/images/favicon.png")}
        size={300}
      />

      {/* Winner Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.winnerText}>🎉 {winner} Wins! 🎉</Text>
            <TouchableOpacity style={styles.button} onPress={closeModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
    width: "90%",
    justifyContent: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    flex: 1,
    paddingHorizontal: 10,
    borderRadius: 8,
    height: 40,
    backgroundColor: "white",
  },
  addButton: {
    backgroundColor: "#ff6600",
    paddingHorizontal: 15,
    marginLeft: 10,
    borderRadius: 8,
    justifyContent: "center",
  },
  buttonText: { color: "white", fontWeight: "bold" },
  modalContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: 300,
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    alignItems: "center",
  },
  winnerText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#ff6600",
    textAlign: "center",
    marginBottom: 15,
  },
});
