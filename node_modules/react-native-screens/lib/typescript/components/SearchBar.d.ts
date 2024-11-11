import React from 'react';
import { SearchBarCommands, SearchBarProps } from 'react-native-screens';
export declare const NativeSearchBar: React.ComponentType<SearchBarProps> & typeof NativeSearchBarCommands;
export declare const NativeSearchBarCommands: SearchBarCommandsType;
declare type SearchBarCommandsType = {
    blur: (viewRef: React.ElementRef<typeof NativeSearchBar>) => void;
    focus: (viewRef: React.ElementRef<typeof NativeSearchBar>) => void;
    clearText: (viewRef: React.ElementRef<typeof NativeSearchBar>) => void;
    toggleCancelButton: (viewRef: React.ElementRef<typeof NativeSearchBar>, flag: boolean) => void;
    setText: (viewRef: React.ElementRef<typeof NativeSearchBar>, text: string) => void;
    cancelSearch: (viewRef: React.ElementRef<typeof NativeSearchBar>) => void;
};
declare class SearchBar extends React.Component<SearchBarProps> {
    nativeSearchBarRef: React.RefObject<SearchBarCommands>;
    constructor(props: SearchBarProps);
    _callMethodWithRef(method: (ref: SearchBarCommands) => void): void;
    blur(): void;
    focus(): void;
    toggleCancelButton(flag: boolean): void;
    clearText(): void;
    setText(text: string): void;
    cancelSearch(): void;
    render(): string | number | boolean | Iterable<React.ReactNode> | React.JSX.Element | null | undefined;
}
export default SearchBar;
//# sourceMappingURL=SearchBar.d.ts.map