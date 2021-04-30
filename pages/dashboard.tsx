import Header from "../components/header/Header";
import SubHeader from "../components/subHeader/SubHeader";
import { useUser } from "../lib/hooks";

function Dashboard() {
  const user = useUser({ redirectTo: "/" });

  return (
    <div>
      {user && (
        <div>
          <Header user={user} />
          <div>
            <SubHeader />
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;