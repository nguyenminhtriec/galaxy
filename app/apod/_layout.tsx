
import { Stack, Link } from "expo-router";
import { Text } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ApodContextProvider } from "@/lib/apod-context";


export default function ApodLayout() {

    return (
        <ApodContextProvider>             
            <Stack screenOptions={{
                headerShown: true,
                title:'Exploring Astronomy Pictures',
                headerTintColor: '#4ac',
                headerStyle: {backgroundColor:'#146f'},
                headerRight: () => 
                    <Link style={{marginEnd: 8}} href='/'>
                        <FontAwesome name="home" size={24} color='#4ac'/>
                    </Link>
                }} 
            />
            <Text style={{fontSize:12, fontStyle:'italic', textAlign: 'center', backgroundColor:'gray', color:'#13a'}}>
                "In a good book, the best is between the lines." -- Swedish Proverb
            </Text>                  
        </ApodContextProvider>
    )   
}