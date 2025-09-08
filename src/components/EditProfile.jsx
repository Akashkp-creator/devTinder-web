import { useState } from "react";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [age, setAge] = useState(user.age || "");
  const [about, setAbout] = useState(user.about || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl || "");
  const [gender, setGender] = useState(user.gender || "");
  const [error, setError] = useState();
  const [showToast, setShowToast] = useState(false);
  const dispatch = useDispatch();

  const saveProfile = async () => {
    setError("");
    try {
      const res = await axios.patch(
        `${BASE_URL}/profile/edit`,
        { firstName, lastName, photoUrl, age, about, gender },
        { withCredentials: true }
      );
      // console.log(res?.data?.data);
      dispatch(addUser(res?.data?.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2500);
    } catch (error) {
      setError(error.response.data);
      console.log(error);
    }
  };
  return (
    <>
      {showToast && (
        <div className="toast toast-top toast-center z-99">
          <div className="alert alert-success">
            <span>Your Profile Updated Successfully</span>
          </div>
        </div>
      )}
      <div className="flex justify-center gap-4">
        <div className="flex justify-center my-4  mb-20">
          <div className="card w-96 bg-secondary-content card-lg shadow-sm">
            <div className="card-body">
              <h2 className="card-title flex justify-center text-base">
                Edit Profile
              </h2>
              <div>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-xs">
                    First Name
                  </legend>
                  <input
                    type="text"
                    className="input text-xs border-pink-700 focus:border-pink-400! focus:ring-pink-400! focus:ring-2! focus:[--input-color:#f472b6]! caret-pink-500 text-pink-500"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-xs">Last Name</legend>
                  <input
                    type="text"
                    className="input text-xs border-pink-700 focus:border-pink-400! focus:ring-pink-400! focus:ring-2! focus:[--input-color:#f472b6]! caret-pink-500 text-pink-500"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-xs">PhotoUrl</legend>
                  <input
                    type="text"
                    className="input text-xs border-pink-700 focus:border-pink-400! focus:ring-pink-400! focus:ring-2! focus:[--input-color:#f472b6]! caret-pink-500 text-pink-500"
                    value={photoUrl}
                    onChange={(e) => setPhotoUrl(e.target.value)}
                  />
                </fieldset>
                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-xs">Gender</legend>
                  <select
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="select select-secondary text-pink-500"
                  >
                    <option value="male" className="text-pink-500">
                      Male
                    </option>
                    <option value="female" className="text-pink-500">
                      Female
                    </option>
                    <option value="others" className="text-pink-500">
                      Others
                    </option>
                  </select>
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-xs">Age</legend>
                  <input
                    type="text"
                    className="input text-xs border-pink-700 focus:border-pink-400! focus:ring-pink-400! focus:ring-2! focus:[--input-color:#f472b6]! caret-pink-500 text-pink-500"
                    value={age}
                    onChange={(e) => setAge(e.target.value)}
                  />
                </fieldset>

                <fieldset className="fieldset">
                  <legend className="fieldset-legend text-xs">About</legend>
                  <input
                    type="text"
                    className="input text-xs border-pink-700 focus:border-pink-400! focus:ring-pink-400! focus:ring-2! focus:[--input-color:#f472b6]! caret-pink-500 text-pink-500"
                    value={about}
                    onChange={(e) => setAbout(e.target.value)}
                  />
                </fieldset>
              </div>
              <p className="text-red-600">{error}</p>
              <div className="justify-center card-actions">
                <button
                  className="btn  btn-outline  btn-secondary"
                  onClick={saveProfile}
                >
                  Save Profile
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="my-10">
          <UserCard
            feed={{ firstName, lastName, photoUrl, age, about, gender }}
          />
        </div>
      </div>
    </>
  );
};
export default EditProfile;
