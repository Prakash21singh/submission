import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import { fetchCourses, updateCourseLikes } from "../store/courseSlice";
import socket from "../socket";
import Card from "./custom/Card";

const CourseList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { courses, loading, error } = useSelector(
    (state: RootState) => state.courses
  );

  useEffect(() => {
    dispatch(fetchCourses());

    socket.on("courseLiked", (data) => {
      dispatch(updateCourseLikes(data));
    });

    return () => {
      socket.off("courseLiked");
    };
  }, [dispatch]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full flex items-center justify-around flex-wrap">
      {courses.map((course) => (
        <Card
          _id={course._id}
          instructor={course.instructor}
          likes={course.likes}
          name={course.name}
          thumbnail={course.thumbnail}
          key={course._id}
        />
      ))}
    </div>
  );
};

export default CourseList;
