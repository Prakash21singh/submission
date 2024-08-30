import {
  createCourse,
  getCourseById,
  getCourses,
  updateLikes,
} from "../controllers/course.controller";

export const routeConfig = function (app: any) {
  app.get("/api/courses", getCourses);
  app.get("/api/courses/:id", getCourseById);
  app.post("/api/courses", createCourse);
  app.put("/api/courses/:id/likes", updateLikes);
};
