import { defineSlotRecipe } from '@chakra-ui/react';

const fieldRecipe = defineSlotRecipe({
  slots: ['root', 'label'],

  base: {
    label: {
      fontWeight: 'semibold',
      fontSize: 'md',
    },
  },
});

export default fieldRecipe;
