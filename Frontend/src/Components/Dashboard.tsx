import axios from "axios";
import { useEffect, useState } from "react";
import Card from "./custom/Card";

const Dashboard = () => {
  const [courses, setCourses] = useState<any[]>([]); // Initialize as an empty array
  const [error, setError] = useState<string | null>(null); // Optional: Handle errors

  useEffect(() => {
    async function getEnrolledCourses() {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/my-course",
          { withCredentials: true }
        );
        const coursesData = response.data.courses;
        console.log(coursesData);
        // Ensure this is an array
        if (Array.isArray(coursesData)) {
          setCourses(coursesData);
        } else {
          console.error("Unexpected response format:", coursesData);
          setError("Failed to load courses");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
        setError("Failed to load courses");
      }
    }
    getEnrolledCourses();
  }, []);

  async function markAsCompleted(id: string): Promise<void> {
    axios
      .post(
        `http://localhost:5000/api/course/update/${id}`,
        {},
        { withCredentials: true }
      )
      .then((response: any) => {
        const updatedCourse = response.data.course;
        setCourses((courses) =>
          courses.map((course) =>
            course.courseId._id === updatedCourse.courseId
              ? { ...course, completed: updatedCourse.completed }
              : course
          )
        );
      })
      .catch((error: any) => {
        console.log(error);
      });
  }

  return (
    <div className="w-full flex items-center h-screen justify-around overflow-auto flex-col">
      <h1 className="text-5xl my-5">Enrolled Courses</h1>
      {error && <p>{error}</p>}

      <div className="w-full flex flex-col justify-center items-center">
        {courses.length > 0 ? (
          courses.map((course: any) => (
            <Card
              _id={course.courseId._id}
              instructor={course.courseId.instructor}
              likes={course.courseId.likes}
              name={course.courseId.name}
              thumbnail={course.courseId.thumbnail}
              key={course.courseId._id}
              isCompleted={course.completed}
              markAsdone={() => markAsCompleted(course.courseId._id)}
              seconday
            />
          ))
        ) : (
          <p>No courses available</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
