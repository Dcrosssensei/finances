import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Text, StyleSheet, Animated, Dimensions } from 'react-native';

interface ToastProps {
  message: string;
  duration?: number;
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

const Toast: React.FC<ToastProps> = ({ message, duration = 3000, open, setOpen }) => {
  const [visible, setVisible] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (open) {
        setVisible(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 500,
          useNativeDriver: true,
        }).start(() => setVisible(false));
      }, duration);

      return () => {
        clearTimeout(timer)
        setOpen(false)
    }
    }
  }, [open]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.toast, { opacity: fadeAnim }]}>
      <Text style={styles.toastText}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    bottom: 50,
    left: Dimensions.get('window').width * 0.1,
    right: Dimensions.get('window').width * 0.1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    zIndex: 100
  },
  toastText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Toast;
