import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { type Metrics } from 'react-native-safe-area-context';
type Props = {
    children: React.ReactNode;
    style?: StyleProp<ViewStyle>;
};
declare function SafeAreaProviderCompat({ children, style }: Props): JSX.Element;
declare namespace SafeAreaProviderCompat {
    var initialMetrics: Metrics;
}
export default SafeAreaProviderCompat;
//# sourceMappingURL=SafeAreaProviderCompat.d.ts.map