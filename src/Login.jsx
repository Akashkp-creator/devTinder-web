import axios from "axios";
import { useState } from "react";

const Login = () => {
  const [emailId, setEmail] = useState("akash@gmail.com");
  const [password, setPassword] = useState("Akash@123");
  const handleLogin = async () => {
    console.log(emailId, password);
    try {
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      console.log(res);
      console.log(emailId, password);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex justify-center my-4">
      <div className="card w-96 bg-secondary-content card-lg shadow-sm">
        <div className="card-body">
          <h2 className="card-title flex justify-center">Login</h2>
          <div>
            <fieldset className="fieldset">
              <legend className="fieldset-legend">Email ID</legend>
              <input
                type="text"
                className="input border-pink-700"
                placeholder="abcd@gmail.com"
                value={emailId}
                onChange={(e) => setEmail(e.target.value)}
              />
            </fieldset>

            <fieldset className="fieldset">
              <legend className="fieldset-legend">Password</legend>
              <input
                type="password"
                className="input border-pink-700"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </fieldset>
          </div>
          <div className="justify-center card-actions">
            <button
              className="btn  btn-outline  btn-secondary"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Login;
