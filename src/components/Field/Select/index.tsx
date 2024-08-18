import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Select,
} from '@chakra-ui/react';

import type { FieldProps } from '@/components/Field';

const SelectField = ({ config, register, errors }: FieldProps) => {
  return (
    <FormControl isInvalid={!!errors?.[config.name]}>
      <FormLabel>{config.label}</FormLabel>
      <Select
        {...register(config.name, {
          required: config.required && `${config.label}為必填欄位`,
        })}
        placeholder={`請選擇${config.label}`}
      >
        {config.options?.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Select>
      {errors.title && (
        <FormErrorMessage>
          {errors[config.name]?.message as string}
        </FormErrorMessage>
      )}
    </FormControl>
  );
};

export default SelectField;
