/// <reference types="react-native/types/modules/codegen" />
/// <reference types="react" />
import type { ViewProps, ColorValue, HostComponent } from 'react-native';
import type { WithDefault, DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes';
declare type SearchBarEvent = Readonly<{}>;
declare type SearchButtonPressedEvent = Readonly<{
    text?: string;
}>;
declare type ChangeTextEvent = Readonly<{
    text?: string;
}>;
declare type SearchBarPlacement = 'automatic' | 'inline' | 'stacked';
declare type AutoCapitalizeType = 'none' | 'words' | 'sentences' | 'characters';
interface NativeProps extends ViewProps {
    onFocus?: DirectEventHandler<SearchBarEvent> | null;
    onBlur?: DirectEventHandler<SearchBarEvent> | null;
    onSearchButtonPress?: DirectEventHandler<SearchButtonPressedEvent> | null;
    onCancelButtonPress?: DirectEventHandler<SearchBarEvent> | null;
    onChangeText?: DirectEventHandler<ChangeTextEvent> | null;
    hideWhenScrolling?: boolean;
    autoCapitalize?: WithDefault<AutoCapitalizeType, 'none'>;
    placeholder?: string;
    placement?: WithDefault<SearchBarPlacement, 'stacked'>;
    obscureBackground?: boolean;
    hideNavigationBar?: boolean;
    cancelButtonText?: string;
    barTintColor?: ColorValue;
    tintColor?: ColorValue;
    textColor?: ColorValue;
    disableBackButtonOverride?: boolean;
    inputType?: string;
    onClose?: DirectEventHandler<SearchBarEvent> | null;
    onOpen?: DirectEventHandler<SearchBarEvent> | null;
    hintTextColor?: ColorValue;
    headerIconColor?: ColorValue;
    shouldShowHintSearchIcon?: WithDefault<boolean, true>;
}
declare type ComponentType = HostComponent<NativeProps>;
interface NativeCommands {
    blur: (viewRef: React.ElementRef<ComponentType>) => void;
    focus: (viewRef: React.ElementRef<ComponentType>) => void;
    clearText: (viewRef: React.ElementRef<ComponentType>) => void;
    toggleCancelButton: (viewRef: React.ElementRef<ComponentType>, flag: boolean) => void;
    setText: (viewRef: React.ElementRef<ComponentType>, text: string) => void;
    cancelSearch: (viewRef: React.ElementRef<ComponentType>) => void;
}
export declare const Commands: NativeCommands;
declare const _default: import("react-native/Libraries/Utilities/codegenNativeComponent").NativeComponentType<NativeProps>;
export default _default;
//# sourceMappingURL=SearchBarNativeComponent.d.ts.map