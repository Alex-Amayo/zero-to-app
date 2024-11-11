import * as React from 'react';
type Render = (children: React.ReactNode) => JSX.Element;
export default function useComponent(render: Render): ({ children }: {
    children: React.ReactNode;
}) => JSX.Element;
export {};
//# sourceMappingURL=useComponent.d.ts.map