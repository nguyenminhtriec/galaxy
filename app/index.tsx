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
      }}
    >
      <Image source={require('@/assets/images/icon.png')} alt="A bee" style={{ width: 100, height: 100 }} />
      <Text>{poem}</Text>
      <Link href="./apod" style={{ padding: 8, backgroundColor: '#7dd3fc', borderRadius: 4 }}>
        View APOD
      </Link>
      <Link href="./test" style={{ padding: 8, backgroundColor: '#7dd3fc', borderRadius: 4 }}>
        Test Video Player
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
