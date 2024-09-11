import { Content } from "./Content";
import { Header } from "./Header";
export const Course = ({course}) => {
  return (
    <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    </div>
  )
}
