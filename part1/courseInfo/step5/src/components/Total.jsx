
export const Total = (props) => {

return (
<p>
  Total no. of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}
</p>
)
}