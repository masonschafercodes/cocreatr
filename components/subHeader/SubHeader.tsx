import CreateTask from "../task/CreateTask";

const SubHeader = ({ wid }) => {
  return (
    <div className="flex items-center justify-start  bg-gray-100 rounded p-4 mx-16 shadow-lg">
      <div className="mx-4">
        <button className="px-3 py-2 bg-green-400 hover:bg-green-500 my-3 font-face text-white rounded shadow-md">
          Add New Event
        </button>
      </div>
      <div className="mx-4">
        <CreateTask wid={wid} />
      </div>
    </div>
  );
};

export default SubHeader;
