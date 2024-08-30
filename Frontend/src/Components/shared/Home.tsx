import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center flex-col">
      <h1 className="text-2xl lg:text-7xl font-semibold">
        Welcome to the home page
      </h1>
      <Link to={"/courses"}>
        <button className="p-3 border bg-zinc-200 rounded-md my-3 hover:bg-zinc-300 transition">
          Find Course
        </button>
      </Link>
    </div>
  );
};

export default Home;
