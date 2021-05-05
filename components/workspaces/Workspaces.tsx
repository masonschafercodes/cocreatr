import { useContext } from "react";

import { useRouter } from "next/router";
import { widContext } from "../../lib/widContext";

export default function Workspaces({ user }) {
  const router = useRouter();
  const { workspace } = useContext(widContext);

  return (
    <div>
      {workspace
        ? workspace.workspaces.map((data) => (
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
