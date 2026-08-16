import { defineSlotRecipe } from '@chakra-ui/react';

const comboboxRecipe = defineSlotRecipe({
  slots: ['root', 'control', 'input', 'positioner', 'content'],

  defaultVariants: {
    variant: 'subtle',
    size: 'lg',
  },
});

export default comboboxRecipe;
