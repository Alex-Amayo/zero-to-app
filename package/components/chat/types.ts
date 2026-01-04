import { ReactNode } from 'react';
import { ImageSourcePropType, ScrollView } from 'react-native';

export interface ChatPart {
  text: string;
}

export interface ChatHistory {
  role: 'user' | 'model';
  parts: ChatPart[];
}

export interface ChatResponse {
  candidates: {
    content: {
      parts: ChatPart[];
    };
  }[];
  history: ChatHistory[];
}

export interface ChatContainerProps {
  children: ReactNode;
}

export interface ChatMessagesProps {
  messages: { text: string; isSent: boolean }[];
  scrollViewRef: React.RefObject<ScrollView | null>;
  isLoading: boolean;
  /**
   * Optional loading animation source. Can be an ImageSourcePropType (require) or string URI.
   * If not provided, defaults to the default loading animation asset.
   */
  loadingAnimation?: ImageSourcePropType | string;
}
