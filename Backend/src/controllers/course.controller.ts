import { Request, Response } from "express";
import Course from "../models/course.model";
import { io } from "../index";

export const getCourses = async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const getCourseById = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });
    res.json(course);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

export const createCourse = async (req: Request, res: Response) => {
  const course = new Course(req.body);
  try {
    const newCourse = await course.save();
    res.status(201).json(newCourse);
  } catch (err: any) {
    res.status(400).json({ message: err.message });
  }
};

export const updateLikes = async (req: Request, res: Response) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: "Course not found" });

    course.likes += 1;
    await course.save();

    // Emit the updated likes count to all connected clients
    io.emit("courseLiked", { courseId: course._id, likes: course.likes });

    res.json(course);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};
