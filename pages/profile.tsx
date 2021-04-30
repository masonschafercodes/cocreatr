import Header from "../components/header/Header";
import MoreInfo from "../components/moreInfo/moreInfo";
import { useUser } from "../lib/hooks";

function Profile() {
  const user = useUser({ redirectTo: "/" });

  return (
    <div>
      {user && (
        <div>
          <Header user={user} />
          <div>
            <MoreInfo />
          </div>
        </div>
      )}
    </div>
  );
}

export default Profile;
