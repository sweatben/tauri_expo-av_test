import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Audio } from 'expo-av';

function SoundPlayer({ mp3 }) {
  const sound = React.useRef(new Audio.Sound());

  React.useEffect(() => {
    let unsubscribe = sound.current;

    return () => unsubscribe.unloadAsync();
  }, []);

  const LoadAudio = async () => {
    const checkLoading = await sound.current.getStatusAsync();
    // Get Loading Status

    if (checkLoading.isLoaded === false) {
      try {
        const result = await sound.current.loadAsync("https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3", {}, true);
        if (result.isLoaded === false) {
          console.log('Error in Loading Audio');
        } else {
          await playSound();
        }
      } catch (error) {
        console.log('Error in Loading Audio');
      }
    } else {
      console.log('Error in Loading Audio');
    }
  };

  const playSound = async () => {
    try {
      const result = await sound.current.getStatusAsync();
      // Get Loading Status

      if (result.isLoaded) {
        if (result.isPlaying === false) {
          sound.current.playAsync();
        }
      } else {
        await LoadAudio();
      }
    } catch (error) {
      console.log('Error in Playing Audio');
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Play Sound" onPress={playSound} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SoundPlayer;
