import { createSystem, defaultConfig, defineConfig } from '@chakra-ui/react';
import cardRecipe from './recipes/card';
import alertRecipe from './recipes/alert';
import fieldRecipe from './recipes/field';
import inputRecipe from './recipes/input';
import textareaRecipe from './recipes/textarea';
import nativeSelectRecipe from './recipes/nativeSelect';
import comboboxRecipe from './recipes/combobox';
import numberInput from './recipes/numberInput';

const theme = createSystem(
  defaultConfig,
  defineConfig({
    theme: {
      recipes: {
        input: inputRecipe,
        textarea: textareaRecipe,
      },
      slotRecipes: {
        numberInput: numberInput,
        card: cardRecipe,
        alert: alertRecipe,
        field: fieldRecipe,
        nativeSelect: nativeSelectRecipe,
        combobox: comboboxRecipe,
      },
    },
  }),
);

export default theme;
