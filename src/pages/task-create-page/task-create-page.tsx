import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FormData } from "../../app/App";

interface CreatePageProps {
  onSubmit: (data: FormData) => void;
}

export const CreatePage = ({ onSubmit }: CreatePageProps) => {
  const [title, setTitle] = useState("");
  const [descr, setDescr] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const handleSubmit = () => {
    if (title && descr) {
      //console.log(title, descr);
      onSubmit({ title, descr, date });

      // for cleaning inputs after creating task
      setTitle("");
      setDescr("");
      setDate("");

      // send client to main page
      navigate("/");
    } else {
      if (!title && !descr) {
        alert("please fill the inputs to create your task");
      } else if (!title) {
        alert("please type title for your task");
      } else if (!descr) {
        alert("please type description for your task");
      }
    }
  };

  return (
    <div className="m-6">
      <h1 className="text-4xl">Create new task: </h1>
      <form method="post" className="input-box mt-5 flex flex-col">
        <div className="row-box w-full">
          <input
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            name="title"
            placeholder="Title"
            type="text"
            className="input mb-4 h-10 w-full"
          />
          <div className="date-box">
            <label htmlFor="date">Date: </label>
            <input
              onChange={(e) => setDate(e.target.value)}
              value={date}
              name="date"
              type="date"
              className="input mb-4 h-10"
            />
          </div>
        </div>
        <textarea
          onChange={(e) => setDescr(e.target.value)}
          value={descr}
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
          onClick={handleSubmit}
          className="nav-button w-full md:w-1/5"
        >
          add task
        </button>
      </div>
    </div>
  );
};
