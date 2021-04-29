import Header from "../components/header/Header";
import { useUser } from "../lib/hooks";

const Profile = () => {
  const user = useUser({ redirectTo: "/" });

  return (
    <div>
      {user && (
        <div>
          <Header />
        </div>
      )}
    </div>
  );
};

export default Profile;
