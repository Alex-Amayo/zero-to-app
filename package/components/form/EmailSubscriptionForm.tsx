import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { ThemeContext } from '../../theme';
import { StyledText, Button } from '../ui';
import { Card } from '../Card';
import { useBrand } from '../../brand';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface EmailSubscriptionFormProps {
  title?: string;
  placeholder?: string;
  buttonText?: string;
  successView?: React.ReactNode;
  onSubmit: (email: string) => Promise<{ success: boolean; error?: string }>;
}

const emailSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type EmailForm = z.infer<typeof emailSchema>;

const EmailSubscriptionForm: React.FC<EmailSubscriptionFormProps> = ({
  title = 'Get notified of deals on Night Club Guest Lists, Table Reservations and Tickets.',
  placeholder = 'Enter your email',
  buttonText = 'Notify Me',
  successView,
  onSubmit,
}) => {
  const theme = React.useContext(ThemeContext);
  const brand = useBrand();
  const [success, setSuccess] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
  });

  const submitEmail = async (data: EmailForm) => {
    setIsLoading(true);
    setError(null);
    const result = await onSubmit(data.email);
    setIsLoading(false);
    if (result.success) {
      setSuccess(true);
      reset();
    } else {
      setError(result.error || 'Something went wrong');
    }
  };

  return (
    <Card>
      <View style={styles.container}>
        {success ? (
          successView ? (
            successView
          ) : (
            <View style={{ flexDirection: 'column', alignItems: 'flex-start', gap: 8 }}>
              <StyledText fontSize={'md'}>Thank you!</StyledText>
              <StyledText fontSize={'md'} muted>
                Your subscription has been confirmed and added to our list.
              </StyledText>
            </View>
          )
        ) : (
          <>
            <StyledText fontSize={'md'}>{title}</StyledText>
            <Controller
              control={control}
              name="email"
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder={placeholder}
                  placeholderTextColor={theme.values.inactiveIconColor}
                  style={{
                    width: '100%',
                    padding: 15,
                    borderRadius: brand.borderRadius,
                    borderWidth: 1,
                    borderColor: theme.values.borderColor,
                    backgroundColor: theme.values.inputBackgroundColor,
                    color: theme.values.color,
                    fontSize: 16,
                  }}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!isLoading}
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.email && (
              <StyledText fontSize="sm" color="red">
                {errors.email.message}
              </StyledText>
            )}
            {error && !errors.email && (
              <StyledText fontSize="sm" color="red">
                {error}
              </StyledText>
            )}
            <Button
              title={isLoading ? 'Submitting...' : buttonText}
              icon={{
                library: 'Feather',
                name: 'bell',
                size: 20,
                color: '#FFFFFF',
              }}
              onPress={handleSubmit(submitEmail)}
            />
          </>
        )}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: 20,
  },
});

export default EmailSubscriptionForm;

