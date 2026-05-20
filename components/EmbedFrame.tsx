
// import { WebView } from 'react-native-webview';
import { Platform, View } from 'react-native';

export default function EmbedFrame({ url }: { url: string }) {
  // if (Platform.OS === 'web') {
    return (
      <View style={{ maxWidth: 640, height: 400, overflow: 'hidden', borderRadius: 8 }}>
        <iframe
          src={url}
          width="100%"
          height="auto"
          allowFullScreen
          style={{ border: 'none' }}
        />
      </View>
    );
  // } 
  // return (
  //   <WebView
  //     source={{ uri: url }}
  //     allowsFullscreenVideo
  //     javaScriptEnabled
  //     style={{ width: '100%', height: 300 }}
  //   />
  // );
}
