import { defineSlotRecipe } from '@chakra-ui/react';

const nativeSelect = defineSlotRecipe({
  slots: ['root', 'indicator', 'field'],

  defaultVariants: {
    variant: 'subtle',
    size: 'lg',
  },
});

export default nativeSelect;
