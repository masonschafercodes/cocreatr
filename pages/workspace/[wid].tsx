import { useEffect, useState } from "react";
import CreateTask from "../../components/task/CreateTask";
import Task from "../../components/task/Task";
import Header from "../../components/header/Header";
import { useUser } from "../../lib/hooks";
import SubHeader from "../../components/subHeader/SubHeader";

import getLocalWid from "../../lib/getLocalWid";

const Workspace = () => {
  const user = useUser({ redirectTo: "/" });
  const [workspaceTasks, setWorkspaceTasks] = useState([]);

  interface widType {
    wid: string;
  }
  const wid: widType = getLocalWid();

  useEffect(() => {
    fetch("http://localhost:3000/api/get-workspace-tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(wid),
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setWorkspaceTasks(data.tasks);
      });
  }, []);

  return (
    <div>
      <Header user />
      <SubHeader />
      <div className="mx-14 my-6">
        <CreateTask wid={wid} />
        <h1 className="font-face text-2xl">Tasks: </h1>
      </div>
      <div className="flex flex-row flex-wrap w-full">
        {workspaceTasks
          ? workspaceTasks.map((task) => (
              <div key={task.name} className="mx-5 my-2">
                <Task
                  name={task.name}
                  desc={task.taskDesc}
                  addedAt={task.createdAt}
                />
              </div>
            ))
          : null}
      </div>
    </div>
  );
};

export default Workspace;
