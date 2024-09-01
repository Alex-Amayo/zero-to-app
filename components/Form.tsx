import React, { ReactNode } from 'react';
import { useForm, FormProvider, UseFormProps, FieldValues } from 'react-hook-form';

type FormProps<T extends FieldValues> = UseFormProps<T> & {
  children: ReactNode;
};

const Form = <T extends FieldValues>({ children, ...formProps }: FormProps<T>) => {
  const methods = useForm<T>(formProps);

  return <FormProvider {...methods}>{children}</FormProvider>;
};

export default Form;
