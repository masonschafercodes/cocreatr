const Header = () => {
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
      <h1 className="font-icon text-4xl">CoCreatr</h1>
      <div className="ml-auto">
        <button
          onClick={handleLogout}
          className="font-face tracking-wide transition duration-200 ease-in no-underline hover:underline transition duration-200 ease-in text-black hover:text-red-400"
        >
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
