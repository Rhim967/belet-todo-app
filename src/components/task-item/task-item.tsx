//import { useEffect, useState } from "react";
import { Trash } from "../../assets/icons/icons";
import { Checkbox } from "../checkbox/checkbox";
import { TaskProps } from "../tasks-list/tasks-list";
import { NavLink } from "react-router-dom";

export interface TaskItemProps extends TaskProps {
  handleDeleteTask: (id: number | null) => void;
  ToggleCheckStatus: (id: number | null) => void;
}

export const TaskItem = ({
  id,
  title,
  descr,
  checked,
  date,
  handleDeleteTask,
  ToggleCheckStatus,
}: TaskItemProps) => {
  return (
    <li className="task-item" key={id}>
      <div className="task-item__info bg-lime-500 flex justify-between place-items-center  pb-2">
        <h3 className="task-title">{title}</h3>
        <div className="icon-box mx-4 my-2 flex justify-center place-items-center">
          {/* <input type="checkbox" className="mr-2" /> */}
          <Checkbox
            className="hover:cursor-pointer"
            type="checkbox"
            status={checked}
            handleStatus={() => ToggleCheckStatus(id)}
          />
          <div onClick={() => handleDeleteTask(id)}>
            <Trash
              name="Trash"
              className="fill-red-500 w-4 h-15 hover:cursor-pointer"
            />
          </div>
        </div>
      </div>

      <div className="body bg-white">
        <NavLink to={`task/${id}`}>
          <div className="task-date text-end mr-2 mb-2 min-h-6">
            {new Date(date ? date : "").toLocaleDateString("ru-RU")}
          </div>
          <p className="task-decr">{descr}</p>
        </NavLink>
      </div>
    </li>
  );
};
