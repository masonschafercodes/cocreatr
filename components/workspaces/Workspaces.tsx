import { useEffect, useState } from "react";

export default function Workspaces({ user }) {
  const [userWorkspaces, setUserWorkspaces] = useState([]);

  type userEmail = {
    email: String;
  };

  const getUserWorkspaceData = async () => {
    const data: userEmail = {
      email: user.email,
    };

    if (data) {
      const res = await fetch("/api/get-workspaces", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          return response.json();
        })
        .then((jsonData) => {
          return jsonData;
        })
        .then((jsonStr) => {
          const userWorkspaceData = jsonStr;
          setUserWorkspaces(userWorkspaceData["workspaces"]);
          console.log(userWorkspaceData["workspaces"]);
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    getUserWorkspaceData();
  }, []);

  return (
    <div>
      {userWorkspaces
        ? userWorkspaces.map((data) => (
            <div key={data.id} className="bg-gray-100 m-12 p-10 rounded">
              <h1 className="text-2xl font-face">{data.title}</h1>
              {data.description ? (
                <p className="font-face py-2">
                  Description:
                  <span className="text-gray-400"> {data.description}</span>
                </p>
              ) : (
                <p className="font-face py-2">
                  Description:
                  <span className="text-gray-400"> None</span>
                </p>
              )}
            </div>
          ))
        : null}
    </div>
  );
}
