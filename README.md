# tauri_expo-av_test
in this project, the music is played in dev mode, but not once the project has been built.

## repo for reproduction.

ticket [#7225](https://github.com/tauri-apps/tauri/issues/7225).

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
