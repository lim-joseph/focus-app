import { Colors } from '@/constants/Colors';
import { Sizes } from '@/constants/Sizes';
import { type ComponentProps } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface props {
  title: string | null;
  inverted: boolean | null;
}

export function Button({
  title = '',
  inverted = false,
  onPress,
  style,
}: ComponentProps<typeof TouchableOpacity> & props) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style,
        styles.button,
        styles[inverted ? 'buttonInverted' : 'buttonNormal'],
      ]}
    >
      <Text
        style={[
          styles.buttonText,
          [styles[inverted ? 'buttonTextInverted' : 'buttonTextNormal']],
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    // fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    fontFamily: 'sans-serif',
    overflow: 'visible',
  },

  buttonTextNormal: {
    color: 'white',
  },
  buttonTextInverted: {
    color: Colors.light.tint,
  },

  button: {
    height: Sizes.buttonHeight,
    borderRadius: Sizes.buttonRadius,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    overflow: 'visible',
    padding: 10,
  },

  buttonNormal: {
    backgroundColor: Colors.light.tint,
  },

  buttonInverted: {
    backgroundColor: 'none',
  },
});
