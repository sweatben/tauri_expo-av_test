# tauri_expo-av_test
in this project, we play music with external Url.

## repo for reproduction.

ticket [#7225](https://github.com/tauri-apps/tauri/issues/7225).

you don't need to fix installation error with ```npm audit fix```. if you run this command project don't work !

## from scratch
### create expo app :
```npx create-expo-app tauri_expo-av_test```

### Navigate to thee project directory:
```cd tauri_expo-av_test```

### Install dependencies:

```npx expo install react-dom react-native-web @expo/webpack-config```

```npx expo install expo-av```

### Install Tauri :

follow this setup  https://tauri.app/v1/guides/getting-started/setup/integrate

### in addition : 

change in ```tauri.config.json``` beforeBuildCommand and beforeDevCommand by empty string:

 ``` "build": {
    "beforeBuildCommand": "",
    "beforeDevCommand": "",
 },
 ```

and change in ```package.json``` script for :
 
```
"scripts": {
    "start": "expo start",
    "web": "expo start --web",
    "desktop": "tauri dev",
    "build-web": "expo build:web",
    "build-desktop": "tauri build",
    "tauri": "tauri",
    "android": "expo start --android",
    "ios": "expo start --ios",
  },
```
change ```App.js``` for add :

```javascript
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
```

### run dev project

```npm run web``` &  ```npm run desktop``` in 2 differents terminal

### build project

```npm run build-web```

&

```npm run build-desktop```
