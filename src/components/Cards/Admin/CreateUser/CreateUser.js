import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import notifyService from "../../../../Services/NotificationService";
import { useDispatch } from "react-redux";
import adminWebApiService from "../../../../Services/AdminWebApiService";
import { addedUserAction } from "../../../Redux/UsersAppState";
import "./CreateUser.css";

function AddAdmin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const adminsModelSchema = zod.object({
    userName: zod.string().nonempty("Please enter a valid user name"),
    password: zod
      .string()
      .min(4, "Password must contain at least 4 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "all",
    resolver: zodResolver(adminsModelSchema),
  });

  const onSubmit = (data) => {
    adminWebApiService
      .addAdmin(data)
      .then((res) => {
        notifyService.success("The admin is added");
        dispatch(addedUserAction(res.data));
        navigate("/admin/coupons", {
          state: { wasUserDataUpdated: true },
        });
      })
      .catch((err) => notifyService.error(err));
  };

  return (
    <div className="AddUser">
      <h1>Add a new user (Admin)</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="input-container">
          {errors?.userName ? (
            <div className="error-message">{errors.userName.message}</div>
          ) : (
            <label htmlFor="userName">User Name</label>
          )}
          <input
            {...register("userName")}
            type="text"
            placeholder="User Name"
          />
        </div>
        <div className="input-container">
          {errors?.password ? (
            <div className="error-message">{errors.password.message}</div>
          ) : (
            <label htmlFor="password">Password</label>
          )}
          <input
            {...register("password")}
            type="password"
            placeholder="Password"
          />
        </div>

        <button type="submit" disabled={isSubmitting || !isValid}>
          ADD User
        </button>
      </form>
    </div>
  );
}

export default AddAdmin;
