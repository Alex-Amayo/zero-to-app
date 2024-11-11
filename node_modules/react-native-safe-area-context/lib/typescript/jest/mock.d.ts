import React from 'react';
import type { Metrics } from '../src/SafeArea.types';
import type { SafeAreaProviderProps } from '../src/SafeAreaContext';
declare const _default: {
    initialWindowMetrics: Metrics;
    useSafeAreaInsets: () => import("../src/SafeArea.types").EdgeInsets;
    useSafeAreaFrame: () => import("../src/SafeArea.types").Rect;
    SafeAreaProvider: ({ children, initialMetrics }: SafeAreaProviderProps) => React.JSX.Element;
    SafeAreaInsetsContext: React.Context<import("../src/SafeArea.types").EdgeInsets | null>;
    SafeAreaFrameContext: React.Context<import("../src/SafeArea.types").Rect | null>;
};
export default _default;
//# sourceMappingURL=mock.d.ts.map