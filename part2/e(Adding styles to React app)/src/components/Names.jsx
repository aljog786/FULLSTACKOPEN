export const Names = ({person,deletePerson}) => {
  return (
    <div>
      {person.name} {person.number} <button onClick={() => deletePerson(person.id,person.name)}>delete</button>
    </div>
  );
}
