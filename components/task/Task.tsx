import { taskContext } from "../../lib/taskContext";
import { useContext } from "react";

export default function Task({ workspaceTasks: tasks, user, wid }) {
  const { setTasks } = useContext(taskContext);

  function formatTime(time: string): string {
    let ttf = new Date(time);
    return ttf.toLocaleDateString();
  }

  async function updateTask(taskId: number, e: React.SyntheticEvent) {
    e.preventDefault();
    const data = {
      id: taskId,
      wid: wid,
    };
    try {
      const res = await fetch("/api/mark-task-complete", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setTasks(data.tasks);
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col">
      {tasks.length != 0 ? (
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Task Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Task Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Added At
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {tasks
                    ? tasks.map((task) => (
                        <tr key={task.id}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-10 w-10">
                                <img
                                  className="h-10 w-10 rounded-full"
                                  src={task.creator.pictureLink}
                                  alt=""
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {task.name}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {task.creator.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            {task.taskDesc.length > 50 ? (
                              <div className="text-sm text-gray-500">
                                truncated for space...
                              </div>
                            ) : (
                              <div className="text-sm text-gray-900">
                                {task.taskDesc}
                              </div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatTime(task.createdAt)}
                          </td>
                          <td>
                            {user && task.creator.email === user.email ? (
                              <tr className="flex items-center justify-center">
                                {task.isCompleted ? (
                                  <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M3 3h9v9H3V3zM2 3a1 1 0 011-1h9a1 1 0 011 1v9a1 1 0 01-1 1H3a1 1 0 01-1-1V3zm8.35 2.511a.5.5 0 00-.825-.566L6.64 9.15l-1.443-1.74a.5.5 0 00-.77.638l1.866 2.25a.5.5 0 00.797-.037l3.26-4.749z"
                                      fill="#0fb881"
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                ) : (
                                  <svg
                                    width={20}
                                    height={20}
                                    viewBox="0 0 15 15"
                                    className="hover:fill-green cursor-pointer"
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={(e) => updateTask(task.id, e)}
                                  >
                                    <path
                                      d="M12.5 2h-10a.5.5 0 00-.5.5v10a.5.5 0 00.5.5h10a.5.5 0 00.5-.5v-10a.5.5 0 00-.5-.5zm-10-1A1.5 1.5 0 001 2.5v10A1.5 1.5 0 002.5 14h10a1.5 1.5 0 001.5-1.5v-10A1.5 1.5 0 0012.5 1h-10z"
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                )}
                              </tr>
                            ) : null}
                          </td>
                        </tr>
                      ))
                    : null}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <h1 className="text-bold text-gray-400 text-center pt-5">
          Its Looking pretty empty around here... You should add a task!
        </h1>
      )}
    </div>
  );
}
