const workoutTemplateQueryKeys = {
  all: ['workout-templates'] as const,
  lists: () => [...workoutTemplateQueryKeys.all, 'lists'] as const,
  detail: (id: string) =>
    [...workoutTemplateQueryKeys.all, 'detail', id] as const,
};

export default workoutTemplateQueryKeys;
