import React, {ReactNode} from 'react';
import {Keyboard, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';

interface KeyboardDismissViewProps {
  children?: ReactNode;
  withScrollView?: boolean;
}

const KeyboardDismissView = ({
  children,
  withScrollView,
}: KeyboardDismissViewProps) => {
  if (withScrollView) {
    return (
      <ScrollView keyboardShouldPersistTaps="never">{children}</ScrollView>
    );
  }

  return (
    <TouchableOpacity
      activeOpacity={1}
      style={style.container}
      onPress={Keyboard.dismiss}>
      {children}
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default KeyboardDismissView;
