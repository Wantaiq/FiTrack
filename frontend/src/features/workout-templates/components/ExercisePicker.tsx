import type { Exercise } from '@/features/exercises/schemas/exercise.schema';
import { Combobox, createListCollection } from '@chakra-ui/react';

type Props = {
  exercises: Exercise[];
  inputValue: string;
  onSelect: (value: string) => void;
  onInputChange: (value: string) => void;
};

function ExercisePicker({
  exercises,
  inputValue,
  onInputChange,
  onSelect,
}: Props) {
  const collection = createListCollection({
    items: exercises.map((exercise) => ({
      label: exercise.name,
      value: exercise.id,
    })),
  });

  return (
    <Combobox.Root
      collection={collection}
      onValueChange={(details) => onSelect(details.value[0])}
      inputValue={inputValue}
      onInputValueChange={(details) => {
        onInputChange(details.inputValue);
      }}
    >
      <Combobox.Control>
        <Combobox.Input placeholder="Search exercises..." />
      </Combobox.Control>

      <Combobox.Positioner>
        <Combobox.Content>
          {collection.items.map((item) => {
            return (
              <Combobox.Item key={item.value} item={item}>
                {item.label}
              </Combobox.Item>
            );
          })}
        </Combobox.Content>
      </Combobox.Positioner>
    </Combobox.Root>
  );
}

export default ExercisePicker;
