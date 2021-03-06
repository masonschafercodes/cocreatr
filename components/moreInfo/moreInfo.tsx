import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { userContext } from "../../lib/userContext";

function MoreInfo() {
  const user = useContext(userContext);

  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pictureLink, setPictureLink] = useState("");
  const [workspaceName, setworkspaceName] = useState("");
  const [isNewUser, setIsNewUser] = useState<Boolean>();

  type userEmail = {
    email: String;
  };

  const getNewUserStatus = async () => {
    const data: userEmail = {
      email: user.email,
    };

    if (data) {
      const res = await fetch("/api/is-user-new", {
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
          const isUserNew = jsonStr.isNewUser;
          setIsNewUser(isUserNew);
          if (!isUserNew) return router.push("/dashboard");
        })
        .catch((err) => console.error(err));
    }
  };

  useEffect(() => {
    getNewUserStatus();
  }, []);

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      pictureLink: pictureLink,
      worspaceName: workspaceName,
    };

    if (email && name) {
      try {
        const res = await fetch("/api/add-userinfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });
        if (res.status === 200 && typeof window !== "undefined") {
          router.push("/dashboard");
        } else {
          throw new Error(await res.text());
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div>
      {isNewUser && (
        <div className="flex flex-col items-center justify-center p-32">
          <h1 className="text-3xl font-face">One Last Thing.</h1>
          <p className="text-gray-400 text-sm my-3">
            Just need a little bit more info to personalize your experience.
          </p>
          <div className="w-1/3">
            <form onSubmit={handleSubmit}>
              <label htmlFor="name" className="flex flex-col">
                <span className="text-lg font-face my-3 text-gray-400 ">
                  Name
                </span>
                <input
                  type="text"
                  className="bg-gray-200 rounded p-3 font-face focus:border-green-300"
                  placeholder="Jane Doe"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label htmlFor="email" className="flex flex-col">
                <span className="text-lg font-face my-3 text-gray-400 ">
                  Email
                </span>
                <input
                  type="email"
                  className="bg-gray-200 rounded p-3 font-face focus:border-green-300"
                  placeholder="janedoe@gmail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label htmlFor="pictureLink" className="flex flex-col">
                <span className="text-lg font-face my-3 text-gray-400 ">
                  Link to Profile Picture
                </span>
                <input
                  type="text"
                  className="bg-gray-200 rounded p-3 font-face focus:border-green-300"
                  placeholder="http://www.google.com/images"
                  value={pictureLink}
                  onChange={(e) => setPictureLink(e.target.value)}
                  required
                />
              </label>
              <div className="flex items-center justify-center my-12">
                <hr className="w-1/2 inline-block align-middle" />
              </div>
              <label htmlFor="pictureLink" className="flex flex-col">
                <span className="text-lg pb-3 font-face text-gray-400 ">
                  Name for your first Workspace
                </span>
                <input
                  type="text"
                  className="bg-gray-200 rounded p-3 font-face focus:border-green-300"
                  placeholder="A Cool Workspace Name"
                  value={workspaceName}
                  onChange={(e) => setworkspaceName(e.target.value)}
                  required
                />
              </label>
              {name && email && pictureLink ? (
                <button
                  type="submit"
                  className="mt-5 w-full transition duration-200 ease-in bg-green-400 hover:bg-green-500 text-white font-face font-bold p-2 rounded shadow-lg"
                >
                  Continue <span>&rarr;</span>
                </button>
              ) : (
                <button
                  type="submit"
                  className="mt-5 w-full transition duration-200 ease-in bg-green-400 hover:bg-green-500 text-white font-face font-bold p-2 rounded shadow-lg"
                  disabled
                >
                  Continue <span>&rarr;</span>
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MoreInfo;
