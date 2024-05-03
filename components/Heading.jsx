import React from 'react';
import { Text, StyleSheet } from 'react-native';

const Heading = ({ children, size, color, style }) => {
  const headingStyles = [
    styles.heading,
    { fontSize: sizes[size] || sizes.default, color },
    style,
  ];

  return <Text style={headingStyles}>{children}</Text>;
};

const sizes = {
  default: 24,
  large: 32,
  medium: 20,
  small: 16,
};

const styles = StyleSheet.create({
  heading: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default Heading;