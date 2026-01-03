import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { TextLink } from '../../../ui/text/TextLink';
import { ThemeContext } from '../../../theme';
import { useRouter } from 'expo-router';
import { useBrand } from '../../../brand';
import { useDimensions } from '../../../hooks';
import { StyledText } from '../../../ui/text/StyledText';
import { Platform } from 'react-native';
import MinimalFooter from './MinimalFooter';

const Footer = () => {
  const theme = useContext(ThemeContext); // Access theme context
  const router = useRouter();
  const dimensions = useDimensions();
  const brand = useBrand();

  // On web small, return minimal footer instead of full footer
  if (Platform.OS === 'web' && dimensions.breakpoint === 'small') {
    return <MinimalFooter />;
  }

  return (
    <View
      style={[
        styles.contentContainer,
        {
          backgroundColor: theme.values.appbarBackgroundColor,
          borderColor: theme.values.borderColor,
          borderTopWidth:  theme.values.isDark ? 0 : 1,
          flexDirection: dimensions.breakpoint !== 'small' ? 'row' : 'column',
        },
      ]}>
      {brand.footerLinks.links.length > 0 && (
        <View style={styles.linkContainer}>
          {brand.footerLinks.links.map((link, index) => (
            <TextLink
              key={index}
              onPress={() => router.push(link.route)}
              text={link.text}
              color={theme.values.isDark ? '#fff' : '#000000'}
              align={'left'}
            />
          ))}
        </View>
      )}
      <View
        style={[
          styles.brandText,
          {
            paddingVertical: dimensions.breakpoint === 'medium' ? 10 : 0,
          },
        ]}>
        <StyledText fontSize="sm" align={dimensions.breakpoint === 'medium' ? 'left' : 'right'} muted>
          © 2025 {brand.name}
        </StyledText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: '5%',
    gap: 10,
    paddingVertical: 40,
  },
  linkContainer: {
    flexDirection: 'column',
    gap: 10,
  },
  link: {
    fontSize: 14,
    marginVertical: 5,
  },
  brandText: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
});

export default Footer;

