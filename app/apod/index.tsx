

'use client';


import { useState } from "react";
// import { ChevronRight, ChevronDown } from "lucide-react";
import {Text, View, Image, TouchableOpacity, StyleSheet} from "react-native";
import { FlatList, Pressable} from "react-native";
import { WebDatePicker, NativeDatePicker} from "@/components/MyDatePicker";
import { Platform } from 'react-native';
import { type Apod } from "@/lib/apod-types";
import { ApodItem } from "@/components/ApodItem";
import { useApod } from "@/lib/apod-context";
import { useRouter } from "expo-router";

export default function Apod() {
    const [startDate, setStartDate] = useState('2026-01-01');
    const [apod, setApod] = useState<Apod[]>([]);
    const [showingCalendar, setShowingCalendar] = useState(false);
    const router = useRouter();
    const { setSelectedApod } = useApod();

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

    const handleApodClick = (apod: Apod) => {
        setSelectedApod(apod);
        router.push(`./apod/${apod.date}`);
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
                <Pressable onPress={() => handleApodClick(item)} >
                    <ApodItem item={item} />
                </Pressable>
            )}>
        </FlatList>
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