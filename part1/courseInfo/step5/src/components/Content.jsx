 
export const Content = (props) => {

  return(
    <div>
    <p>
      {props.course.parts[0].name} {props.course.parts[0].exercises}
    </p>
    <p>
      {props.course.parts[1].name} {props.course.parts[1].exercises}
    </p>
    <p>
      {props.course.parts[2].name} {props.course.parts[2].exercises}
    </p>
    </div>
  )
}
