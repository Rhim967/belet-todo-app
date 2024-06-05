import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { TaskProps, TasksList } from "../components/tasks-list/tasks-list";

import { CreatePage } from "../pages/task-create-page/task-create-page";
import { useEffect, useState } from "react";
import { EdidTaskPage } from "../pages/task-edit-page/task-edit-page";

export interface FormData {
  title: string | "";
  descr: string | "";
  date: string | "";
}

function App() {
  const [todos, setAllTodos] = useState<Array<TaskProps> | []>(
    JSON.parse(localStorage.getItem("todos"))
  );

  // function for creating new task
  const handleCreateTask = (data: FormData) => {
    if (todos == null) {
      setAllTodos([]);
      //console.log("no any tasks", Number(todos));
    }
    let id = todos[todos?.length - 1]?.id + 1;

    const newTask = {
      id: id ? id : 0,
      date:
        data.date == "" ? new Date().toISOString().split("T")[0] : data.date,
      title: data.title,
      descr: data.descr,
      checked: false,
    };

    setAllTodos((oldTodos) => [...oldTodos, newTask]);
    alert("new task created");
  };

  // func for updating task
  const handleUpdateTask = (data: TaskProps, navigate: any) => {
    //console.log(data);
    if (data.title && data.descr) {
      setAllTodos(
        todos.map((item) => {
          if (
            item.id == data.id &&
            item.title == data.title &&
            item.descr == data.descr
          ) {
            item.title = data.title;
            item.descr = data.descr;
            item.date = data.date;
          }
          return item;
        })
      );
      navigate("/");

      alert("task updated");
    }
    if (!data.title) {
      alert("please type title for task");
    }
    if (!data.descr) {
      alert("please type description for task");
    }
  };

  // load todos firs time in start app
  useEffect(() => {
    // updating localstorage whenewer todos changed
    const data = JSON.parse(`${localStorage.getItem("todos")}`);
    todos ? setAllTodos(data) : null; //need to chage data on todos array
  }, []);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<TasksList todos={todos} setAllTodos={setAllTodos} />}
        />
        <Route
          path="create"
          element={<CreatePage onSubmit={handleCreateTask} />}
        />
        <Route
          path="task/:taskId"
          element={<EdidTaskPage onSubmit={handleUpdateTask} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
