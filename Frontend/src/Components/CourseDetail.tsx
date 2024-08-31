import { useNavigate, useParams } from "react-router-dom";
import { selectCourseById } from "../store/courseSlice";
import { useSelector } from "react-redux";
import { CourseState } from "../store/courseSlice";
import axios from "axios";
import { RootState } from "../store";
const CourseDetail = () => {
  let { courseId } = useParams<{ courseId: string | "" }>();
  const navigate = useNavigate();
  if (!courseId) {
    return <h1>CourseId needed For data</h1>;
  }
  const course = useSelector((state: { courses: CourseState }) =>
    selectCourseById(state, courseId)
  );
  const { user } = useSelector((state: RootState) => state.auth);

  console.log({ user });
  if (!course) {
    return <div>Course not found</div>;
  }

  console.log(course.enrollmentStatus);
  async function handleEnroll(id: string) {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/enroll-course/${id}`,
        {},
        {
          withCredentials: true, // This sends cookies along with the request
        }
      );

      navigate("/dashboard");
    } catch (error) {
      console.error("Enrollment failed:", error);
      alert("Enrollment failed. Please try again.");
    }
  }

  return (
    <div className="w-[80%] bg-stone-100 mx-auto flex h-full items-start flex-col justify-start overflow-auto">
      <div className="flex h-full items-start w-full justify-start">
        <img src={course.thumbnail} alt={course.name} className="w-[35%]" />
        <div className="w-full text-center p-4">
          <h2 className="text-4xl font-semibold">{course.name}</h2>
          <p className="text-2xl font-medium">
            Instructor: {course.instructor}
          </p>
          <div className="w-[80%] mx-auto my-4 flex justify-between items-center">
            <p className={`text-base font-Inter`}>
              Enrollment Status:{" "}
              <span
                className={`${
                  course.enrollmentStatus === "Closed"
                    ? "text-red-400"
                    : "text-green-400"
                }`}>
                {course.enrollmentStatus}
              </span>
            </p>
            <p>
              location <span>{course.location}</span>
            </p>
          </div>
          <div className="w-[80%] mx-auto my-4 flex ">
            <h1>Pre Requisites:</h1>
            {course.prerequisites.map((skill, i) => (
              <li className="list-none font-semibold" key={`key-${i}`}>
                💡{skill}
              </li>
            ))}
          </div>
          <div className="text-bold text-xl">Timing : {course.schedule}</div>

          {user?.courses?.includes(courseId) ? (
            <button className="bg-green-300 px-4 py-2 rounded-sm">
              Enrolled
            </button>
          ) : (
            <>
              {(course.enrollmentStatus === "Open" ||
                course.enrollmentStatus === "In Progress") && (
                <button
                  className="bg-yellow-300 px-4 py-2 rounded-sm"
                  onClick={() => handleEnroll(course._id)}>
                  Enroll Now
                </button>
              )}
            </>
          )}
        </div>
      </div>
      {course.syllabus.map((topic, i) => (
        <div
          key={topic._id}
          className={`w-full ${
            i % 2 === 0 ? "bg-gray-300 text-left" : "bg-slate-500 text-left"
          } p-5`}>
          <p className="text-base font-medium capitalize">week:{topic.week}</p>
          <p className="underline">Topic: {topic.topic}</p>
          <p>{topic.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CourseDetail;
