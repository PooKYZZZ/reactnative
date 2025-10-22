// App.js
import React from 'react';
import {
  StyleSheet,
  View,
  Alert,
  Image,
  TouchableHighlight,
  BackHandler,
} from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Image as RNImage } from 'react-native';

import MessageList from './components/MessageList';
import {
  createTextMessage,
  createImageMessage,
} from './utils/MessageUtils';

class ChatApp extends React.Component {
  // --- Handout-style state (messages + fullscreenImageId) ---
  constructor(props) {
    super(props);
    const memeUri = RNImage.resolveAssetSource(require('./assets/meme.jpg')).uri;
    this.state = {
      messages: [
        // order like your Android screenshot: Hello, World, then image
        createTextMessage('Hello'),
        createTextMessage('World'),
        createImageMessage(memeUri),
      ],
      fullscreenImageId: null,
    };
  }

  // --- Handout: dismiss helper ---
  dismissFullscreenImage = () => {
    this.setState({ fullscreenImageId: null });
  };

  // --- Handout: press handler for list items ---
  handlePressMessage = (message) => {
    if (message.type === 'text') {
      Alert.alert(
        'Delete message?',
        `"${message.text}"`,
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Delete',
            style: 'destructive',
            onPress: () =>
              this.setState((prev) => ({
                messages: prev.messages.filter((m) => m.id !== message.id),
              })),
          },
        ],
        { cancelable: true }
      );
    } else if (message.type === 'image') {
      this.setState({ fullscreenImageId: message.id });
    }
  };

  // --- Handout: renderFullscreenImage helper (uses TouchableHighlight overlay) ---
  renderFullscreenImage = () => {
    const { messages, fullscreenImageId } = this.state;
    if (!fullscreenImageId) return null;

    const image = messages.find((m) => m.id === fullscreenImageId);
    if (!image) return null;

    const { uri } = image;
    return (
      <TouchableHighlight
        style={styles.fullscreenOverlay}
        onPress={this.dismissFullscreenImage}
        underlayColor="#000"
      >
        <Image style={styles.fullscreenImage} source={{ uri }} resizeMode="contain" />
      </TouchableHighlight>
    );
  };

  // --- Handout: BackHandler (use componentDidMount / componentWillUnmount) ---
  componentDidMount() {
    this.subscription = BackHandler.addEventListener('hardwareBackPress', () => {
      const { fullscreenImageId } = this.state;
      if (fullscreenImageId) {
        this.dismissFullscreenImage();
        return true; // handled
      }
      return false;   // let system handle
    });
  }

  componentWillUnmount() {
    this.subscription && this.subscription.remove();
  }

  // --- Handout: renderMessageList wrapper ---
  renderMessageList() {
    const { messages } = this.state;
    return (
      <View style={styles.content}>
        <MessageList messages={messages} onPressMessage={this.handlePressMessage} />
      </View>
    );
  }

  // --- Handout: render (container + renderMessageList + renderFullscreenImage) ---
  render() {
    return (
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
        <View style={styles.container}>
          {this.renderMessageList()}
          {this.renderFullscreenImage()}
        </View>
      </SafeAreaView>
    );
  }
}

export default function App() {
  return (
    <SafeAreaProvider>
      <ChatApp />
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  // off-white background per your preference
  safe: { flex: 1, backgroundColor: '#efe3cbff' },
  container: { flex: 1 },
  content: { flex: 1 },

  // fullscreen overlay (matches handout approach)
  fullscreenOverlay: {
    position: 'absolute',
    left: 0, right: 0, top: 0, bottom: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullscreenImage: {
    width: '100%',
    height: '100%',
  },
});
