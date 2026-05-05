
'use dom';
import { Text } from "react-native";

export default function EmbedFrame({ url }: { url: string }) {
  return (
    <iframe
      src={url}
      width="100%"
      height="400px"
      allowFullScreen
      style={{ border: 'none' }}
    />
    // <Text>{url}</Text>
  );
}

// import { WebView } from 'react-native-webview';
// import { View, Text } from 'react-native';

// export default function EmbedFrame({ url }: { url: string }) {
//   return (
//     <View style={{ flex: 1 }}>
//       <WebView
//         source={{ uri: url }}
//         // allowsFullscreenVideo
//         // javaScriptEnabled
//         style={{ width: '100%', height: 300 }}
//       />
//     </View>
//   );
  
// }