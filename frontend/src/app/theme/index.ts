import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import cardRecipe from './recipes/card';
import alertRecipe from './recipes/alert';
import fieldRecipe from './recipes/field';
import inputRecipe from './recipes/input';
import textareaRecipe from './recipes/textarea';
import nativeSelectRecipe from './recipes/nativeSelect';

const theme = createSystem(
  defaultConfig,
  defineConfig({
    theme: {
      recipes: {
        input: inputRecipe,
        textarea: textareaRecipe,
      },
      slotRecipes: {
        card: cardRecipe,
        alert: alertRecipe,
        field: fieldRecipe,
        nativeSelect: nativeSelectRecipe,
      },
    },
  }),
);

export default theme;
