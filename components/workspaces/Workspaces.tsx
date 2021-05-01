import { useEffect, useState } from "react";

import { useRouter } from "next/router";

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

  const router = useRouter();

  userWorkspaces.map((data) => {
    localStorage.setItem(
      "workspaceId",
      JSON.stringify({ wid: data.workspaceId })
    );
  });

  return (
    <div>
      {userWorkspaces
        ? userWorkspaces.map((data) => (
            <div key={data.id}>
              <div className="bg-gray-100 m-12 p-10 rounded-lg">
                <button
                  className="text-3xl font-face hover:text-green-300"
                  onClick={() => {
                    router.push({
                      pathname: "/workspace/[wid]",
                      query: { wid: data.workspaceId },
                    });
                  }}
                >
                  {data.title}
                  <span> &rarr;</span>
                </button>
                {data.description ? (
                  <div>
                    <p className="font-face py-2">Description:</p>
                    <span className="text-gray-400"> {data.description}</span>
                  </div>
                ) : (
                  <div>
                    <p className="font-face py-4">Description:</p>
                    <span className="text-gray-400"> None</span>
                  </div>
                )}
              </div>
            </div>
          ))
        : null}
    </div>
  );
}
