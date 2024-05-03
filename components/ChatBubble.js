import globalStyles from "../utils/global";
import { Text, View } from 'react-native'

const ChatBubble = ({ message, name, isCurrentUser }) => {
  const bubbleStyles = [
    globalStyles.chatBubble,
    isCurrentUser ? globalStyles.bubbleCurrentUser : globalStyles.bubbleOtherUser,
  ];

  return (
    <View style={bubbleStyles}>
      <Text style={globalStyles.chatText}>{name}</Text>
      <Text style={globalStyles.chatText}>{message}</Text>
    </View>
  );
};

export default ChatBubble