import { StyleSheet } from 'react-native';
import colors from './colors';

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  inputFocused: {
    borderBottomColor: '#2196F3', // Material Blue 500 on focus
  },
  chatBubble: {
    padding: 16,
    borderRadius: 10,
    margin: 8,
  },
  bubbleCurrentUser: {
    backgroundColor: colors.primary,
    alignSelf: 'flex-end'
  },
  bubbleOtherUser: {
    backgroundColor: colors.secondary,
    alignSelf: 'flex-start',
  },
  chatText: {
    color: '#fff',
    fontSize: 16,
  },
})
export default globalStyles;