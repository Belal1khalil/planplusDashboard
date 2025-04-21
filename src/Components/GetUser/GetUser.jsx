import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import * as Yup from "yup";
import imageuser from "../../assets/imgs/WhatsApp Image 2025-04-20 at 3.24.26 PM.jpeg";
import { toast } from "react-hot-toast";

export default function GetUser() {
  const [image, setImage] = useState(null);
  const [notfound, setNotFound] = useState(false);
  const [role, setRole] = useState(null);

  const getUser = async (values) => {
    const response = await axios.get(
      `https://plansplus.runasp.net/api/Admin/GetUserData?Email=${values.email}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setImage(response.data.data.profilePic);
    setRole(response?.data.data.role);
    setNotFound(false);
    return response;
  };

  const { mutate, isPending, data } = useMutation({
    mutationFn: getUser,
    onError: () => setNotFound(true),
  });

  const refetchUser = () => {
    mutate({ email: Formik.values.email });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const Formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema,
    onSubmit: (values) => {
      setNotFound(false);
      mutate(values);
    },
  });

  const assignModerotor = async (email) => {
    const loadingToast = toast.loading("Loading...");
    try {
      const { data } = await axios.put(
        `https://plansplus.runasp.net/api/Admin/Assign-ModeratorRole?Email=${email}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.message === "Operation completed Successfully") {
        toast.success("User Assigned Successfully");
        refetchUser();
      }
    } catch (error) {
      console.error(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  const assignUser = async (email) => {
    const loadingToast = toast.loading("Loading...");
    try {
      const { data } = await axios.put(
        `https://plansplus.runasp.net/api/Admin/Assign-UserRole?Email=${email}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (data.message === "Operation completed Successfully") {
        toast.success("User Assigned Successfully");
        refetchUser();
      }
    } catch (error) {
      console.error(error);
    } finally {
      toast.dismiss(loadingToast);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <h1 className="text-2xl text-center mt-10 mb-4 px-8 text-gray-100 py-2 rounded-lg bg-mainColor inline">
          Get User
        </h1>
      </div>

      <div>
        <form className="max-w-md mx-auto" onSubmit={Formik.handleSubmit}>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <button
              type="submit"
              className="text-white absolute end-2.5 bottom-2.5 bg-[#279A41] hover:bg-[#1F2C43] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
            >
              Search
            </button>
            <input
              onChange={Formik.handleChange}
              onBlur={Formik.handleBlur}
              type="search"
              name="email"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
              placeholder="Enter user email..."
              required
            />
          </div>
          {Formik.errors.email && Formik.touched.email && (
            <p className="text-red-500 text-[15px] mt-4">
              {Formik.errors.email}
            </p>
          )}
        </form>
      </div>

      {isPending ? (
        <div className="flex flex-col items-center justify-center mt-8">
          <div role="status" className="max-w-sm animate-pulse">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5 w-full"
              />
            ))}
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : null}

      <div className="flex justify-center items-center mt-10">
        {data?.data?.data ? (
          <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
            <img
              className="w-full rounded-t-lg"
              src={image ? image : imageuser}
              alt="userImage"
            />

            <div className="p-5">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {data.data.data.displayedName}
              </h5>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <span className="font-semibold text-lg">Bio: </span>
                {data.data.data.bio}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <span className="font-semibold text-lg">Email: </span>
                {data.data.data.email}
              </p>
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                <span className="font-semibold text-lg">Role: </span>
                {data.data.data.role}
              </p>
              <div className="flex justify-end gap-4">
                <button
                  type="button"
                  disabled={role === "Admin" || role === "User"}
                  className={`bg-[#279A41] hover:bg-[#1F2C43] transition-all text-white font-bold py-2 px-4 rounded ${
                    role === "Admin" || role === "User" ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => assignUser(data.data.data.email)}
                >
                  Assign User Role
                </button>
                <button
                  type="button"
                  disabled={role === "Admin" || role === "Moderator"}
                  className={`bg-[#279A41] hover:bg-[#1F2C43] transition-all text-white font-bold py-2 px-4 rounded ${
                    role === "Admin" || role === "Moderator" ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  onClick={() => assignModerotor(data.data.data.email)}
                >
                  Assign Moderator
                </button>
              </div>
            </div>
          </div>
        ) : notfound ? (
          <div className="text-center text-red-600 text-xl font-semibold">
            <div className="max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 border border-red-300 dark:border-red-600 rounded-xl shadow-md p-6 flex flex-col items-center">
              <svg
                className="w-16 h-16 text-red-500 mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h2 className="text-xl font-semibold text-red-600 mb-2">
                User Not Found
              </h2>
              <p className="text-gray-700 dark:text-gray-300 text-center">
                The user you are looking for does not exist or the email is
                incorrect. Please try again with a valid email address.
              </p>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}