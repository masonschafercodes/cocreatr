import { useEffect, useState } from "react";
import Task from "../../components/task/Task";
import Header from "../../components/header/Header";
import SubHeader from "../../components/subHeader/SubHeader";

import getLocalWid from "../../lib/getLocalWid";
import getLocalUser from "../../lib/getLocalUser";

const Workspace = () => {
  const user = getLocalUser();
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
      {/* TODO: FIX THIS */}
      <Header user={user} />
      <SubHeader wid={wid} />
      <div className="mx-14 mt-10">
        <h1 className="font-face text-2xl">Tasks: </h1>
      </div>
      <div className="flex flex-row flex-wrap w-full px-10">
        {workspaceTasks
          ? workspaceTasks.map((task) => (
              <div key={task.name} className="px-2 my-2">
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
