
import { useVideo } from "@/lib/apod-context";
import { View,  StyleSheet } from "react-native";
import { VideoPlayer } from "@/components/VideoPlayer";

export default function ApodDetail() {
    const { selectedVideo } = useVideo();
    console.log("Selected video URL:", selectedVideo);
    const isMp4 = selectedVideo?.endsWith('.mp4');
    return (
        <View style={styles.container} >
            {isMp4 && <VideoPlayer src={selectedVideo!} />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 4,
      backgroundColor: '#146f',
      overflow: 'hidden',
    }, 
})


