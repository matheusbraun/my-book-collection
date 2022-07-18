import {
  Box,
  FormControl,
  FormLabel,
  forwardRef,
  Select as ChakraSelect,
  Text,
} from '@chakra-ui/react';
import type { SelectProps as ChakraSelectProps } from '@chakra-ui/react';
import { capitalizeFirstLetter } from '../../utils/stringUtils';

type SelectProps = {
  name: string;
  label?: string;
  options: Array<{ value: string; text: string }>;
} & ChakraSelectProps;

export const Select = forwardRef(
  ({ name, label, options, ...rest }: SelectProps, ref) => (
    <FormControl>
      {Boolean(label) && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <ChakraSelect
        name={name}
        id={name}
        focusBorderColor="pink.500"
        bgColor="gray.900"
        variant="filled"
        _hover={{
          bgColor: 'gray.900',
        }}
        size="lg"
        ref={ref}
        {...rest}
      >
        {options.map(option => (
          <Box
            as="option"
            bg="gray.900 !important"
            key={option.value}
            value={option.value}
          >
            {capitalizeFirstLetter(option.text.toLowerCase())}
          </Box>
        ))}
      </ChakraSelect>
    </FormControl>
  )
);
