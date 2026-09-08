
import { useState } from "react";
import {Text, View, Image, TouchableOpacity, StyleSheet, Platform, Pressable} from "react-native";
import { VideoPlayer} from "@/components/VideoPlayer";
import EmbedFrame from "@/components/EmbedFrame";
import { type Apod } from "@/lib/apod-types";
import { Link } from "expo-router";
import { Suspense } from "react";


export function ApodItem({ item, handleClick }: { item: Apod, handleClick: () => void }) {
    const [desc, setDesc] = useState(false);

    return (
        <View style={styles.container} >
            <Text style={styles.title}>{item.title}</Text>
            <Text style={{marginBottom: 4}}>{item.date}</Text>
            <Suspense fallback={<Text>Loading...</Text>} >
                <ApodMedia item={item} handleClick={handleClick} />
            </Suspense>
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

const ApodMedia = ({ item, handleClick }: { item: Apod, handleClick: () => void }) => {
    const isVideoMp4 = item.url?.endsWith('.mp4');
    if (item.media_type === 'image') {
        return <Image source={{ uri: item.url || '' }} style={{ width: '100%', height: 300, borderRadius: 8 }} />
            
    }
    if (Platform.OS !== 'web') {
        return (
            <View>
                {isVideoMp4
                    ? <Text style={styles.touchableText} onPress={handleClick}>Play Video MP4 </Text>
                    : <Link href={`https://www.youtube.com/watch?v=${item.url?.split("/").pop()?.slice(0, 11)}`}>
                        <Text style={styles.touchableText}>Watch Video on Youtube</Text>
                    </Link>
                }
            </View>
        )
    } 
    return (
        <View>
            {isVideoMp4
                ? <VideoPlayer src={item.url || ''} />
                : <EmbedFrame url={item.url || ''} />                  
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#e6d8d6',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
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
    touchableText: {
        width: '100%',
        color: 'blue',
        fontStyle: 'italic',
        textAlign: 'center',
        textDecorationLine: 'underline'
    }
  });  