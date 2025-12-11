import {ReactNode} from "react";
import {StyleSheet, Text} from 'react-native';

export default function CustomText(
  {children, fontWeight = 'normal', color = 'black', fontSize = 14} :
  { children: ReactNode, fontWeight?: any, color?: string, fontSize?: number }
) {
  const styles = StyleSheet.create({
    text: {
      minHeight: 20,
      fontWeight: fontWeight,
      color: color,
      fontSize: fontSize,
    }
  });

  return (
    <Text style={styles.text}>{children}</Text>
  );
}

