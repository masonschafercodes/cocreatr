export default function Task({ workspaceTasks, user }) {
  function formatTime(time) {
    let ttf = new Date(time);
    return ttf.toLocaleDateString();
  }

  async function deleteTask(taskId: number, e: React.SyntheticEvent) {
    e.preventDefault();
    const data = {
      id: taskId,
    };
    try {
      const res = await fetch("/api/delete-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then((res) => {
        return res.json();
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col">
      {workspaceTasks.length != 0 ? (
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
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Delete</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {workspaceTasks
                    ? workspaceTasks.map((task) => (
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
                          {task.creator.email === user.email ? (
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                className="text-red-600 hover:text-red-900"
                                onClick={(e) => deleteTask(task.id, e)}
                              >
                                Delete
                              </button>
                            </td>
                          ) : null}
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
