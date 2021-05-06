import CreateTask from "../task/CreateTask";
import { useRouter } from "next/router";
import { useContext } from "react";
import { userContext } from "../../lib/userContext";

const SubHeader = ({ wid }) => {
  const user = useContext(userContext);
  const router = useRouter();
  return (
    <div className="flex items-center justify-start rounded p-4 mx-16">
      <div className="mx-4">
        <CreateTask wid={wid} user={user} />
      </div>
      <div className="mx-4">
        <div className="flex flex-row">
          <button
            className="opacity-70 px-3 py-2 bg-blue-400 hover:bg-blue-500 my-3 font-face text-white rounded shadow-md"
            onClick={(e) => {
              e.preventDefault();
              navigator.clipboard.writeText(
                `http://localhost:3000/workspace/${wid}`
              );
            }}
          >
            Copy Invite Link
            <span className="inline-flex self-center pl-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 210.107 210.107"
                className="h-4"
              >
                <path
                  d="M168.506 0H80.235C67.413 0 56.981 10.432 56.981 23.254v2.854h-15.38c-12.822 0-23.254 10.432-23.254 23.254v137.492c0 12.822 10.432 23.254 23.254 23.254h88.271c12.822 0 23.253-10.432 23.253-23.254V184h15.38c12.822 0 23.254-10.432 23.254-23.254V23.254C191.76 10.432 181.328 0 168.506 0zm-30.38 186.854c0 4.551-3.703 8.254-8.253 8.254H41.601c-4.551 0-8.254-3.703-8.254-8.254V49.361c0-4.551 3.703-8.254 8.254-8.254h88.271c4.551 0 8.253 3.703 8.253 8.254v137.493zm38.634-26.108c0 4.551-3.703 8.254-8.254 8.254h-15.38V49.361c0-12.822-10.432-23.254-23.253-23.254H71.981v-2.854c0-4.551 3.703-8.254 8.254-8.254h88.271c4.551 0 8.254 3.703 8.254 8.254v137.493z"
                  fill="#FFFFFF"
                />
              </svg>
            </span>
          </button>
        </div>
      </div>
      <div className="ml-auto">
        <button
          className="opacity-70 px-3 py-2 bg-red-400 hover:bg-red-500 my-3 font-face text-white rounded shadow-md"
          onClick={() => router.push("/dashboard")}
        >
          <span className="inline-flex self-center pr-2">
            <svg
              width={15}
              height={15}
              viewBox="0 0 15 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.5 3a.5.5 0 000 1h12a.5.5 0 000-1h-12zM1 7.5a.5.5 0 01.5-.5h12a.5.5 0 010 1h-12a.5.5 0 01-.5-.5zm0 4a.5.5 0 01.5-.5h12a.5.5 0 010 1h-12a.5.5 0 01-.5-.5z"
                fill="currentColor"
                fillRule="evenodd"
                clipRule="evenodd"
              />
            </svg>
          </span>
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default SubHeader;
