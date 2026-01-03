import React, { useRef, useEffect } from 'react';
import { StyleSheet, View, ScrollView, Platform, ImageSourcePropType } from 'react-native';
import { useDimensions } from '../../../hooks';
import ChatMessages from '../ChatMessages';
import EmptyChat from '../EmptyChat';
import ChatInput from '../ChatInput';

interface ChatContainerProps {
  messages: { text: string; isSent: boolean }[];
  isLoading: boolean;
  sendMessage: (message: string) => void;
  /**
   * Mascot image for empty chat state. Can be an ImageSourcePropType (require) or string URI.
   */
  mascotImage: ImageSourcePropType | string;
  /**
   * Optional loading animation source for chat messages. Can be an ImageSourcePropType (require) or string URI.
   * If not provided, a text "Loading..." fallback is shown.
   */
  loadingAnimation?: ImageSourcePropType | string;
}

/**
 * ChatContainer - Pure content component for chat functionality
 * Renders EmptyChat when no messages, ChatMessages + ChatInput when messages exist
 * Layout-agnostic: parent handles WebPageLayout, KeyboardAvoidingView, background, etc.
 */
const ChatContainer = ({
  messages,
  isLoading,
  sendMessage,
  mascotImage,
  loadingAnimation,
}: ChatContainerProps): React.JSX.Element => {
  const scrollViewRef = useRef<ScrollView>(null);
  const dimensions = useDimensions();
  const isMobileWeb = Platform.OS === 'web' && dimensions.breakpoint === 'small';

  useEffect(() => {
    if (scrollViewRef.current && messages.length > 0) {
      scrollViewRef.current?.scrollToEnd({ animated: false });
    }
  }, [messages]);

  // Empty state - show EmptyChat
  if (messages.length === 0) {
    return <EmptyChat isLoading={isLoading} sendMessage={sendMessage} mascotImage={mascotImage} />;
  }

  // Messages state - show ChatMessages and ChatInput
  // On mobile web, ensure input stays at bottom with proper flex layout
  return (
    <View style={[styles.container, isMobileWeb && styles.containerMobileWeb]}>
      <View style={styles.messagesWrapper}>
        <ChatMessages messages={messages} scrollViewRef={scrollViewRef} isLoading={isLoading} loadingAnimation={loadingAnimation} />
      </View>
      <View style={[styles.inputContainer, Platform.OS === 'ios' && { paddingBottom: 100 }]}>
        <ChatInput isLoading={isLoading} sendMessage={sendMessage} />
      </View>
    </View>
  );
};

export default ChatContainer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  containerMobileWeb: {
    // On mobile web, ensure proper flex layout
    // Note: Parent ScrollView handles viewport height
  },
  messagesWrapper: {
    flex: 1,
    minHeight: 0, // Allow shrinking
  },
  inputContainer: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
    // Input stays at bottom due to flex layout
  },
});
