import { InfoBlock, filterTasks } from "../../components/info-block/info-block";
import { TaskItem } from "../task-item/task-item";

import { useEffect, useState } from "react";

import { Link } from "react-router-dom";

export interface TaskProps {
  id: number | null;
  date: string | undefined;
  title: string | undefined;
  descr: string | undefined;
  checked: boolean | undefined;
}

interface TaskListProps {
  todos: TaskProps[];
  setAllTodos: (todos: TaskProps[]) => void;
}

export const TasksList = ({ todos, setAllTodos }: TaskListProps) => {
  // list of all tasks
  //const [todos, setAllTodos] = useState<Array<TaskProps> | []>([]);
  const [checked, setChecked] = useState<null | boolean>(null);

  // filtered data for displaying
  const visibleData = filterTasks(todos, checked);

  // functon for handeling status of task in checkbox
  const ToggleCheckStatus = (id: number | null) => {
    // prepearing array with updated tasks
    const newTasks = todos.map((item) => {
      if (item.id == id) {
        item.checked = !item.checked;
      }
      return item;
    });

    //console.log(newTasks);

    // changing state of tasks
    setAllTodos(newTasks);
  };

  // function for deleting task by id
  const handleDeleteTask = (id: number | null) => {
    const confirmation = confirm(`do you want to delet #${id} task`);

    if (confirmation) {
      setAllTodos(todos.filter((item) => item.id !== id));
      //console.log("deleted", id, "task");
    }
  };

  useEffect(() => {
    // updating localstorage whenewer todos changed
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos, visibleData]);

  // func for rendering every task
  const elements =
    visibleData?.length !== 0 ? (
      visibleData?.map((item: TaskProps) => (
        <TaskItem
          title={item.title}
          key={item.id}
          descr={item.descr}
          checked={item.checked}
          date={item.date}
          id={item.id}
          handleDeleteTask={handleDeleteTask}
          ToggleCheckStatus={ToggleCheckStatus}
        />
      ))
    ) : (
      <h2> no tasks</h2>
    );

  return (
    <>
      <InfoBlock todos={todos} setChecked={setChecked} />
      <ul className="static tasks-list md:grid md:grid-cols-2 lg:grid-cols-3 gap-2 p-3">
        {elements}
      </ul>

      <Link
        to={"create/"}
        className="nav-button text-2xl opacity-75 hover:opacity-100 text-white fixed bottom-5 right-3 w-10 h-10 flex justify-center md:rounded text-center place-items-center md:text-4xl rounded-full"
      >
        +
      </Link>
    </>
  );
};
