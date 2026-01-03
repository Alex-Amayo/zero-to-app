import { TouchableOpacity, View, StyleSheet } from "react-native";
import Feather from "@expo/vector-icons/Feather";
import { router } from "expo-router";
import Animated, {
	useAnimatedStyle,
	interpolate,
	Extrapolation,
	type SharedValue,
} from "react-native-reanimated";
import { useScrollContext } from "../../../context/scroll-context";
import { BlurView } from "expo-blur";
import { isLiquidGlassAvailable } from "expo-glass-effect";
import { useCallback, useContext } from "react";
import React from "react";
import { ThemeContext } from "../../../theme";

interface AnimatedBackButtonProps {
	shouldUseScrollAnimation: boolean;
	scrollY: SharedValue<number> | null;
}

interface AnimatedHeaderBackgroundProps {
	shouldUseScrollAnimation: boolean;
	scrollY: SharedValue<number> | null;
}

// Wrap the component with React.memo for performance
const AnimatedBackButton = React.memo<AnimatedBackButtonProps>(
	({ shouldUseScrollAnimation, scrollY }) => {
		const theme = useContext(ThemeContext);
		
		const backButtonAnimatedStyle = useAnimatedStyle(() => {
			const opacity =
				shouldUseScrollAnimation && scrollY
					? interpolate(scrollY.value, [0, 50], [1, 0], Extrapolation.CLAMP)
					: 1;

			return { opacity };
		}, [scrollY, shouldUseScrollAnimation]);

		const handlePress = () => {
			router.back();
		};

		return (
			<Animated.View style={backButtonAnimatedStyle}>
				<TouchableOpacity
					accessibilityRole="button"
					accessibilityLabel="Go back"
					onPress={handlePress}
					style={[
						styles.backButtonContainer,
						{
							backgroundColor:
								theme.values.cardBackgroundColor ??
								theme.values.backgroundColor,
						},
					]}
				>
					<Feather
						name="arrow-left"
						size={24}
						color={theme.values.iconButtonIconColor}
						style={styles.backIcon}
					/>
				</TouchableOpacity>
			</Animated.View>
		);
	},
);

const AnimatedHeaderBackground = React.memo<AnimatedHeaderBackgroundProps>(
	({ shouldUseScrollAnimation, scrollY }) => {
		const theme = useContext(ThemeContext);
		
		const headerAnimatedStyle = useAnimatedStyle(() => {
			const opacity =
				shouldUseScrollAnimation && scrollY
					? interpolate(scrollY.value, [0, 50], [0, 1], Extrapolation.CLAMP)
					: 0;

			return {
				position: "absolute",
				top: 0,
				left: 0,
				right: 0,
				bottom: 0,
				opacity: opacity,
			};
		}, [scrollY, shouldUseScrollAnimation]);

		return (
			<Animated.View style={headerAnimatedStyle}>
				<View
					style={[
						styles.backgroundOverlay,
						{ backgroundColor: theme.values.backgroundColor }
					]}
				/>
				<BlurView
					intensity={20}
					tint="light"
					style={styles.blurOverlay}
				/>
			</Animated.View>
		);
	},
);

export const useAnimatedHeader = () => {
	// --- Call hooks at the top level ---
	const shouldUseScrollAnimation = !isLiquidGlassAvailable();
	const scrollY = shouldUseScrollAnimation ? useScrollContext() : null;

	const headerBackground = useCallback(
		() => (
			<AnimatedHeaderBackground
				shouldUseScrollAnimation={shouldUseScrollAnimation}
				scrollY={scrollY}
			/>
		),
		[shouldUseScrollAnimation, scrollY],
	);

	const headerLeft = useCallback(
		() => (
			<AnimatedBackButton
				shouldUseScrollAnimation={shouldUseScrollAnimation}
				scrollY={scrollY}
			/>
		),
		[shouldUseScrollAnimation, scrollY],
	);

	return {
		headerBackground,
		headerLeft,
	};
};

// Export individual components for flexibility  
export { AnimatedBackButton, AnimatedHeaderBackground };

// Backward compatibility component that actually renders as a floating header
export interface ScreenHeaderProps {
	title?: string;
	isTransparent?: boolean;
	backgroundColor?: string;
	tintColor?: string;
	name?: string;
	useScrollAnimation?: boolean;
	showBackButton?: boolean;
	headerHeight?: number;
}

export const ScreenHeader: React.FC<ScreenHeaderProps> = ({
	useScrollAnimation = false,
	showBackButton = true,
}) => {
	const { headerBackground, headerLeft } = useAnimatedHeader();
	
	if (!showBackButton) {
		return null;
	}
	
	return (
		<View style={styles.floatingHeader}>
			{useScrollAnimation && headerBackground()}
			<View style={styles.headerContent}>
				{headerLeft()}
			</View>
		</View>
	);
};

// Default export
export default useAnimatedHeader;

const styles = StyleSheet.create({
	backButtonContainer: {
		flexDirection: "row",
		alignItems: "center",
		borderRadius: 16,
		position: "relative",
		width: 32,
		height: 32,
		justifyContent: "center",
	},
	backButtonBackground: {
		position: "absolute",
		left: -1,
		top: 0,
		bottom: 0,
		right: 1,
		borderRadius: 16,
	},
	backIcon: {
		left: -2,
	},
	backgroundOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		opacity: 0.8,
	},
	blurOverlay: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	floatingHeader: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		height: 100,
		zIndex: 1000,
		justifyContent: "flex-end",
		paddingBottom: 10,
	},
	headerContent: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		height: 44,
	},
});
