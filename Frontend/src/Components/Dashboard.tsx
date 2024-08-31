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
        const coursesData = response.data.courses.courses; // Ensure this is an array
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

  return (
    <div className="w-full flex items-center justify-around flex-wrap">
      {error && <p>{error}</p>}
      {courses.length > 0 ? (
        courses.map((course: any) => (
          <Card
            _id={course._id}
            instructor={course.instructor}
            likes={course.likes}
            name={course.name}
            thumbnail={course.thumbnail}
            key={course._id}
          />
        ))
      ) : (
        <p>No courses available</p>
      )}
    </div>
  );
};

export default Dashboard;
