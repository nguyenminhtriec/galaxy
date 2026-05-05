

'use client';

type Apod = {
    copyright: string | undefined,
    date: string,
    explanation: string,
    hdurl: string,
    media_type: string,
    service_version: string,
    title: string,
    url: string
}

import { useState } from "react";
// import { ChevronRight, ChevronDown } from "lucide-react";
import {Text, View, Image, TouchableOpacity, StyleSheet} from "react-native";
import { FlatList, Pressable} from "react-native";
import { WebDatePicker, NativeDatePicker} from "@/components/MyDatePicker";
import { VideoPlayer} from "@/components/VideoPlayer";
import EmbedFrame from "@/components/EmbedFrame";
import { Platform } from 'react-native';

export default function Apod() {
    const [startDate, setStartDate] = useState('2026-01-01');
    const [apod, setApod] = useState<Apod[]>([]);
    const [showingCalendar, setShowingCalendar] = useState(false);

    //const baseUrl = process.env.EXPO_PUBLIC_TTW_API_BASE_URL  //'https://ttwapi.vercel.app';

    const getPicture = async () => {
        const apodResponse = await fetch(`/apod/apod`, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify({startDate}),
        })
        if (!apodResponse.ok) {
            console.error("No response from API");
            return;
        }
        const data = await apodResponse.json();
        console.log("Apod received", data);
        setApod(data);
    }
    return (
      <View style={{flex: 1, flexDirection: 'column', padding: 2, margin: 2, gap: 2, backgroundColor:'#7dd3fc'}} >
        <View style={{flexDirection: 'row', alignItems: 'center', margin: 2}} >
            { Platform.OS !== 'web' 
                ? <NativeDatePicker 
                    isoStringDate={startDate} 
                    isShowingCalendar={showingCalendar}
                    handlePress={() => setShowingCalendar(!showingCalendar)}
                    handleChange={(e, date) => {
                        const selectedDate = date || new Date(startDate);
                        setStartDate(selectedDate!.toISOString().split('T')[0]);
                        setShowingCalendar(false);
                    }} 
                    />
                : <WebDatePicker onChange={(e) => setStartDate(e.target.value)} />
            }
            <Pressable 
                disabled={!startDate}
                onPress={getPicture} 
                style={{marginLeft: 8, padding: 4, borderWidth: 1, borderColor: 'gray', borderRadius: 4}}
            >
                <Text>Get Pictures</Text>
            </Pressable>
        </View>
        
        <FlatList numColumns={1} style={{height: '100%', padding: 4, backgroundColor:'#7dd3fc'}}
            data={apod}
            keyExtractor={item => item.date}
            renderItem={({item}) => (
                <ApodItem item={item} />
            )}>
        </FlatList>
      </View>  
    )
}

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