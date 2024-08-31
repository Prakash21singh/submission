import * as User from "../controllers/user.controller";
import { verifyAuth } from "../middlewares/auth.middleware";

export const routeConfig = (app: any) => {
  app.post("/api/login", [User.login]);
  app.post("/api/signup", [User.signup]);
  app.get("/api/my-course", [verifyAuth, User.GetCourse]);
  app.post("/api/enroll-course/:courseId", [verifyAuth, User.EnrollCourse]);
  app.get("/api/getdata", [verifyAuth, User.GetData]);
};
