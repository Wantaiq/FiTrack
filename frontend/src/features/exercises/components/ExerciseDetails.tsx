import type { ExerciseFull } from '../schemas/exercise.schema';

type Props = {
  exercise: ExerciseFull;
};

function ExerciseDetails({ exercise }: Props) {
  return (
    <>
      <h1>{exercise.name}</h1>
      <p>{exercise.description}</p>
      <p>{exercise.difficulty}</p>
      <p>{exercise.mechanic}</p>
      <p>{exercise.type}</p>
      <ul>
        {exercise.instructions.map((instruction) => (
          <li key={instruction.id}>
            <p>{instruction.title}</p>
            <p>{instruction.text}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export default ExerciseDetails;
