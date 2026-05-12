
import { useApod } from "@/lib/apod-context";
import { Text, ScrollView,  StyleSheet } from "react-native";
import { ApodItem } from "@/components/ApodItem";

export default function ApodDetail() {
    const { selectedApod } = useApod(); 
    console.log("Selected APOD in detail view", selectedApod);
    return (
        <ScrollView style={styles.container} scrollEnabled={true}>
            {selectedApod ? <ApodItem item={selectedApod} /> : <Text>No APOD selected</Text>}
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 4,
      backgroundColor: '#146f',
    }, 
})


