import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    // console.log(emailId, password);

    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      // console.log(res);
      dispatch(addUser(res.data));
      return navigate("/");
      // console.log(emailId, password);
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
      console.log(error);
    }
  };

  const handleSignup = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (error) {
      setError(error?.response?.data || "Something went wrong");
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center my-4">
      <div className="card w-96 bg-secondary-content card-lg shadow-sm">
        <div className="card-body">
          <h2 className="card-title flex justify-center">
            {isLoginForm ? "Login" : "Signup"}
          </h2>
          <div>
            {!isLoginForm && (
              <>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">First Name</legend>
                  <input
                    type="text"
                    className="input text-base border-pink-700 focus:border-pink-400! focus:ring-pink-400! focus:ring-2! focus:[--input-color:#f472b6]! caret-pink-500 text-pink-500"
                    // placeholder="abcd@gmail.com"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend">Last Name</legend>
                  <input
                    type="text"
                    className="input text-base border-pink-700 focus:border-pink-400! focus:ring-pink-400! focus:ring-2! focus:[--input-color:#f472b6]! caret-pink-500 text-pink-500"
                    // placeholder="abcd@gmail.com"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
              </>
            )}
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                className="input text-base border-pink-700 focus:border-pink-400! focus:ring-pink-400! focus:ring-2! focus:[--input-color:#f472b6]! caret-pink-500 text-pink-500"
                // placeholder="abcd@gmail.com"
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input text-base border-pink-700 focus:border-pink-400! focus:ring-pink-400! focus:ring-2! focus:[--input-color:#f472b6]! caret-pink-500 text-pink-500"
                // placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <p className="text-red-500 text-base">{error}</p>
          <div className="justify-center card-actions">
            <button
              className="btn  btn-outline  btn-secondary"
              onClick={isLoginForm ? handleLogin : handleSignup}
            >
              {isLoginForm ? "Login" : "Signup"}
            </button>
          </div>
          <p
            className="text-center cursor-pointer"
            onClick={() => setIsLoginForm((s) => !s)}
          >
            {" "}
            {isLoginForm
              ? "New User? Signup Here"
              : "Existing User? Login Here"}
          </p>
        </div>
      </div>
    </div>
  );
};
export default Login;
