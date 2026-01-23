import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import { Button, Pressable, Text, View } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Index() {
  const [count , setCount] = useState(0);
  const [toggle , setToggle] = useState(false);

  const increment = () =>{
    setCount(count + 1);
  }
  const decrement = () =>{
    setCount(count - 1);
  }
  const reset = () =>{
    setCount(count *0);
  }
  return (
    <SafeAreaView className="flex-1 items-center bg-white ">
      <StatusBar style="dark" backgroundColor="#ffffff"/>
      <View className="w-[90%] h-[30%] bg-gray-200 items-center justify-around rounded-lg shadow-lg mt-5">
        <Text className="text-lg font-semibold">You Count is {count}</Text>
      <View className='flex-row justify-between items-center'>
          <Pressable onPress={increment}>
          <Text className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg">Increment</Text>
        </Pressable>
        <Pressable onPress={decrement}>
          <Text className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg" >Decrement</Text>
        </Pressable>
        <Pressable onPress={reset} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg flex-row items-center">
         <MaterialIcons name="lock-reset" size={18} color="#ffffff" />
        </Pressable>
      </View>
      </View>
        <Text>Toggle is {toggle ? "ON" : "OFF"}</Text>
        <Button title={toggle ? "OFF" : "ON"} color={toggle ? "red" : "green"}  onPress={() => setToggle(!toggle)} />
      <View>

      </View>
    </SafeAreaView>
  );
}
