import React, { useState, useEffect } from "react";
import "./style.css";

const Todos = () => {
  // useState for todos with an inital state including an array with 3 objects
  const [todos, setTodos] = useState([
    {
      id: 1,
      title: "Get Groceries",
      description: "Tomatoes, Bread, Juice",
    },
    { id: 2, title: "Do Homework", description: "Finish assignment 13" },
    {
      id: 3,
      title: "Code More",
      description: "Create a new React app",
    },
  ]);
  // states to keep track of the editId and edit inputs
  const [editId, setEditId] = useState();
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  const addTodo = (event) => {
    event.preventDefault();
    // Use the spread operator to keep the rest of the todos the same and add the new todo
    // if todos.length is greater than 0, then set the id for the new todo to be one more than the id of the last todo
    // otherwise set the id of the new todo to 1
    setTodos([
      ...todos,
      {
        id: todos.length > 0 ? todos[todos.length - 1].id + 1 : 1,
        title: event.target.title.value,
        description: event.target.description.value,
      },
    ]);
  };

  const removeTodo = (todoId) => {
    // uses filter to remove the todo with the matching id
    setTodos(todos.filter((todo) => todo.id !== todoId));
  };

  const updateTodo = (todoID) => {
    // map through the todos array and only change the todo with the matching id
    setTodos(
      todos.map((todo) =>
        todo.id === todoID
          ? {
              ...todo,
              title: newTitle,
              description: newDescription,
            }
          : todo
      )
    );
    // sets editId to an empty string to end editing the todo
    setEditId("");
  };

  return (
    <>
      {/* Form to add new todos */}
      <div className="todoFormContainer">
        <h2>Add Todo</h2>
        <form className="todoForm" onSubmit={(e) => addTodo(e)}>
          <label>Title:</label>
          <input name="title" />
          <label>Description:</label>
          <input name="description" />
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="todos">
        <h2>Todos</h2>
        {todos.map((todo) =>
          // Ternary to render edit inputs if editId is equal to todo.id
          editId === todo.id ? (
            <div className="todoEdit" key={todo.id}>
              <div>
                Title:{" "}
                <input
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
              </div>
              <div>
                Description:{" "}
                <input
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                />
              </div>
              <button onClick={() => setEditId("")}>Close</button>
              <button onClick={() => updateTodo(todo.id)}>Update</button>
            </div>
          ) : (
            // if editId is not equal to todo.id, then show the todo
            <div className="todo" key={todo.id}>
              <div>Title: {todo.title}</div>
              <div>Description: {todo.description}</div>
              <button onClick={() => removeTodo(todo.id)}>Remove</button>
              <button
                onClick={() => {
                  setEditId(todo.id);
                  setNewTitle(todo.title);
                  setNewDescription(todo.description);
                }}
              >
                Edit
              </button>
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Todos;
