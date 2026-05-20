
'use client';

import { View, Text, TouchableOpacity, StyleSheet, FlatList, Platform} from "react-native";
import { WebDatePicker, NativeDatePicker} from "@/components/MyDatePicker";
import { type Apod } from "@/lib/apod-types";
import { ApodItem } from "@/components/ApodItem";
import { useEffect, useState } from "react";
import { useVideo } from "@/lib/apod-context";
import { useRouter } from "expo-router";
import { useWindowDimensions } from 'react-native';
// import { ChevronRight, ChevronDown } from "lucide-react";

export default function Apod() {
    const [startDate, setStartDate] = useState('2026-01-01');
    const [apod, setApod] = useState<Apod[]>([]);
    const [showingCalendar, setShowingCalendar] = useState(false);
    const router = useRouter();
    const { setSelectedVideo } = useVideo();

    const windowWidth = useWindowDimensions().width;
    const [columnCount, setColumnCount] = useState(1);
    

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

    const handleVideoClick = (apod: Apod) => {
        setSelectedVideo(apod.url);
        router.push(`./apod/${apod.date}`);
    }

    const showRandomPicture = () => {
        let futureDate = new Date("2030-01-01");
        futureDate.setDate(futureDate.getDate() + Math.floor(Math.random() * 365));
        setStartDate(futureDate.toISOString().split('T')[0]);
        console.log("Random date set to:", futureDate.toISOString().split('T')[0]);
    }

    useEffect(() => {
        const count = windowWidth < 600 ? 1 : windowWidth < 768 ? 2 : 4;
        setColumnCount(count);
    }, [windowWidth])

    useEffect(() => {
        getPicture();

    }, [startDate])

    return (
      <View style={{flex: 1, flexDirection: 'column', padding: 2, margin: 2, gap: 2, backgroundColor:'#7dd3fc00'}} >
        <View style={{flexDirection: 'row', width: '100%', alignItems: 'center', justifyContent:'space-between', margin: 4}} >
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
            <TouchableOpacity 
                disabled={!startDate}
                onPress={showRandomPicture} 
                style={{marginRight: 8, padding: 4, borderWidth: 1, backgroundColor: '#4af', borderColor: 'lightgray', borderRadius: 4}}
            >
                <Text>Random Pictures</Text>
            </TouchableOpacity>
        </View>
        <FlatList key={columnCount.toString()} numColumns={columnCount} style={{height: '100%', padding: 4, backgroundColor:'#7dd3fc'}}
            data={apod}
            keyExtractor={item => item.date} 
            renderItem={({item}) => (
                <ApodItem item={item} handleClick={() => handleVideoClick(item)} />
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
      borderColor: 'lightgray',
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