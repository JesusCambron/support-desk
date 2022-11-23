import React, { useEffect, useState } from "react";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import { login, reset } from "../features/auth/authSlice";

const initialFormData = {
  email: "",
  password: "",
};

function Login() {
  const [formData, setFormData] = useState(initialFormData);
  const { email, password } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    //Redirect when logged in
    if (isSuccess || user) {
      navigate("/");
    }

    dispatch(reset());
  }, [isError, isSuccess, user, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <section className="heading">
            <h1>
              <FaSignInAlt />
              Login
            </h1>
            <p>Please log in to get support</p>
          </section>
          <section className="form">
            <form onSubmit={onSubmit}>
              <div className="form-group">
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  value={email}
                  name="email"
                  onChange={onChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="form-group">
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  value={password}
                  name="password"
                  onChange={onChange}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div className="form-group">
                <button className="btn btn-block">Submit</button>
              </div>
            </form>
          </section>
        </>
      )}
    </>
  );
}

export default Login;
