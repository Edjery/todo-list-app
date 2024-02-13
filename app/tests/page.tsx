"use client";

import { useEffect, useState } from "react";
import ITask from "../services/Interfaces/ITask";
import axiosInstance from "../services/apiClient";

const YourComponent = () => {
  const [data, setData] = useState<ITask[]>([]);
  const [loading, setLoading] = useState(true); // State to track loading status

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<ITask[]>("/task");
        setLoading(false); // Set loading to false after data is fetched
        setData(response.data);
        console.log("Data has been successfully fetched");
      } catch (error) {
        console.error("Error loading data:", error);
        setLoading(false); // Set loading to false in case of error
        throw error;
      }
    };

    fetchData();
  }, []);

  // Render loading screen if data is loading
  if (loading) {
    return (
      <div className="loading-screen">
        <p>Loading...</p>
      </div>
    );
  }

  // Render your component content once data is loaded
  return (
    <div className="your-component">
      {data.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
};

export default YourComponent;
