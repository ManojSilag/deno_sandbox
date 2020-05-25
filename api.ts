import { Application, Router } from "https://deno.land/x/oak/mod.ts";

//File : model

interface Course {
  name: string;
  price: number;
  certification: boolean;
}

//File : data


let courses: Array<Course> = [
  {
    name: "C++",
    price: 0,
    certification: false,
  },
  {
    name: "Python",
    price: 222,
    certification: true,
  },
  {
    name: "React",
    price: 342,
    certification: true,
  },
];

//File: controllers

export const getCourses = ({ response }: { response: any }) => {
  response.body = courses;
};

export const addCourses = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();
  const course: Course = body.value;
  courses.push(course);
  response.body = { coursesAdded: "SUCCESS" };
  response.status = 200;
};

//File: Server Files
const router = new Router();
const app = new Application();
const PORT = 4300;

router.get("/learn", getCourses).post("/create", addCourses);

app.use(router.routes());
app.use(router.allowedMethods());

await app.listen({ port: PORT });
