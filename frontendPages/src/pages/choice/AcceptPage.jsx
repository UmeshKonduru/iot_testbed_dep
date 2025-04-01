import { useState } from "react";

const AcceptPage = () => {
	const [notifications, setNotifications] = useState([
		{
			instructor: "John Doe",
			course: "Math 101",
			student: "Amar Gupta",
			state: "",
		},
		{
			instructor: "Johnny Doe",
			course: "CS 101",
			student: "Akbar Khan",
			state: "",
		},
		{
			instructor: "Johnny Doe",
			course: "CS 101",
			student: "Anthony Bonzalez",
			state: "",
		},
	]);

	const handleAction = (index, action) => {
		setNotifications((prev) =>
			prev.map((notification, i) =>
				i === index
					? { ...notification, state: action } // Update state for the specific notification
					: notification
			)
		);
	};

	return (
		<>
			<div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen">
				<div className="flex justify-between items-center p-4 border-b border-gray-700">
					<p className="font-bold">Course Information</p>
				</div>
				{notifications?.length === 0 && (
					<div className="text-center p-4 font-bold">No Course to Show</div>
				)}
				<div className="p-4 space-y-4">
					{notifications.map((notification, index) => (
						<div
							key={index}
							className="border border-gray-300 rounded-lg p-4 flex justify-between items-center shadow-sm bg-white"
						>
							<div>
								<p className="font-bold text-lg">{notification.course}</p>
								<p className="text-gray-600">
									Instructor: {notification.instructor}
								</p>
								<p className="text-gray-600">Student: {notification.student}</p>
							</div>
              <div>
								<p className="text-gray-700 font-medium">
									Status: {notification.state || "Pending"}
								</p>
							</div>
							<div className="flex gap-2">
								<button
									className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
									onClick={() => handleAction(index, "Accepted")}
								>
									Accept
								</button>
								<button
									className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
									onClick={() => handleAction(index, "Rejected")}
								>
									Reject
								</button>
							</div>
							
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default AcceptPage;
