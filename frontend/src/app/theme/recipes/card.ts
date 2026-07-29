import { defineSlotRecipe } from '@chakra-ui/react';

const cardRecipe = defineSlotRecipe({
  slots: ['root', 'header', 'body', 'footer', 'title', 'description'],

  defaultVariants: {
    variant: 'elevated',
  },
  base: {
    root: {
      w: 'lg',
    },
    title: {
      fontWeight: 'semibold',
    },
  },
});

export default cardRecipe;
