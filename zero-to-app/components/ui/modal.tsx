// 1. IMPORTS
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Modal as RNModal,
  Platform,
  Pressable,
  View,
  StyleSheet,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { Typography } from './typography';
import { useTheme } from '../../theme';
import { useDimensions, breakpoints } from '../../hooks';
import { renderIcon } from '../../icons';
import { elevationStyle } from './themed-view';

// 2. TYPES
export interface ModalProps {
  /** Whether the modal is visible */
  visible: boolean;
  /** Called when the modal should close */
  onDismiss: () => void;
  /** Optional title shown in the modal header */
  title?: string;
  /** Modal body content */
  children: React.ReactNode;
  /** Footer actions row (e.g. Button components) */
  actions?: React.ReactNode;
  /** Whether tapping the scrim dismisses the modal. @default true */
  dismissable?: boolean;
  /** Override the modal container style */
  style?: StyleProp<ViewStyle>;
}

// 3. COMPONENT
const Modal = ({
  visible,
  onDismiss,
  title,
  children,
  actions,
  dismissable = true,
  style,
}: ModalProps) => {
  const theme = useTheme();
  const t = theme.tokens.modal;
  const { width } = useDimensions();
  const isDialog = width >= breakpoints.medium;

  const [reduceMotion, setReduceMotion] = useState(false);
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    let mounted = true;
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      const { AccessibilityInfo } = require('react-native');
      AccessibilityInfo?.isReduceMotionEnabled?.().then((enabled: boolean) => {
        if (mounted) setReduceMotion(!!enabled);
      });
    } catch (e) { /* ignore */ }
    return () => { mounted = false; };
  }, []);

  useEffect(() => {
    if (visible) {
      if (reduceMotion) {
        slideAnim.setValue(1);
      } else {
        Animated.timing(slideAnim, {
          toValue: 1,
          duration: 280,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }).start();
      }
    } else {
      slideAnim.setValue(0);
    }
  }, [visible, reduceMotion, slideAnim]);

  const translateY = slideAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [isDialog ? -20 : 300, 0],
  });

  const opacity = slideAnim.interpolate({ inputRange: [0, 1], outputRange: [0, 1] });

  const shadowStyle = elevationStyle(3, theme.shadow);

  const containerStyle: ViewStyle = isDialog
    ? {
        maxWidth: 560,
        width: '90%',
        borderRadius: theme.shape.surfaceBorderRadius,
        ...shadowStyle,
      }
    : {
        width: '100%',
        borderTopLeftRadius: theme.shape.surfaceBorderRadius * 2,
        borderTopRightRadius: theme.shape.surfaceBorderRadius * 2,
        ...shadowStyle,
      };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onDismiss}
      statusBarTranslucent
    >
      {/* Scrim */}
      <Animated.View style={[styles.scrim, { backgroundColor: t.scrim, opacity }]}>
        <Pressable
          style={StyleSheet.absoluteFill}
          onPress={dismissable ? onDismiss : undefined}
          accessibilityLabel="Close modal"
        />
      </Animated.View>

      {/* Positioned container */}
      <View
        style={[styles.positioner, isDialog ? styles.dialogPositioner : styles.sheetPositioner]}
        pointerEvents="box-none"
      >
        <Animated.View
          style={[
            containerStyle,
            { backgroundColor: t.background, transform: [{ translateY }], opacity },
            style,
          ]}
          accessibilityViewIsModal
        >
          {/* Header */}
          {(title !== undefined) && (
            <View style={[styles.header, { borderBottomColor: t.headerBorder, borderBottomWidth: 1 }]}>
              <Typography variant="titleMedium" weight="medium" style={{ color: t.text, flex: 1 }}>
                {title}
              </Typography>
              <Pressable
                onPress={onDismiss}
                style={styles.closeButton}
                accessibilityLabel="Close"
                accessibilityRole="button"
              >
                {renderIcon({ name: 'x' }, 'Feather', 20, t.text)}
              </Pressable>
            </View>
          )}

          {/* Body */}
          <View style={styles.body}>{children}</View>

          {/* Actions */}
          {actions && (
            <View style={[styles.actions, { borderTopColor: t.headerBorder, borderTopWidth: 1 }]}>
              {actions}
            </View>
          )}
        </Animated.View>
      </View>
    </RNModal>
  );
};

Modal.displayName = 'Modal';

// 4. STYLES
const styles = StyleSheet.create({
  scrim: {
    ...StyleSheet.absoluteFillObject,
  },
  positioner: {
    ...StyleSheet.absoluteFillObject,
    pointerEvents: 'box-none',
  } as ViewStyle,
  dialogPositioner: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  sheetPositioner: {
    justifyContent: 'flex-end',
    alignItems: 'stretch',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  closeButton: {
    padding: 4,
    marginLeft: 8,
  },
  body: {
    padding: 24,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
});

// 5. EXPORTS
export { Modal };
