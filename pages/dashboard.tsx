import { useContext } from "react";
import Header from "../components/header/Header";
import Workspaces from "../components/workspaces/Workspaces";
import { userContext } from "../lib/userContext";

function Dashboard() {
  const user = useContext(userContext);

  return (
    <div>
      {user && (
        <div>
          <Header user={user} />
          <div className="m-12">
            <h1 className="text-2xl font-face text-gray-400">
              Your Workspaces
            </h1>
          </div>
          <div>
            <Workspaces user={user} />
          </div>
          <div className="m-12">
            <h1 className="text-2xl font-face text-gray-400">
              Shared Workspaces
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
