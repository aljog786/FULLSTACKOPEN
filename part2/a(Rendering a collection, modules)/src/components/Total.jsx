export const Total = ({parts}) => {
  return (
    <h3>
    total of {parts.reduce((sum,part) => sum + part.exercises,0 )} exercises
    </h3>
  )
}
