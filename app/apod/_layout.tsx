
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
            <Text style={{paddingVertical: 4, fontSize:11, fontStyle:'italic', textAlign: 'center', backgroundColor:'#f4f', color:'#ddd'}}>
                "Look up at the stars and not down at your feet." — Stephen Hawking
            </Text>                  
        </ApodContextProvider>
    )   
}