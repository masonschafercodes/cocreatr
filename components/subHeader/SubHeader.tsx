const SubHeader = () => {
  return (
    <div className="flex items-center justify-start  bg-gray-100 rounded p-4 mx-16 shadow-lg">
      <div className="mx-4">
        <button className="bg-gray-200 hover:bg-gray-300 p-3 rounded font-face shadow-md">
          Add New Event
        </button>
      </div>
      <div className="mx-4">
        <button className="bg-gray-200 hover:bg-gray-300 p-3 rounded font-face shadow-md">
          Add New Note
        </button>
      </div>
      <div className="mx-4">
        <button className="bg-gray-200 hover:bg-gray-300 p-3 rounded font-face shadow-md">
          Set Reminder
        </button>
      </div>
    </div>
  );
};

export default SubHeader;
