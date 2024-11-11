import * as React from 'react';
import { ViewProps } from 'react-native';
import type { StackPresentationTypes } from 'react-native-screens';
type ContainerProps = ViewProps & {
    stackPresentation: StackPresentationTypes;
    children: React.ReactNode;
};
/**
 * This view must *not* be flattened.
 * See https://github.com/software-mansion/react-native-screens/pull/1825
 * for detailed explanation.
 */
declare let DebugContainer: (props: ContainerProps) => JSX.Element;
export default DebugContainer;
//# sourceMappingURL=DebugContainer.native.d.ts.map