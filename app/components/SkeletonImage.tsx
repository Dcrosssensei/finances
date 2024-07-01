import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet,  ViewStyle } from 'react-native';

interface SkeletonImageProps {
  style?: ViewStyle | ViewStyle[];
}

const SkeletonImage: React.FC<SkeletonImageProps> = ({ style }) => {
  const [fadeAnim] = useState(new Animated.Value(0.5));

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.5,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );

    animation.start();

    return () => animation.stop();
  }, [fadeAnim]);

  return (
    <Animated.View style={[styles.skeleton, style, { opacity: fadeAnim }]} />
  );
};

const styles = StyleSheet.create({
  skeleton: {
    backgroundColor: '#e0e0e0',
    borderRadius: 4,
  },
});

export default SkeletonImage;
