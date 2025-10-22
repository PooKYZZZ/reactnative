import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import MessageItem from "./MessageItem";

const keyExtractor = (item) => item.id.toString();

export default class MessageList extends React.Component {
  renderItem = ({ item }) => {
    const { onPressMessage = () => {} } = this.props;
    return <MessageItem message={item} onPressMessage={onPressMessage} />;
  };

  render() {
    const { messages = [] } = this.props;
    return (
      <View style={styles.wrap}>
        <FlatList
          data={messages}
          renderItem={this.renderItem}
          keyExtractor={keyExtractor}
          style={styles.list}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          // NOTE: NOT inverted (so order is top -> bottom like your Android sample)
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: { flex: 1, backgroundColor: "#fff" },
  list: { flex: 1 },
  content: { paddingTop: 8, paddingHorizontal: 10, paddingBottom: 24 },
});
