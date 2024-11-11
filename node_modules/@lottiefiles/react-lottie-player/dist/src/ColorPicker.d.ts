import * as React from 'react';
interface ColorPickerProps {
    colorChangedEvent?: (hex: string) => void;
}
export declare class ColorPicker extends React.Component<ColorPickerProps> {
    state: {
        red: number;
        green: number;
        blue: number;
        rgba: null;
        hex: string;
        colorComponents: never[];
    };
    handleChange: (rgb: string, value: any) => void;
    parseColor: (input: string) => void;
    componentDidUpdate(_prevProps: any, prevState: any): boolean;
    render(): JSX.Element;
}
export {};
