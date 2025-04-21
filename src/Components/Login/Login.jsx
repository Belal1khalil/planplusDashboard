import React, { useContext } from "react";
import { useState } from "react";
import logo from "../../assets/imgs/LogoBlack.png";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";
import SweetAlert from "../SweetAlert/SweetAlert";
import { ThreeDot } from "react-loading-indicators";
export default function Login() {
  let { token, setToken } = useContext(AuthContext);
  const [showError, setShowError] = useState(false);
  const [password, setPassword] = useState(false);
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const [succeeded, setSucceeded] = useState(false);
  const [loading, setLoading] = useState(false);
  const PassRegex = /^(?=.*[A-Z]).{8,}$/;
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        PassRegex,
        "Password must be at least 8 characters long and contain at least one uppercase letter"
      ),
  });
  const Formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
    onSubmit: login,
  });
  async function login(values) {
    setError(false);
    setSucceeded(false);
    setLoading(true);
    const vaalues = JSON.stringify(values, null, 2);
    try {
      const { data } = await axios.post(
        "https://plansplus.runasp.net/api/Admin/Login",
        vaalues,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(data);

      if (data.succeeded === true) {
        localStorage.setItem("token", data.token);
        setToken(data.token);
        setSucceeded(true);
        setShowError(true);
        setData(data);

        setTimeout(() => {
          navigate("/Dashboard");
        }, 1500);
      } else {
        setError(true);
        setShowError(true);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <div className="min-h-[50vh] bg-white">
        <div className=" flex w-11/12 my-5 ms-5 md:mx-9 justify-start items-center">
          <Link to="/">
            <img src={logo} className="w-2/12" alt="" />
          </Link>
        </div>
        <div className="grid grid-cols-1  md:grid-cols-3">
          <div className="col-span-2 ps-5 order-last md:order-first bg-white">
            <div className=" md:flex flex-col mt-24  justify-center   xl:mx-60  min-h-[50vh]">
              <div className=" ms-10 md:ms-0">
                <h1 className="text-4xl font-bold font-roboto text-secondColor">
                  Welcome Back.
                </h1>
                <p className="text-[15px] font-roboto text-secondColor"></p>
              </div>
              <form onSubmit={Formik.handleSubmit}>
                <div className="form  md:ms-0 ">
                  <div className="grid grid-cols-1  ">
                    <div className=" my-8  ">
                      <label
                        htmlFor="Email"
                        className="block mb-2   md:mx-0 text-[15px] font-medium text-secondColor font-roboto  "
                      >
                        <div className="flex justify-start items-center">
                          <i className={`fa-solid fa-envelope mx-3`}></i>
                          <p>Email</p>
                        </div>
                      </label>
                      <input
                        type="text"
                        id="Email"
                        placeholder="Email"
                        name="email"
                        onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                        value={Formik.values.email}
                        className={` w-11/12 place-self-center md:w-3/4 placeholder:text-[#B0B0B0] placeholder-opacity-50 shadow-md     p-2 text-gray-900 border border-gray-300 rounded-lg ${
                          Formik.errors.email && Formik.touched.email
                            ? "border-red-500"
                            : ""
                        } bg-gray-50 text-sm focus:ring-mainColor focus:border-mainColor `}
                      />
                      {Formik.errors.email && Formik.touched.email && (
                        <p className="text-red-500 text-[15px]  mt-4">
                          {Formik.errors.email}
                        </p>
                      )}
                    </div>
                    <div className=" mt-4">
                      <label
                        htmlFor="Password"
                        className="block mb-2  mx-3 md:mx-0   text-[15px] font-medium text-secondColor font-roboto  "
                      >
                        <div className="flex justify-start items-center">
                          <i className="fa-solid fa-lock mx-3"></i>
                          <p>Password</p>
                        </div>
                      </label>
                      <div className="relative">
                        <input
                          type={password ? "text" : "password"}
                          id="Password"
                          placeholder="Password "
                          onChange={Formik.handleChange}
                          onBlur={Formik.handleBlur}
                          value={Formik.values.password}
                          name="password"
                          className={` w-11/12  place-self-center md:w-3/4 text-sm  shadow-md  placeholder:text-[#B0B0B0] ${
                            Formik.errors.password && Formik.touched.password
                              ? "border-red-500"
                              : ""
                          }   p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50    focus:ring-mainColor focus:border-mainColor `}
                        />

                        <button
                          type="button"
                          onClick={() => setPassword(!password)}
                          className=""
                        >
                          <i
                            className={`fa-solid ${
                              password ? "fa-eye" : "fa-eye-slash"
                            } text-secondColor absolute top-1/2 transform -translate-y-1/2 ${
                              Formik.errors.password ? "top-[18%]" : ""
                            } sm:left-[70%] left-[85%]`}
                          ></i>
                        </button>

                        {Formik.errors.password && Formik.touched.password && (
                          <p className="text-red-500 text-[15px]  mt-4">
                            {Formik.errors.password}
                          </p>
                        )}
                      </div>

                      <div className="flex  mt-8 mb-5">
                        <button
                          type="submit"
                          className=" bg-mainColor w-11/12  text-white hover:bg-secondColor md:w-3/4 transition-all px-5   focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm  py-4 text-center"
                        >
                          {loading ? (
                            <ThreeDot
                              variant="pulsate"
                              color="#2E865F"
                              size="medium"
                              text=""
                              textColor=""
                            />
                          ) : (
                            "Login"
                          )}
                        </button>
                        {succeeded ? (
                          <SweetAlert
                            title="Success"
                            text={data.message}
                            icon="success"
                            trigger={showError}
                          />
                        ) : null}

                        {error ? (
                          <SweetAlert
                            title="Access Denied"
                            text={"You Are Not Admin or Modrator"}
                            icon="error"
                            trigger={showError}
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="bg-mainColor hidden  md:flex hover:bg-secondColor transition-all min-h-[85.5vh] rounded-b-3xl md:rounded-none md:order-last order-first md:rounded-tl-[60px]  items-center justify-center  md:rounded-bl-[60px] col-span-1">
            <img src={logo} className="w-3/6" alt="" />
          </div>
        </div>
      </div>
    </>
  );
}
