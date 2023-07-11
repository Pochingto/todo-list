import axios from "axios"
import { useEffect, useState } from "react"

const ToDoList = ({notes}) => {
  // console.log("List rendered")
  return <div>
    <ul>
      {notes.map((note, idx) => {
        return <li key={`NoteItem${idx}`}>{note.item}</li>
      })}
    </ul>
  </div>
}

const AddForm = ({todo, SetTodo, addNote}) => {
  // console.log("todo: ", todo)
  return <form onSubmit={addNote}>
    <input value={todo} onChange={(event) => {SetTodo(event.target.value)}}/>
    <button type="submit">submit</button>
  </form>
}

const App = () => {
  const [todo, SetTodo] = useState("")
  // console.log("App rerendered")
  const [notes, SetNotes] = useState([])
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/items`)
      .then((res) => {
        // console.log(res.data)
        SetNotes(res.data)
      })
  }, [])

  const addNote = (event) => {
    event.preventDefault()
    axios
      .post(`http://localhost:3001/api/item`, {
        item: todo,
        stats: "todo",
        important: false
      })
      .then(response => {
        const savedItem = response.data
        console.log(savedItem)
        SetNotes(notes.concat(savedItem))
        SetTodo("")
      })
  }

  return (
    <div>
      hello world!!!!
      <ToDoList notes={notes}/>
      <AddForm todo={todo} SetTodo={SetTodo} addNote={addNote}/>
    </div>
  );
}

export default App;
