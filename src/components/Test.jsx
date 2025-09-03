import React, { useState } from "react";

const Test = () => {
  // Sample data structure matching your API response
  const [data, setData] = useState({
    message: "Data fetched Successfully",
    data: [
      {
        _id: "68a2bde2539b720f8d1c6a34",
        fromUserId: {
          age: 25,
          gender: "male",
          _id: "68a2bd8f539b720f8d1c6a2e",
          firstName: "Rahul",
          lastName: "Sri",
          skills: ["React", "Node.js", "javascript"],
          about: "Hi there I'm the Happiest in the world",
          photoUrl:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        },
        toUserId: "689d7b1df3a3e5dfd79f13d1",
        status: "interested",
        createdAt: "2025-08-18T05:45:06.180Z",
        updatedAt: "2025-08-18T05:45:06.180Z",
        __v: 0,
      },
      {
        _id: "68a2bde2539b720f8d1c6a35",
        fromUserId: {
          age: 28,
          gender: "female",
          _id: "68a2bd8f539b720f8d1c6a2f",
          firstName: "Priya",
          lastName: "Sharma",
          skills: ["Python", "Data Analysis", "Machine Learning"],
          about: "Data scientist with a passion for AI and innovation",
          photoUrl:
            "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        },
        toUserId: "689d7b1df3a3e5dfd79f13d1",
        status: "interested",
        createdAt: "2025-08-18T05:45:06.180Z",
        updatedAt: "2025-08-18T05:45:06.180Z",
        __v: 0,
      },
      {
        _id: "68a2bde2539b720f8d1c6a36",
        fromUserId: {
          age: 32,
          gender: "male",
          _id: "68a2bd8f539b720f8d1c6a30",
          firstName: "Amit",
          lastName: "Verma",
          skills: ["Java", "Spring Boot", "Cloud Computing"],
          about: "Backend developer with 8+ years of experience",
          photoUrl:
            "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
        },
        toUserId: "689d7b1df3a3e5dfd79f13d1",
        status: "interested",
        createdAt: "2025-08-18T05:45:06.180Z",
        updatedAt: "2025-08-18T05:45:06.180Z",
        __v: 0,
      },
    ],
  });
  console.log(setData);

  // Handle accept action
  const handleAccept = (userId) => {
    console.log("Accepted user with ID:", userId);
    // Add your accept logic here
  };

  // Handle reject action
  const handleReject = (userId) => {
    console.log("Rejected user with ID:", userId);
    // Add your reject logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-pink-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-pink-800 mb-2">
            Connection Requests
          </h1>
          <p className="text-pink-600">
            You have {data.data.length} pending requests
          </p>
        </div>

        <div className="space-y-6">
          {data.data.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg"
            >
              <div className="flex flex-col md:flex-row">
                {/* User Image */}
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

                {/* User Info */}
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

                {/* Action Buttons */}
                <div className="md:w-1/4 p-4 flex flex-col justify-center space-y-4">
                  <button
                    onClick={() => handleAccept(item.fromUserId._id)}
                    className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-xl shadow-sm text-base font-medium text-white bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                    Accept
                  </button>

                  <button
                    onClick={() => handleReject(item.fromUserId._id)}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-xl shadow-sm text-base font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500"
                  >
                    <svg
                      className="w-5 h-5 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
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

export default Test;
