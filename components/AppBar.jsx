import React from 'react'
import colors from '../utils/colors';
import { StyleSheet, Text, View, TextInput, Pressable } from 'react-native';

const AppBar = ({title}) => {
  return (
    <View style={styles.appBar}>
      <Text style={styles.appBarTitle}>{title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  appBar: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    height: 56,
  },
  appBarTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  }, 
});

export default AppBar