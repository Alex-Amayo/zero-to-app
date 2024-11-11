import { DefaultNavigatorOptions, ParamListBase, TabNavigationState, TabRouterOptions } from '@react-navigation/native';
import type { MaterialTopTabNavigationConfig, MaterialTopTabNavigationEventMap, MaterialTopTabNavigationOptions } from '../types';
type Props = DefaultNavigatorOptions<ParamListBase, TabNavigationState<ParamListBase>, MaterialTopTabNavigationOptions, MaterialTopTabNavigationEventMap> & TabRouterOptions & MaterialTopTabNavigationConfig;
declare function MaterialTopTabNavigator({ id, initialRouteName, backBehavior, children, screenListeners, screenOptions, ...restWithDeprecated }: Props): JSX.Element;
declare const _default: <ParamList extends ParamListBase>() => import("@react-navigation/native").TypedNavigator<ParamList, TabNavigationState<ParamListBase>, MaterialTopTabNavigationOptions, MaterialTopTabNavigationEventMap, typeof MaterialTopTabNavigator>;
export default _default;
//# sourceMappingURL=createMaterialTopTabNavigator.d.ts.map