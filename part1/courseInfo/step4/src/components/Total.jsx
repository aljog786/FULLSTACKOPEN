
export const Total = (props) => {

return (
<p>
  Total no. of exercises {props.part[0].exercises + props.part[1].exercises + props.part[2].exercises}
</p>
)
}