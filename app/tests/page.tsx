"use client";

import ITaskList from "@/app/services/Interfaces/ITaskList";
import taskListService from "@/app/services/TaskListSevice";
import { useEffect, useState } from "react";
import { Box, Container, Typography } from "../lib/MUI-core-v4";
import taskService from "../services/TaskService";

const TaskList = () => {
  //   const [data, setData] = useState<ITaskList[]>([]);
  const [data, setData] = useState<ITaskList | null>();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedData = await taskListService.remove(25);
        setData(fetchedData);
        console.log(fetchedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [data]);

  return (
    <Container maxWidth="sm" className="mt-10">
      {/* {data.map((key) => (
        <Box key={key.id} className="mt-5">
          <Box className="flex justify-between items-center">
            <Typography variant="h6">{key.name}</Typography>
          </Box>
        </Box>
      ))} */}
      <Typography>
        {data?.name === undefined ? undefined : data.name}
      </Typography>
    </Container>
  );
};

export default TaskList;
