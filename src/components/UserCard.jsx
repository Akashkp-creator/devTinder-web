import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFromFeed } from "../utils/feedSlice";

const UserCard = ({ feed }) => {
  // console.log(feed);
  const dispatch = useDispatch();
  const {
    photoUrl: image,
    age,
    gender,
    firstName,
    lastName,
    about,
    _id: id,
  } = feed;
  // console.log(id);

  const handleSendRequest = async (status, toUserId) => {
    try {
      // /request/send/:status/:toUserId
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + toUserId,
        {},
        { withCredentials: true }
      );

      console.log(res);
      dispatch(removeUserFromFeed(toUserId));
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="card bg-base-500 w-96 shadow-xl mb-4">
      <figure>
        <img src={image} alt="Shoes" className="max-h-60 w-fit" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{`${firstName}  ${lastName}`}</h2>
        {age && gender && <p>{age + ", " + gender}</p>}
        <p>{about}</p>
        <div className="card-actions justify-center my-4">
          <button
            className="btn btn-primary"
            onClick={() => handleSendRequest("ignored", id)}
          >
            Ignore
          </button>
          <button
            className="btn btn-secondary"
            onClick={() => handleSendRequest("interested", id)}
          >
            Interested
          </button>
        </div>
      </div>
    </div>
  );
};
export default UserCard;
