import * as React from 'react';
import type { SceneRendererProps } from './types';
type SceneProps = {
    route: any;
} & Omit<SceneRendererProps, 'layout'>;
export declare function SceneMap<T extends any>(scenes: {
    [key: string]: React.ComponentType<T>;
}): ({ route, jumpTo, position }: SceneProps) => JSX.Element;
export {};
//# sourceMappingURL=SceneMap.d.ts.map