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
          <div className="flex items-center justify-center">
            <span className="inline-flex self-center pr-2">
              <svg
                width={15}
                height={15}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3 1C2.44771 1 2 1.44772 2 2V13C2 13.5523 2.44772 14 3 14H10.5C10.7761 14 11 13.7761 11 13.5C11 13.2239 10.7761 13 10.5 13H3V2L10.5 2C10.7761 2 11 1.77614 11 1.5C11 1.22386 10.7761 1 10.5 1H3ZM12.6036 4.89645C12.4083 4.70118 12.0917 4.70118 11.8964 4.89645C11.7012 5.09171 11.7012 5.40829 11.8964 5.60355L13.2929 7H6.5C6.22386 7 6 7.22386 6 7.5C6 7.77614 6.22386 8 6.5 8H13.2929L11.8964 9.39645C11.7012 9.59171 11.7012 9.90829 11.8964 10.1036C12.0917 10.2988 12.4083 10.2988 12.6036 10.1036L14.8536 7.85355C15.0488 7.65829 15.0488 7.34171 14.8536 7.14645L12.6036 4.89645Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </span>
            Back to Dashboard
          </div>
        </button>
      </div>
    </div>
  );
};

export default SubHeader;
