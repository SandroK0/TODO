import "./TodoItem.css";

const deleteIcon = require("../../assets/icons/ic_sharp-delete.png");
const editIcon = require("../../assets/icons/material-symbols_edit-rounded.png")

function TodoItem(props: any) {
  return (
    <div className="TodoItem">
      <div className="taskInfo">
        <input
          className="checkBox"
          type="checkbox"
          checked={props.isDone}
          onChange={() =>
            props.dispatch({ task: props.task, type: "CHANGE_STATUS" })
          }
        ></input>
        <p className="taskp">{props.task}</p>
      </div>

      <div className="icons">
        <img
          className="taskIcon"
          src={deleteIcon}
          onClick={() =>
            props.dispatch({ type: "DELETE_TASK", task: props.task })
          }
        />

        {/* <img 
        className="taskIcon"
        src={editIcon}/> */}
      </div>
    </div>
  );
}

export default TodoItem;
