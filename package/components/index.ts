// Export all composite components from organized subfolders
// Layout components
export { default as ParallaxScrollView, HEADER_HEIGHT } from './layout/ParallaxScrollView';
export { default as WebPageLayout } from './layout/WebPageLayout';
export * from './layout/footer';

// Navigation components
export { default as ScreenHeader, useAnimatedHeader } from './navigation/ScreenHeader/ScreenHeader';
export { default as AppbarWeb } from './navigation/Appbar/AppbarWeb';
export { default as IconButtonGroup } from './navigation/Appbar/IconButtonGroup';
export { default as Logo } from './navigation/Appbar/Logo';

// Media components
export { ImageCarousel } from './media/ImageCarousel';
export { default as FeatureCard } from './media/FeatureCard';
export { HorizontalCarousel } from './media/HorizontalCarousel';
export { Carousel } from './media/Carousel';
export { MediaTile } from './media/MediaTile';
export { SkeletonMediaTile } from './media/SkeletonMediaTile';

// Form components
export { default as DropDownSelect } from './form/DropDownSelect';
export { default as EmailSubscriptionForm } from './form/EmailSubscriptionForm';

// Action components
export { ActionRow } from './action/ActionRow';

// Chat components
export { default as ChatContainer } from './chat/ChatContainer';
export { default as ChatMessages } from './chat/ChatMessages';
export { default as EmptyChat } from './chat/EmptyChat';
export { default as ChatInput } from './chat/ChatInput';
export type { ChatPart, ChatHistory, ChatResponse, ChatContainerProps, ChatMessagesProps } from './chat/types';

