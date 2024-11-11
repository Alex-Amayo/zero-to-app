/**
 * The native MaskedView that we explicitly re-export for supported platforms: Android, iOS.
 */
import * as React from 'react';
type MaskedViewType = typeof import('@react-native-masked-view/masked-view').default;
type Props = React.ComponentProps<MaskedViewType> & {
    children: React.ReactElement;
};
export default function MaskedView({ children, ...rest }: Props): JSX.Element;
export {};
//# sourceMappingURL=MaskedViewNative.d.ts.map