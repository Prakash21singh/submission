import axios from "axios";
import { useNavigate } from "react-router-dom";

interface Course {
  _id: string;
  name: string;
  instructor: string;
  likes: number;
  thumbnail: string;
  isCompleted?: boolean;
  markAsdone?: () => {};
  seconday?: boolean;
}

const Card = ({
  _id,
  name,
  instructor,
  likes,
  thumbnail,
  isCompleted,
  markAsdone,
  seconday,
}: Course) => {
  const navigate = useNavigate();

  function navigateToCourseDetails() {
    navigate(`/courses/${_id}`);
  }

  const likeCourse = async (id: string) => {
    try {
      await axios.put(`http://localhost:5000/api/courses/${id}/likes`);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full lg:w-[48%] min-w-80  flex items-center justify-center rounded-lg shadow-md overflow-hidden">
      <div className="border p-5 flex flex-col items-start w-full">
        <img
          src={thumbnail}
          alt="Thumbnail"
          className="w-full rounded-sm h-72"
        />
        <p className="text-wrap font-semibold text-2xl"> {name}</p>
        <p className="text-lg">By:{instructor}</p>
        <div className="w-full flex items-center justify-between my-5">
          <p>Likes:{likes}</p>
          <button className="text-2xl" onClick={() => likeCourse(_id)}>
            &#10084;
          </button>
        </div>
        <div
          className="text-blue-600 underline p-3 text-lg cursor-pointer"
          onClick={navigateToCourseDetails}>
          Checkout
        </div>
        {seconday && (
          <>
            {!isCompleted ? (
              <button
                onClick={markAsdone}
                className="bg-yellow-200 p-3 rounded-sm">
                Mark As Completed
              </button>
            ) : (
              <button className="bg-green-200 p-3 rounded-sm">Completed</button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
