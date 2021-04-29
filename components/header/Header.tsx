const Header = ({ user }) => {
  async function handleLogout() {
    try {
      await fetch("/api/logout");
      location.reload();
    } catch (error) {
      console.error("An unexpected error happened occurred:", error);
    }
  }

  return (
    <header className="flex items-center mx-12 my-7">
      <h1 className="font-icon text-4xl">
        Co<span className="text-green-500">Creatr</span>
      </h1>
      <div className="ml-auto">
        <span className="mr-2 font-face text-green-500">{user.email}</span>
        <button
          onClick={handleLogout}
          className="font-face tracking-wide t no-underline hover:underline transition duration-200 ease-in text-gray-600 hover:text-red-400"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
