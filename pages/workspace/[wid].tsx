import { useContext, useEffect, useState } from "react";
import Task from "../../components/task/Task";
import Header from "../../components/header/Header";
import SubHeader from "../../components/subHeader/SubHeader";
import TaskGraph from "../../components/taskGraph/TaskGraph";

import { userContext } from "../../lib/userContext";
import { widContext } from "../../lib/widContext";
import { useRouter } from "next/router";
import { taskContext } from "../../lib/taskContext";

const Workspace = () => {
  const { tasks, setTasks } = useContext(taskContext);
  const [taskGraphData, setTaskGraphData] = useState([]);
  const [completedGraphData, setCompletedGraphData] = useState([]);
  const { workspace } = useContext(widContext);
  const user = useContext(userContext);

  const router = useRouter();
  const { wid } = router.query;

  function formatTime(time) {
    let ttf = new Date(time);
    return ttf.toLocaleDateString();
  }

  useEffect(() => {
    async function init(wid) {
      try {
        await fetch("/api/get-workspace-tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wid: wid,
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setTasks(data.tasks);
          });
      } catch (error) {
        //ehhh
      }
    }
    init(wid);
  }, [workspace]);

  useEffect(() => {
    async function init(wid) {
      try {
        await fetch("/api/count-tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wid: wid,
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setTaskGraphData(data);
          });
      } catch (error) {
        //rhhh
      }
    }
    init(wid);
  }, [workspace]);

  useEffect(() => {
    async function init(wid) {
      try {
        await fetch("/api/count-completed", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            wid: wid,
          }),
        })
          .then((res) => {
            return res.json();
          })
          .then((data) => {
            setCompletedGraphData(data);
          });
      } catch (error) {
        //rhhh
      }
    }
    init(wid);
  }, [workspace]);

  let dataToSend = [];
  taskGraphData &&
    taskGraphData.map((taskData) => {
      dataToSend.push({
        time: formatTime(taskData.createdAt),
        count: taskData.count.name,
      });
    });

  let completedDataToSend = [];
  completedGraphData &&
    completedGraphData.map((taskData) => {
      completedDataToSend.push({
        time: formatTime(taskData.createdAt),
        count: taskData.count.name,
      });
    });

  return (
    <div>
      <Header user={user} />
      <SubHeader wid={wid} />
      <div className="flex flex-col px-16 py-6">
        <Task workspaceTasks={tasks ? tasks : []} user={user} wid={wid} />
        {dataToSend.length !== 0 ? (
          <div className="shadow-xl mt-5 p-5 rounded-xl">
            <h1 className="text-xl font-semibold font-face text-gray-500 bg-gray-100 p-6 rounded-xl">
              Tasks Created Per Day
            </h1>
            <TaskGraph data={dataToSend} />
          </div>
        ) : (
          <div></div>
        )}
        {completedDataToSend.length !== 0 ? (
          <div className="shadow-xl mt-5 p-5 rounded-xl">
            <h1 className="text-xl font-semibold font-face text-gray-500 bg-gray-100 p-6 rounded-xl">
              Tasks Completed Per Day
            </h1>
            <TaskGraph data={completedDataToSend} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  );
};

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const res = await fetch("http://localhost:3000/api/user");
//   const sessionUser: userSessionType = await res.json();
//   return {
//     props: {
//       sessionUser,
//     },
//   };
// };

export default Workspace;
