import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TaskProps } from "../../components/tasks-list/tasks-list";

interface EditTaskPageProps {
  onSubmit: (data: TaskProps, navigate: any) => void;
}

export const EdidTaskPage = ({ onSubmit }: EditTaskPageProps) => {
  const { taskId } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState<TaskProps>({
    id: null,
    date: "",
    descr: "",
    title: "",
    checked: false,
  });

  useEffect(() => {
    if (taskId) {
      const store = localStorage.getItem("todos");
      if (store) {
        const todos = JSON.parse(store).filter(
          (item: TaskProps) => `${item.id}` == taskId
        )[0];

        setTask(todos);
      }
    }
  }, [taskId]);

  return (
    <div className="m-6">
      <h1 className="text-4xl">
        Editing task: {task.id !== null ? task.id + 1 : ""}{" "}
      </h1>
      <form method="post" className="input-box mt-5 flex flex-col">
        <div className="row-box w-full">
          <input
            onChange={(e) =>
              setTask({ ...task, id: Number(taskId), title: e.target.value })
            }
            //value={task?.title}
            defaultValue={task ? task.title : ""}
            name="title"
            placeholder="Title"
            type="text"
            className="input mb-4 h-10 md:w-full"
          />
          <div className="date-box">
            <label htmlFor="date">Date: </label>
            <input
              onChange={(e) =>
                setTask({
                  ...task,
                  id: Number(taskId),
                  date: e.target.value,
                })
              }
              defaultValue={task?.date}
              name="date"
              type="date"
              className="input mb-4 h-10"
            />
          </div>
        </div>
        <textarea
          onChange={(e) =>
            setTask({ ...task, id: Number(taskId), descr: e.target.value })
          }
          //value={task?.descr}
          defaultValue={task ? task.descr : ""}
          placeholder="type some description of task"
          className="input resize-none"
          name="descr"
          rows={9}
          cols={50}
        />
      </form>

      <div className="button-box flex justify-center md:justify-end place-items-center mt-4 md:mr-5">
        <button
          className="nav-button w-full md:w-1/5"
          onClick={() => navigate(-1)}
        >
          cancel
        </button>
        <button
          type="submit"
          onClick={() => onSubmit(task, navigate)}
          className="nav-button w-full md:w-1/5"
        >
          save
        </button>
      </div>
    </div>
  );
};
