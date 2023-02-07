import React, { useState, useReducer, useRef, HtmlHTMLAttributes } from "react";
import "./App.css";
import TodoItem from "./components/toDoITem/TodoItem";

interface TaskInterface {
  task: string;
  isDone: boolean;
}

interface actionType {
  type: string;
  task: string;
}

const TASKS: TaskInterface[] = [
  {
    task:"TASK 1111111111111111111111111111111111111111",
    isDone:false
  }
];

type state = typeof TASKS;

function reducer(state: state, action: actionType) {
  let copy = [...state];
  switch (action.type) {
    case "CHANGE_STATUS":
      copy.map((task) => {
        if (task.task === action.task) {
          task.isDone = !task.isDone;
        }
      });

      return copy;
    case "ADD_TASK":
      let taskList: string[] = [];
      copy.map((task) => {
        taskList.push(task.task);
      });
      if (!taskList.includes(action.task)) {
        action.task && copy.push({ task: action.task, isDone: false });
      }

      return copy;
    case "DELETE_TASK":
      copy = copy.filter((task) => task.task !== action.task);
      return copy;
    default:
      throw new Error();
  }
}

function App() {
  const [value, setValue] = useState("");
  const [showTasks, setShowTasks] = useState("All");
  const inputRef = useRef<HTMLInputElement>(null);
  function filter(task: TaskInterface) {
    if (showTasks === "Completed") {
      if (task.isDone) {
        return (
          <TodoItem
            TASKS={TASKS}
            dispatch={dispatch}
            task={task.task}
            isDone={task.isDone}
          />
        );
      } else {
        return <h4>No completed tasks</h4>
      }
    } else if (showTasks === "Incomplete") {
      if (!task.isDone) {
        return (
          <TodoItem
            TASKS={TASKS}
            dispatch={dispatch}
            task={task.task}
            isDone={task.isDone}
          />
        );
      } else {
        return <h4>No incomplete tasks</h4>
      }
    }
  }
  const [state, dispatch] = useReducer(reducer, TASKS);

  // console.log(state)
  return (
    <div className="App">
      <header className="header">TODO LIST</header>
      <div className="divDef">
        <select
          value={showTasks}
          onChange={(event) => {
            setShowTasks(event.target.value);
          }}
        >
          <option>All</option>
          <option>Completed</option>
          <option>Incomplete</option>
        </select>
      </div>
      <div className="taskContainer">
        {state.length != 0 ? (
          state.map((task) => {
            if (showTasks !== "All") {
              return filter(task);
            }

            return (
              <TodoItem
                TASKS={TASKS}
                dispatch={dispatch}
                task={task.task}
                isDone={task.isDone}
              />
            );
          })
        ) : (
          <h4>No tasks</h4>
        )}
      </div>
      <div className="inputContainer">
        <input
          className="input"
          ref={inputRef}
          value={value}
          onChange={(event) => setValue(event.target.value)}
        ></input>
        <button
          className="addBtn"
          onClick={() => {
            inputRef.current && dispatch({ task: value, type: "ADD_TASK" });
            setValue("");
          }}
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default App;
