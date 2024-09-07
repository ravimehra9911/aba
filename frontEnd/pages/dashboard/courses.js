import React from "react";
import Course from "../../components/dashboard/Course";
import { useState, useEffect } from "react";
import { useContext } from "react";
import AuthContext from "@/utils/authContext";
import Cookies from "js-cookie";
import fetcher from "@/utils/fetcher";
import { useRouter } from "next/router";

const Courses = () => {
  const [myCourses, setMyCourses] = useState(null);
  const authContext = useContext(AuthContext);
  const [token, setToken] = useState(Cookies.get("abaToken"));
  const router = useRouter();
  useEffect(() => {
    setToken(Cookies.get("abaToken"));
    authContext.setIsLoading(true);
    if (token) {
      // Make a request to your backend to verify the token and get user data
      const getUser = async () => {
        try {
          const response = await fetcher("/api/user/me/findMyCourses", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.data || (response.data && response.data != null)) {
            // console.log(response.user);
            authContext.setUser(response.user);
            authContext.setIsLoading(false);
            authContext.setIsAuthenticated(true);
          }
        } catch (error) {
          authContext.setIsLoading(false);
          authContext.setIsAuthenticated(false);
        }
      };
      getUser();
    } else {
      authContext.setIsLoading(false);
      authContext.setIsAuthenticated(false);
      router.push("/login");
    }
  }, []);

  !myCourses &&
    authContext.user &&
    authContext.user.courses &&
    setMyCourses(authContext.user.courses);
  return (
    <section className="px-4">
      <h1 className="py-8 md:mb-16 p48 coursetitle text-center font-primary">
        courses
      </h1>
      {authContext.isLoading ? <p>loading...</p> : <></>}
      {token && !authContext.isLoading && !authContext.isAuthenticated ? (
        <p>Not Accessible</p>
      ) : (
        <div>
          {myCourses &&
            myCourses.map((course) => {
              return (
                <Course
                  key={course.id}
                  title={course.title}
                  description={course.description}
                  instructor={course.instructor}
                  courseUrl={course.courseUrl}
                  coursePreviewUrl={course.coursePreviewUrl}
                  rating={course.rating}
                  id={course.id}
                ></Course>
              );
            })}
        </div>
      )}
    </section>
  );
};

export default Courses;
