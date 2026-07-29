import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import cardRecipe from './recipes/card';
import alertRecipe from './recipes/alert';

const theme = createSystem(
  defaultConfig,
  defineConfig({
    theme: {
      slotRecipes: {
        card: cardRecipe,
        alert: alertRecipe,
      },
    },
  }),
);

export default theme;
