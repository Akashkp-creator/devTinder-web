import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequests } from "../utils/requestsslice";

const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.requests);
  //   console.log(request);
  const fetchRequest = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/user/requests/received`, {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addRequests(res?.data?.data));
    } catch (error) {
      // console.log(error.message);
      // Specific handling for "no requests found" (404)
      if (
        error.response?.status === 404 &&
        error.response?.data === "No connection request found"
      ) {
        console.log("ℹ️ No pending connection requests");
        dispatch(addRequests([]));
      }
      // Handle authentication errors (401)
      else if (error.response?.status === 401) {
        console.error("🔐 Authentication required");
        // Optional: redirect to login page
        dispatch(addRequests([]));
      }
      // Handle server errors (400, 500, etc.)
      else if (error.response) {
        console.error(
          "❌ Server error:",
          error.response.status,
          error.response.data
        );
        dispatch(addRequests([]));
      }
      // Handle network errors
      else {
        console.error("🌐 Network error:", error.message);
        dispatch(addRequests([]));
      }
    }
  };
  useEffect(() => {
    fetchRequest();
  }, []);

  // Handle accept action
  const requestReview = async (status, connectionId) => {
    console.log(
      "status is " + status + " and connection id is " + connectionId
    );
    // Add your review request logic here
    try {
      const res = await axios.post(
        `${BASE_URL}/request/review/${status}/${connectionId}`,
        {},
        { withCredentials: true }
      );
      console.log("Request reviewed successfully:", res.data);
      dispatch(removeRequests(connectionId));
    } catch (error) {
      console.error("Review error:", {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });

      // Optional: Show user feedback
      alert(error.response?.data || "Failed to process request");
    }
  };

  // Show loading state if requests is null or empty
  // if (request === null) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto"></div>
  //         <p className="mt-4 text-pink-600">Loading requests...</p>
  //       </div>
  //     </div>
  //   );
  // }

  // Show empty state if there are no requests
  // if (request.length === 0) {
  //   return (
  //     <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
  //       <div className="text-center">
  //         <div className="mx-auto h-24 w-24 rounded-full bg-pink-100 flex items-center justify-center mb-6">
  //           <svg
  //             className="w-12 h-12 text-pink-500"
  //             fill="none"
  //             stroke="currentColor"
  //             viewBox="0 0 24 24"
  //             xmlns="http://www.w3.org/2000/svg"
  //           >
  //             <path
  //               strokeLinecap="round"
  //               strokeLinejoin="round"
  //               strokeWidth="2"
  //               d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
  //             ></path>
  //           </svg>
  //         </div>
  //         <h2 className="text-2xl font-bold text-pink-800 mb-2">
  //           No Connection Requests
  //         </h2>
  //         <p className="text-pink-600">
  //           You don't have any pending connection requests at the moment.
  //         </p>
  //       </div>
  //     </div>
  //   );
  // }
  if (!request) return;
  if (!request)
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
        //{" "}
        <div className="text-center">
          //{" "}
          <div className="mx-auto h-24 w-24 rounded-full bg-pink-100 flex items-center justify-center mb-6">
            //{" "}
            <svg
              className="w-12 h-12 text-pink-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              ></path>
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-pink-800 mb-2">
            No Connection Requests
          </h2>
          <p className="text-pink-600">
            You don't have any pending connection requests at the moment.
          </p>
        </div>
      </div>
    );
  if (request.length === 0)
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-24 w-24 text-gray-300">
          <svg
            className="w-full h-full"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          No connection requests
        </h3>
        <p className="mt-2 text-sm text-gray-500">
          You don't have any pending connection requests at the moment.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-pink-800 mb-2">
            Connection Requests
          </h1>
          <p className="text-pink-600">
            You have {request.length} pending requests
          </p>
        </div>

        <div className="space-y-6">
          {request.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/4 p-4 flex justify-center items-center">
                  <div className="relative">
                    <img
                      src={item.fromUserId.photoUrl}
                      alt={`${item.fromUserId.firstName} ${item.fromUserId.lastName}`}
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-pink-200"
                    />
                    <div className="absolute bottom-2 right-2 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {item.fromUserId.age}
                    </div>
                  </div>
                </div>

                <div className="md:w-2/4 p-4 border-b md:border-b-0 md:border-r border-pink-100">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">
                    {item.fromUserId.firstName}{" "}
                    <span className="text-pink-600">
                      {item.fromUserId.lastName}
                    </span>
                  </h2>

                  <div className="flex items-center mb-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.fromUserId.gender === "male"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-pink-100 text-pink-800"
                      }`}
                    >
                      {item.fromUserId.gender === "male" ? (
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ) : (
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      )}
                      {item.fromUserId.gender}
                    </span>

                    <span className="ml-2 text-sm text-gray-500">
                      Interested in connecting
                    </span>
                  </div>

                  <p className="text-gray-600 mb-4">{item.fromUserId.about}</p>

                  <div className="mb-4">
                    <h3 className="text-sm font-semibold text-gray-700 mb-1">
                      Skills:
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {item.fromUserId.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="md:w-1/4 p-4 flex flex-col justify-center space-y-4">
                  <button
                    onClick={() => requestReview("accepted", item._id)}
                    className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Accept
                  </button>

                  <button
                    onClick={() => requestReview("rejected", item._id)}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Requests;
