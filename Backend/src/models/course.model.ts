import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    instructor: { type: String, required: true },
    description: { type: String, required: true },
    enrollmentStatus: {
      type: String,
      enum: ["Open", "Closed", "In Progress"],
      required: true,
    },
    thumbnail: { type: String, required: true },
    duration: { type: String, required: true },
    schedule: { type: String, required: true },
    location: { type: String, required: true },
    prerequisites: [{ type: String }],
    syllabus: [
      {
        week: { type: Number },
        topic: { type: String },
        content: { type: String },
      },
    ],
    likes: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);

export default Course;
