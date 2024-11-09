import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import notifyService from "../../Services/NotificationService";
import { useDispatch } from "react-redux";
import { userLoggedInAction } from "../Redux/UserAppState";
import { useNavigate } from "react-router-dom";
import { loggedInAsAdmin } from "../Redux/GuardAppState";
import couponWebApiService from "../../Services/CouponsWebApiService";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let isButtonPressed = false;

  const schema = zod.object({
    email: zod.string().nonempty("you must enter an email"),
    password: zod
      .string()
      .min(4, "password must be at least 4 characters")
      .nonempty("you must enter a password"),
    type: zod.string(["ADMIN"]),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitted },
  } = useForm({ mode: "all", resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    isButtonPressed = true;

    return couponWebApiService
      .login(data)
      .then((res) => {
        console.log(
          "Hello, I did login: " +
            res.data +
            " type: " +
            data.type +
            " email: " +
            data.email
        );

        console.log("login with id: " + res.data.id);
        navigate("/admin/coupons");

        // if (response.status === 200) {
        //   // Successful login
        //   console.log(response.data.message); // Login successful
        //   navigate("/admin/coupons");
        // }

        // dispatch(userLoggedInAction(newState));
        // navigate("/admin/coupons");

        // if (data.email === "admin@admin.com") {
        //   dispatch(loggedInAsAdmin());
        // }

        // if (data.type === "ADMIN") {
        //   dispatch(loggedInAsAdmin());
        // }
      })
      .catch((err) => {
        notifyService.error(err);
        isButtonPressed = false;
      });
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Email:</label>
          {errors?.email ? (
            <span className="error-message">{errors.email.message}</span>
          ) : (
            <label htmlFor="email"></label>
          )}
          <input {...register("email")} type="text" placeholder="Email" />
        </div>
        <div>
          <label>Password:</label>
          {errors?.password ? (
            <span className="error-message">{errors.password.message}</span>
          ) : (
            <label htmlFor="password"></label>
          )}
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
          />
        </div>

        <div className="type-select">
          <label>Type:</label>
          <select {...register("type")}>
            <option value="ADMIN">ADMIN</option>
          </select>
        </div>
        <button type="submit" disabled={isButtonPressed}>
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
