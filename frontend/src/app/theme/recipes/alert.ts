import { defineSlotRecipe } from '@chakra-ui/react';

const alertRecipe = defineSlotRecipe({
  slots: ['root', 'title', 'description', 'indicator'],

  base: {
    title: {
      fontWeight: 'semibold',
    },
  },
});

export default alertRecipe;
