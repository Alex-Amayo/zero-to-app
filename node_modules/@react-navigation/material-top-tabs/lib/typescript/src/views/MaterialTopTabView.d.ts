import { ParamListBase, TabNavigationState } from '@react-navigation/native';
import type { MaterialTopTabDescriptorMap, MaterialTopTabNavigationConfig, MaterialTopTabNavigationHelpers } from '../types';
type Props = MaterialTopTabNavigationConfig & {
    state: TabNavigationState<ParamListBase>;
    navigation: MaterialTopTabNavigationHelpers;
    descriptors: MaterialTopTabDescriptorMap;
};
export default function MaterialTopTabView({ tabBar, state, navigation, descriptors, sceneContainerStyle, ...rest }: Props): JSX.Element;
export {};
//# sourceMappingURL=MaterialTopTabView.d.ts.map