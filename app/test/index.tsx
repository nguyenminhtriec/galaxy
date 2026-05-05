
import { Text, View } from "react-native";
import {VideoPlayer} from "@/components/VideoPlayer";

export default function TestPage() {
  return (
    <View>
      <Text>Test Page</Text>
      <VideoPlayer src="https://apod.nasa.gov/apod/image/2603/TotalLunarEclipse2018.mp4" />
    </View>
  );
}
