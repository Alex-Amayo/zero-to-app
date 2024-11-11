import { act as reactTestRendererAct } from 'react-test-renderer';
type ReactAct = typeof reactTestRendererAct;
declare global {
    var IS_REACT_ACT_ENVIRONMENT: boolean | undefined;
}
declare function setIsReactActEnvironment(isReactActEnvironment: boolean | undefined): void;
declare function getIsReactActEnvironment(): boolean | undefined;
declare const act: ReactAct;
export default act;
export { setIsReactActEnvironment as setReactActEnvironment, getIsReactActEnvironment };
