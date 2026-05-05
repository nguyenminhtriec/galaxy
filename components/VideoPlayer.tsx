
import {View, StyleSheet} from "react-native";
import {VideoView, useVideoPlayer} from "expo-video";

export function VideoPlayer({src}: {src: string}) {
  const player = useVideoPlayer(src, player => {
    // player.loop = true;
    // player.play();
  });

  return (
    <View style={styles.container}>
      <VideoView
        style={styles.video}
        player={player}
        allowsFullscreen
        allowsPictureInPicture
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  video: { width: '100%', height: 250 },
});

