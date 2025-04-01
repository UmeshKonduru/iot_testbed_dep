import React, { useEffect, useState } from "react";
import axios from "axios";

const NotificationPage = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Fetch notifications from the backend
        const fetchNotifications = async () => {
            try {
                const response = await axios.get("http://localhost:8000/api/auth/logout");
                setNotifications(response.data);
                console.log(response.data);
            } catch (error) {
                console.error("Error fetching notifications:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchNotifications();
    }, []);

    return (
        <div className="flex-[4_4_0] border-l border-r border-gray-700 min-h-screen">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
                <p className="font-bold">Course Information</p>
            </div>
            {loading ? (
                <div className="text-center p-4 font-bold">Loading...</div>
            ) : notifications.length === 0 ? (
                <div className="text-center p-4 font-bold">No Course to Show</div>
            ) : (
                <div className="p-4 space-y-4">
                    {notifications.map((notification, index) => (
                        <div
                            key={index}
                            className="border border-gray-300 rounded-lg p-4 flex justify-between items-center shadow-sm bg-white"
                        >
                            <div>
                                <p className="font-bold text-lg">{notification.course}</p>
                                <p className="text-gray-600">Instructor: {notification.instructor}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-gray-700 font-medium">{notification.status}</p>
                            </div>
                            <div>
                                <button className="bg-primary text-white py-2 px-6 rounded hover:bg-violet-600">
                                    {notification.action}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default NotificationPage;
