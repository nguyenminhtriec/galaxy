import { Link } from "expo-router";
import { Text, View , Image} from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        gap: 16,
        backgroundColor: "#033346",
        
      }}
    >
      <Image source={require('@/assets/images/bee.png')} alt="A Tiny bee" style={{ width: 150, height: 100, borderRadius: 8 }} />
      <Text style={{color:'#ededed', fontSize: 16}}>{poem}</Text>
      <Link href="./apod" style={{ padding: 8, backgroundColor: '#116688', borderColor: '#8aa7b4', borderRadius: 4 }}>
        <Text style={{ color: '#3fe' }}>View APOD</Text>
      </Link>
      
    </View>
  );
}

const poem = 
`A tiny hum, a golden blur,
Through garden greens, a gentle stir.
On velvet petals, soft it lands,
With fuzzy body, busy hands.

From sunlit bloom to fragrant prize,
It sips the nectar, with keen eyes.
A dusty coat of pollen bright,
Shared with the world, with all its might.

Back to the hive, a golden store,
Sweet honey made, for evermore.
A tireless worker, small and grand,
The little bee, across the land.`;
