import React, { useMemo } from 'react';
import { View, StyleSheet } from 'react-native';
import { ThemeContext } from '../../theme';
import { useBrand } from '../../brand';
import { StyledText } from '../../ui/text/StyledText';

interface MessageProps {
  text: string;
  isSent: boolean;
}

const Message = ({ text, isSent }: MessageProps): React.JSX.Element => {
  const theme = React.useContext(ThemeContext);
  const brand = useBrand();
  
  const styles = useMemo(() => StyleSheet.create({
    messageBubble: {
      padding: 12,
      borderRadius: brand.borderRadius,
      marginVertical: 4,
      maxWidth: '80%',
      flexDirection: 'row',
      alignItems: 'flex-end',
    },
    sentMessage: {
      alignSelf: 'flex-end',
      backgroundColor: brand.colors.primary,
      marginLeft: '20%',
    },
    receivedMessage: {
      alignSelf: 'flex-start',
      backgroundColor: '#e0e0e0',
      marginRight: '20%',
    },
  }), [brand]);

  return (
    <View
      style={[
        styles.messageBubble,
        isSent
          ? styles.sentMessage
          : [
              styles.receivedMessage,
              {
                backgroundColor: theme.values.cardBackgroundColor,
                ...(!theme.values.isDark && !isSent && {
                  borderWidth: 1,
                  borderColor: theme.values.borderColor,
                }),
              },
            ],
      ]}>
      <StyledText color={isSent ? 'white' : theme.values.color} fontSize={16}>
        {text}
      </StyledText>
    </View>
  );
};

export default Message;
