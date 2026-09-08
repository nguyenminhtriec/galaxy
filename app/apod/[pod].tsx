
import { useApod } from "@/lib/apod-context";
import { View,  StyleSheet } from "react-native";
import { VideoPlayer } from "@/components/VideoPlayer";

export default function ApodDetail() {
    const { selectedItem } = useApod();
    console.log("Selected item:", selectedItem);
    // const isMp4 = selectedItem?.url?.endsWith('.mp4');
    return (
        <View style={styles.container} >
            {selectedItem?.url && <VideoPlayer src={selectedItem.url} />}
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


