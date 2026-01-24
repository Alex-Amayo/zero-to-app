import React, { useEffect, useRef } from 'react';
import { View, ScrollView, Platform } from 'react-native';
import Message from '../Message';
import { ChatMessagesProps } from '../types';
import LottieView from 'lottie-react-native';
import { ErrorBoundary } from '../../../ui/feedback/ErrorBoundary';
import { StyledText } from '../../../ui/text/StyledText';

/**
 * ChatMessages - Displays list of chat messages with scroll functionality
 * Pure content component, layout-agnostic
 */
const ChatMessages = ({
  messages,
  scrollViewRef,
  isLoading,
  loadingAnimation,
}: ChatMessagesProps): React.JSX.Element => {
  const localScrollRef = useRef(null);
  const ref = scrollViewRef || localScrollRef;

  useEffect(() => {
    if (ref.current && messages.length > 0 && typeof ref.current.scrollToEnd === 'function') {
      ref.current.scrollToEnd({ animated: false });
    }
  }, [messages]);

  // Platform-specific adjustments
  const isWeb = Platform.OS === 'web';

  return (
    <ScrollView
      ref={ref}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 20,
        paddingHorizontal: 20,
      }}
      showsVerticalScrollIndicator={true}
      keyboardShouldPersistTaps="handled">
      {messages.map((message, index) => (
        <Message key={index} text={message.text} isSent={message.isSent} />
      ))}

      {isLoading && (
        <View style={{ width: 100, height: isWeb ? 50 : 100 }}>
          {loadingAnimation &&
          typeof loadingAnimation !== 'number' &&
          (typeof loadingAnimation === 'string' ||
            (typeof loadingAnimation === 'object' &&
              loadingAnimation != null &&
              'uri' in loadingAnimation &&
              typeof (loadingAnimation as { uri?: string }).uri === 'string')) ? (
            <ErrorBoundary
              fallback={
                <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
                  <StyledText fontSize="sm" color="#666">Loading...</StyledText>
                </View>
              }
              onError={(error: Error) => console.error('Lottie animation error:', error)}
            >
              <LottieView
                source={
                  typeof loadingAnimation === 'string'
                    ? loadingAnimation
                    : { uri: (loadingAnimation as { uri: string }).uri }
                }
                autoPlay
                loop
                style={{ width: 100, height: 100 }}
              />
            </ErrorBoundary>
          ) : (
            <View style={{ width: 100, height: 100, justifyContent: 'center', alignItems: 'center' }}>
              <StyledText fontSize="sm" color="#666">Loading...</StyledText>
            </View>
          )}
        </View>
      )}
    </ScrollView>
  );
};

export default ChatMessages;
