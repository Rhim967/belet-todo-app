import { TaskProps } from "../tasks-list/tasks-list";

export interface InfoBlockProps {
  setChecked: (status: null | boolean) => void;
  todos: TaskProps[];
}

export const filterTasks = (data: TaskProps[], filter: null | boolean) => {
  switch (filter) {
    case null:
      return data;
    case true:
      return data?.filter((data) => data.checked);
    case false:
      return data?.filter((data) => !data.checked);
    // for default value u can return empty array if you need
    default:
      return [];
  }
};

export const InfoBlock = ({ setChecked, todos }: InfoBlockProps) => {
  // toggling for displaing all tasks by filter
  const toggleChecked = (status: null | boolean) => {
    setChecked(status);
  };
  return (
    <div className="info-block md:flex justify-around m-2">
      <div className="info-row" onClick={() => toggleChecked(null)}>
        <h2>Total tasks:</h2>
        <p>{todos?.length}</p>
      </div>
      <div className="info-row" onClick={() => toggleChecked(true)}>
        <h2>Completed tasks:</h2>
        <p>{todos?.filter((item) => item.checked).length}</p>
      </div>
      <div className="info-row" onClick={() => toggleChecked(false)}>
        <h2>Not completed tasks:</h2>
        <p>{todos?.filter((item) => !item.checked).length}</p>
      </div>
    </div>
  );
};

//export default InfoBlock;
