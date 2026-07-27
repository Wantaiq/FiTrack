import {
  Circle,
  DatePicker,
  parseDate,
  Text,
  VStack,
  type DateValue,
} from '@chakra-ui/react';
import { Controller, useFormContext } from 'react-hook-form';

type Props = {
  sessions: [];
  onSelect: (value: DateValue[]) => void;
};
function WorkoutSessionDatePicker({ sessions, onSelect }: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      control={control}
      name="scheduledAt"
      render={({ field }) => {
        return (
          <DatePicker.Root
            inline
            value={field.value ? [parseDate(field.value)] : []}
            invalid={!!errors.scheduledAt}
            size="sm"
            onValueChange={(e) => {
              field.onChange(e.value[0]?.toString() ?? '');
              onSelect(e.value);
            }}
          >
            <DatePicker.View view="day">
              <DatePicker.Header />
              <DatePicker.Table>
                <DatePicker.TableHead />
                <DatePicker.TableBody>
                  <DatePicker.Context>
                    {(api) =>
                      api.weeks.map((week, weekIndex) => (
                        <DatePicker.TableRow key={weekIndex}>
                          {week.map((date, dayIndex) => {
                            const dateStr = date.toString();
                            const hasEvent = sessions.find((session) => {
                              return session.scheduledAt.toString() === dateStr;
                            });

                            return (
                              <DatePicker.TableCell key={dayIndex} value={date}>
                                <DatePicker.TableCellTrigger asChild>
                                  <VStack
                                    p={2}
                                    borderRadius="md"
                                    position="relative"
                                    cursor="pointer"
                                    transition="all 0.15s"
                                    _hover={{ bg: 'bg.muted' }}
                                    _today={{
                                      border: '2px solid',
                                      borderColor: 'teal.500',
                                      fontWeight: 'bold',
                                    }}
                                    _selected={{
                                      bg: 'teal.500',
                                      color: 'white',
                                      _hover: {
                                        bg: 'teal.600',
                                      },
                                    }}
                                  >
                                    <Text fontSize="sm">{date.day}</Text>

                                    {hasEvent && (
                                      <Circle
                                        size="1.5"
                                        bg="teal.400"
                                        position="absolute"
                                        bottom="1"
                                      />
                                    )}
                                  </VStack>
                                </DatePicker.TableCellTrigger>
                              </DatePicker.TableCell>
                            );
                          })}
                        </DatePicker.TableRow>
                      ))
                    }
                  </DatePicker.Context>
                </DatePicker.TableBody>
              </DatePicker.Table>
            </DatePicker.View>
          </DatePicker.Root>
        );
      }}
    />
  );
}

export default WorkoutSessionDatePicker;
