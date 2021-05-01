export default function Task({ name, desc, addedAt }) {
  function formatTime(time) {
    let ttf = new Date(time);
    return ttf.toLocaleDateString();
  }

  const time = formatTime(addedAt);

  return (
    <div className="p-5 bg-gray-100 w-1/4 flex flex-col justify-start m-2 rounded-lg w-full">
      <h1 className="font-face text-lg font-semibold mb-2">{name}</h1>
      <h3>{desc}</h3>
      <p className="mt-5 text-gray-400">Added: {time}</p>
    </div>
  );
}
