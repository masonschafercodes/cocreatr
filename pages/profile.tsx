import { useContext } from "react";
import Header from "../components/header/Header";
import MoreInfo from "../components/moreInfo/moreInfo";
import { userContext } from "../lib/userContext";

function Profile() {
  const user = useContext(userContext);

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
