import './Styles.css';
import * as React from 'react';
import { PlayerState } from './Player';
interface IControlProps {
    instance?: any;
    loop?: boolean;
    pause?: () => void;
    play?: () => void;
    playerState?: PlayerState;
    seeker?: number;
    setLoop?: (value: boolean) => void;
    setSeeker?: (seek: number, play: boolean) => void;
    stop?: () => void;
    visible?: boolean;
    buttons?: string[];
    debug?: boolean;
    toggleDebug?: () => void;
    showLabels?: boolean;
    darkTheme?: boolean;
    transparentTheme?: boolean;
    colorChangedEvent?: () => void;
    snapshot?: () => void;
}
export declare class Controls extends React.Component<IControlProps, {
    mouseDown: boolean;
    activeFrame: number;
}> {
    constructor(props: IControlProps);
    render(): JSX.Element | null;
}
export {};
