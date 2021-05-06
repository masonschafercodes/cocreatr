import { useState } from "react";

export default function CreateTask({ wid, user }) {
  const [showModal, setShowModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [taskDesc, setTaskDesc] = useState("");

  async function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();

    const data = {
      name: taskName,
      taskDesc: taskDesc,
      wid: wid,
      email: user.email,
    };

    if (data) {
      try {
        const res = await fetch("/api/create-new-task", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (res.status === 200 && window !== undefined) {
          window.location.reload();
        } else {
          throw new Error(await res.text());
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div>
      <button
        onClick={() => setShowModal(true)}
        className="opacity-70 px-3 py-2 bg-green-400 hover:bg-green-500 my-3 font-face text-white rounded shadow-md"
      >
        Add New Task
        <span className="inline-flex self-center pl-2">
          <svg
            width={15}
            height={15}
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M8 2.75a.5.5 0 00-1 0V7H2.75a.5.5 0 000 1H7v4.25a.5.5 0 001 0V8h4.25a.5.5 0 000-1H8V2.75z"
              fill="currentColor"
              fillRule="evenodd"
              clipRule="evenodd"
            />
          </svg>
        </span>
      </button>
      <div
        className={`${
          showModal ? "" : "hidden"
        } flex items-center justify-center py-8 px-4 absolute z-50`}
      >
        <div className="md:w-80 rounded shadow-lg p-6  dark:bg-gray-800 bg-white">
          <form>
            <label className="flex flex-col">
              <span className="text-md font-face my-2">Task Name</span>
              <input
                className="bg-gray-200 rounded p-3"
                type="text"
                name="taskName"
                placeholder="Add API Docs..."
                max={32}
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                required
              />
            </label>
            <label className="flex flex-col">
              <span className="text-md font-face mt-5 mb-2">
                Task Description
              </span>
              <textarea
                className="bg-gray-200 rounded p-3 resize-none"
                name="taskDesc"
                placeholder="Your Task Description Goes Here..."
                rows={10}
                maxLength={255}
                value={taskDesc}
                onChange={(e) => setTaskDesc(e.target.value)}
                required
              />
            </label>
          </form>
          <div className="sm:flex items-center justify-between pt-6">
            <button
              className="py-3.5 w-full  dark:text-gray-100 text-gray-600 leading-3 focus:outline-none hover:opacity-90 text-sm font-semibold border-gray-600 rounded border"
              onClick={() => setShowModal(false)}
            >
              Dismiss
            </button>
            <button
              className="py-3.5 w-full sm:mt-0 mt-2 sm:ml-2 leading-3 text-white focus:outline-none hover:opacity-90 text-sm font-semibold border rounded border-green-600 bg-green-500"
              onClick={(e) => handleSubmit(e)}
            >
              Add Task
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
