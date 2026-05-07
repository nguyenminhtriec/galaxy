
import { useState } from "react";
import {Text, View, Image, TouchableOpacity, StyleSheet} from "react-native";
import { VideoPlayer} from "@/components/VideoPlayer";
import EmbedFrame from "@/components/EmbedFrame";
import { type Apod } from "@/lib/apod-types";


export function ApodItem({ item }: { item: Apod }) {
    const [desc, setDesc] = useState(false);
    const isVideoMp4 = item.media_type === 'video' && item.url.endsWith('.mp4');

    return (
        <View style={styles.container} >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={{marginBottom: 4}}>{item.date}</Text>
            {/* {isVideoMp4
            ? <video controls className="w-full">
                <source src={item.url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            : 
            item.media_type === 'video'
                ? <iframe  src= {item.url} title={item.title} />
                : <img src={item.url} className="size-auto" />
            } */}
            {/* {item.media_type === 'video'
                ? <Text>{item.title}</Text>
                : <Image source={{ uri: item.url }} style={{ width: 400, height: 400 }} />} */}
            { isVideoMp4 
                ?  <VideoPlayer src={item.url} /> //<Text>{item.url}</Text> 
                : item.media_type === 'video'
                    ? <EmbedFrame url={item.url} /> //<Text>{item.url}</Text> //
                    : <Image source={{ uri: item.url }} style={{ width:'100%', height: 400 }} />}
            <View style={{ marginVertical: 8 }} >
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }} >
                    <Text style={{ marginRight: 4 }}>Explanation</Text>
                    <TouchableOpacity style={styles.button} onPress={() => setDesc(!desc)}>
                        <Text>{!desc ? "Open" : "Close"}</Text>
                    </TouchableOpacity>
                </View>
                <Text>{desc && item.explanation}</Text>
            </View>
            {item.copyright ? <Text>&copy; {item.copyright}</Text> : <Text>Source: NASA OPEN API</Text>}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#cdcdcd',
      alignItems: 'flex-start',
      justifyContent: 'center',
      overflow: 'hidden',
      padding: 4,
      gap: 4,
      borderColor: 'gray',
      borderRadius: 8,
      borderWidth: 1,
      margin: 2,
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
    },
    date: {
      marginBottom: 4,
    },
    button: {
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      padding: 4,
    },
  });  