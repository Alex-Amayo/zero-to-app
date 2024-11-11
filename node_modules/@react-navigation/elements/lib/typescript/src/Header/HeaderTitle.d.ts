import { Animated, StyleProp, TextProps, TextStyle } from 'react-native';
type Props = Omit<TextProps, 'style'> & {
    tintColor?: string;
    style?: Animated.WithAnimatedValue<StyleProp<TextStyle>>;
};
export default function HeaderTitle({ tintColor, style, ...rest }: Props): JSX.Element;
export {};
//# sourceMappingURL=HeaderTitle.d.ts.map