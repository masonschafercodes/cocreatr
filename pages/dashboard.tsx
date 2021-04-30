import Header from "../components/header/Header";
import Workspaces from "../components/workspaces/Workspaces";
import { useUser } from "../lib/hooks";

function Dashboard() {
  const user = useUser({ redirectTo: "/" });

  return (
    <div>
      {user && (
        <div>
          <Header user={user} />
          <div className="m-12">
            <h1 className="text-3xl font-face">Your Workspaces</h1>
          </div>
          <div>
            <Workspaces user={user} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
