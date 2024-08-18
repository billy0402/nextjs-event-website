import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Textarea,
} from '@chakra-ui/react';

import type { FieldProps } from '@/components/Field';

const TextareaField = ({ config, register, errors }: FieldProps) => {
  return (
    <FormControl isInvalid={!!errors?.[config.name]}>
      <FormLabel>{config.label}</FormLabel>
      <Textarea
        {...register(config.name, {
          required: config.required && `${config.label}為必填欄位`,
        })}
      />
      {errors.title && (
        <FormErrorMessage>
          {errors[config.name]?.message as string}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default TextareaField;
