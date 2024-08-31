import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.model"; // Import your User model
import Course from "../models/course.model";

const JWT_SECRET = "your_jwt_secret_key"; // Use environment variables for secrets in production

// Signup
export const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.findOne({ email });
  if (user) {
    return res.status(401).json({ message: "User already created" });
  }

  const newUser = new User({
    email,
    password: hashedPassword,
  });

  await newUser.save();
  const token = jwt.sign({ userId: newUser._id }, JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("token", token, { httpOnly: true });
  res.status(201).json({ message: "User created successfully", token });
};

// Login
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: "1h" });

  res.cookie("token", token, { httpOnly: true });
  res.status(200).json({ message: "Login successful", token });
};

export const GetCourse = async function (req: Request, res: Response) {
  const userId = (req as any).userId;
  try {
    const user = await User.findById(userId)
      .select("courses")
      .populate({
        path: "courses.courseId",
        model: "Course",
      })
      .exec();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const EnrollCourse = async function (req: Request, res: Response) {
  const { courseId } = req.params;
  const userId = (req as any).userId;
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const alreadyEnrolled = user.courses.some((courseEntry: any) =>
    courseEntry.courseId.equals(course._id)
  );

  if (!alreadyEnrolled) {
    // Enroll in the course
    user.courses.push({ courseId: course._id, completed: false });
    await user.save();
    return res.status(201).json({ message: "Course enrolled successfully" });
  } else {
    return res.status(400).json({ message: "Already enrolled in this course" });
  }
};

export const GetData = async function (req: Request, res: Response) {
  const userId = (req as any).userId;
  const user = await User.findById(userId).select("-password");
  res.status(200).json(user);
};

export const Update = async function (req: Request, res: Response) {
  const userId = (req as any).userId;
  const { courseId } = req.params;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Find the course in the user's courses array
  const courseIndex = user.courses.findIndex(
    (course: any) => course.courseId.toString() === courseId
  );

  if (courseIndex === -1) {
    return res
      .status(404)
      .json({ message: "Course not found in user's courses" });
  }

  user.courses[courseIndex].completed = true;

  await user.save();

  res
    .status(200)
    .json({
      message: "Course status updated successfully",
      course: user.courses[courseIndex],
    });
};
