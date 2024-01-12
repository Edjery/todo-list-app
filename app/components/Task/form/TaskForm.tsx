import dummyDayInterval, { IDayInterval } from "@/app/data/dayInterval-data";
import { ITaskData } from "@/app/data/task-data";
import { ITaskListData } from "@/app/data/taskList-data";
import dummyTimeInterval, { ITimeInterval } from "@/app/data/timeInterval-data";
import {
  Box,
  Container,
  DialogContent,
  TextField,
  TextareaAutosize,
} from "@/app/lib/MUI-core-v4";
import addTaskSchema from "@/app/schemas/addTaskSchema";
import { createId } from "@paralleldrive/cuid2";
import { Field, Form, Formik } from "formik";
import { Dispatch, SetStateAction, useState } from "react";
import TaskButtonGroup from "../common/TaskButtonGroup";
import TaskFormFooter from "../common/TaskFormFooter";
import { ITaskForm } from "./ITaskForm";

const defaultScheduleValue = "Today";
const defaultPriorityValue = false;
const defaultTaskListChoice = "New List";
let currentTaskListChoice = defaultTaskListChoice;

const defaultTimeInterval = [
  { choice: "Daily", status: false },
  { choice: "Weekly", status: false },
  { choice: "Monthly", status: false },
  { choice: "Yearly", status: false },
];
const defualtDayInterval = [
  { choice: "Sunday", status: false },
  { choice: "Monday", status: false },
  { choice: "Tuesday", status: false },
  { choice: "Wednesday", status: false },
  { choice: "Thursday", status: false },
  { choice: "Friday", status: false },
  { choice: "Saturday", status: false },
];

const initialValues: ITaskForm = {
  taskName: "",
  taskDescription: "",
  schedule: defaultScheduleValue,
  dueDate: "",
  timeInterval: defaultTimeInterval,
  dayInterval: defualtDayInterval,
  priority: defaultPriorityValue,
  taskList: "",
  tags: "",
  edit: false,
};

// Function to compare two arrays of objects
const areArrayObjectsEqual = (
  firstArray: {
    choice: string;
    status: boolean;
  }[],
  secondArray: {
    choice: string;
    status: boolean;
  }[]
): boolean => {
  if (firstArray.length !== secondArray.length) {
    return false;
  }

  for (let i = 0; i < firstArray.length; i++) {
    if (!isObjectEqual(firstArray[i], secondArray[i])) {
      return false;
    }
  }

  return true;
};

// Function to compare two objects
const isObjectEqual = (
  firstObject: {
    choice: string;
    status: boolean;
  },
  secondObject: {
    choice: string;
    status: boolean;
  }
): boolean => {
  const firstKeys = Object.keys(firstObject) as Array<keyof typeof firstObject>;
  const secondKeys = Object.keys(secondObject) as Array<
    keyof typeof secondObject
  >;

  if (firstKeys.length !== secondKeys.length) {
    return false;
  }

  for (const key of firstKeys) {
    if (firstObject[key] !== secondObject[key]) {
      return false;
    }
  }

  return true;
};

interface Props {
  task_list_data: ITaskListData[];
  set_task_list_data: Dispatch<SetStateAction<ITaskListData[]>>;
  task_data: ITaskData[];
  set_task_data: Dispatch<SetStateAction<ITaskData[]>>;
  timeInterval_data: ITimeInterval[];
  set_timeInterval_data: Dispatch<SetStateAction<ITimeInterval[]>>;
  dayInterval_data: IDayInterval[];
  set_dayInterval_data: Dispatch<SetStateAction<IDayInterval[]>>;
  taskId?: string | undefined;
  onClose: () => void;
  onAlertOpen: () => void;
}

const TaskForm = ({
  task_list_data,
  set_task_list_data,
  task_data,
  set_task_data,
  timeInterval_data,
  set_timeInterval_data,
  dayInterval_data,
  set_dayInterval_data,
  taskId,
  onClose,
  onAlertOpen,
}: Props) => {
  const taskList = task_list_data.map((item) => item.taskListName);
  const taskToFind = task_data.find((task) => task.taskId === taskId);
  const submitButton = taskId ? "Edit Task" : "Add Task";
  const currentTimeInterval = timeInterval_data.find(
    (timeInterval) => timeInterval.taskId === taskId
  );
  const currentDayInterval = dayInterval_data.find(
    (dayInterval) => dayInterval.taskId === taskId
  );

  if (taskToFind) {
    const { taskName, taskDescription, dueDate, priority, taskListId } =
      taskToFind;
    const currentTaskListValue = task_list_data.find(
      (list) => list.taskListId === taskListId
    );

    initialValues.edit = true;
    initialValues.taskName = taskName;
    initialValues.taskDescription = taskDescription;
    initialValues.dueDate = dueDate;
    initialValues.priority = priority;
    initialValues.taskList =
      currentTaskListValue?.taskListName || defaultTaskListChoice;
    currentTaskListChoice = initialValues.taskList;
    initialValues.timeInterval = [
      {
        choice: "Daily",
        status:
          currentTimeInterval?.daily !== undefined
            ? currentTimeInterval?.daily
            : false,
      },
      {
        choice: "Weekly",
        status:
          currentTimeInterval?.weekly !== undefined
            ? currentTimeInterval?.weekly
            : false,
      },
      {
        choice: "Monthly",
        status:
          currentTimeInterval?.monthly !== undefined
            ? currentTimeInterval?.monthly
            : false,
      },
      {
        choice: "Yearly",
        status:
          currentTimeInterval?.yearly !== undefined
            ? currentTimeInterval?.yearly
            : false,
      },
    ];
    initialValues.dayInterval = [
      {
        choice: "Sunday",
        status:
          currentDayInterval?.sunday !== undefined
            ? currentDayInterval?.sunday
            : false,
      },
      {
        choice: "Monday",
        status:
          currentDayInterval?.monday !== undefined
            ? currentDayInterval?.monday
            : false,
      },
      {
        choice: "Tuesday",
        status:
          currentDayInterval?.tuesday !== undefined
            ? currentDayInterval?.tuesday
            : false,
      },
      {
        choice: "Wednesday",
        status:
          currentDayInterval?.wednesday !== undefined
            ? currentDayInterval?.wednesday
            : false,
      },
      {
        choice: "Thursday",
        status:
          currentDayInterval?.thursday !== undefined
            ? currentDayInterval?.thursday
            : false,
      },
      {
        choice: "Friday",
        status:
          currentDayInterval?.friday !== undefined
            ? currentDayInterval?.friday
            : false,
      },
      {
        choice: "Saturday",
        status:
          currentDayInterval?.saturday !== undefined
            ? currentDayInterval?.saturday
            : false,
      },
    ];

    const sameTimeInterval = areArrayObjectsEqual(
      initialValues.timeInterval,
      defaultTimeInterval
    );
    const sameDayInterval = areArrayObjectsEqual(
      initialValues.dayInterval,
      defualtDayInterval
    );

    const defaultIntervals = sameTimeInterval && sameDayInterval;

    if (defaultIntervals && initialValues.taskList === defaultScheduleValue) {
      initialValues.schedule = defaultScheduleValue;
    } else if (
      !defaultIntervals ||
      initialValues.taskList !== defaultScheduleValue
    ) {
      initialValues.schedule = "Custom";
    }
  } else {
    initialValues.edit = false;
    initialValues.taskName = "";
    initialValues.taskDescription = "";
    initialValues.dueDate = "";
    initialValues.priority = defaultPriorityValue;
    initialValues.taskList = defaultTaskListChoice;

    initialValues.timeInterval = defaultTimeInterval;
    initialValues.dayInterval = defualtDayInterval;
    initialValues.schedule = defaultScheduleValue;
  }

  const [scheduleValue, setScheduleValue] = useState<string>(
    initialValues.schedule
  );

  const handleValuesDistribution = (values: ITaskForm): void => {
    let taskListId: string;

    if (values.schedule === "Today") {
      values.taskList = "Today";
    }
    if (values.schedule === "Date") {
      values.taskList = "Unsorted";
    }

    // new task list
    if (!taskList.includes(values.taskList)) {
      const newTaskList: ITaskListData = {
        taskListId: createId(),
        taskListName: values.taskList,
      };
      taskListId = newTaskList.taskListId;
      set_task_list_data([...task_list_data, newTaskList]);
    }
    // existing task list
    else {
      const findTaskList = task_list_data.find(
        (item) => item.taskListName === values.taskList
      )?.taskListId;
      taskListId = findTaskList === undefined ? createId() : findTaskList;
    }

    // generating new task row
    const newTask: ITaskData = {
      taskId: createId(),
      taskName: values.taskName,
      taskDescription: values.taskDescription,
      dueDate: values.dueDate,
      priority: values.priority,
      status: false,
      taskListId: taskListId,
    };

    // generating new timeInterval row
    const newTimeInterval: ITimeInterval = {
      timeIntervalId: createId(),
      daily: values.timeInterval[0].status,
      weekly: values.timeInterval[1].status,
      monthly: values.timeInterval[2].status,
      yearly: values.timeInterval[3].status,
      taskId: newTask.taskId,
    };

    // generating new dayInterval row
    const newDayInterval: IDayInterval = {
      dayIntervalValId: createId(),
      sunday: values.dayInterval[0].status,
      monday: values.dayInterval[1].status,
      tuesday: values.dayInterval[2].status,
      wednesday: values.dayInterval[3].status,
      thursday: values.dayInterval[4].status,
      friday: values.dayInterval[5].status,
      saturday: values.dayInterval[6].status,
      taskId: newTask.taskId,
    };

    // if existing task
    if (values.edit) {
      const taskIndex = task_data.findIndex((item) => item.taskId === taskId);
      const timeIntervalIndex = timeInterval_data.findIndex(
        (item) => item.taskId === taskId
      );
      const dayIntervalIndex = dayInterval_data.findIndex(
        (item) => item.taskId === taskId
      );

      if (taskIndex !== -1) {
        // setting task
        newTask.taskId = task_data[taskIndex].taskId;
        task_data[taskIndex] = newTask;
        set_task_data([...task_data]);

        if (values.schedule !== "Today") {
          // creating intervals
          // setting time interval
          newTimeInterval.taskId = timeInterval_data[timeIntervalIndex].taskId;
          newTimeInterval.timeIntervalId =
            timeInterval_data[timeIntervalIndex].timeIntervalId;
          timeInterval_data[timeIntervalIndex] = newTimeInterval;
          set_timeInterval_data([...timeInterval_data]);

          // setting day interval
          newDayInterval.taskId = dayInterval_data[dayIntervalIndex].taskId;
          newDayInterval.dayIntervalValId =
            dayInterval_data[dayIntervalIndex].dayIntervalValId;
          dayInterval_data[dayIntervalIndex] = newDayInterval;
          set_dayInterval_data([...dayInterval_data]);
        } else {
          // removing intervals
          if (timeIntervalIndex !== -1 && dayIntervalIndex !== -1) {
            // setting time interval
            newTimeInterval.taskId =
              timeInterval_data[timeIntervalIndex].taskId;
            const removeTimeInterval = timeInterval_data.filter(
              (item) => item.taskId !== newTimeInterval.taskId
            );
            set_timeInterval_data([...removeTimeInterval]);

            // setting day interval
            newDayInterval.taskId = dayInterval_data[dayIntervalIndex].taskId;
            const removeDayInterval = dayInterval_data.filter(
              (item) => item.taskId !== newDayInterval.taskId
            );
            set_dayInterval_data([...removeDayInterval]);
          }
        }
      } else {
        console.error(`Task with taskId ${newTask.taskId} not found.`);
      }
      // new task
    } else {
      set_timeInterval_data([...timeInterval_data, newTimeInterval]);
      set_dayInterval_data([...dayInterval_data, newDayInterval]);
      set_task_data([...task_data, newTask]);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={addTaskSchema}
      onSubmit={(values) => {
        console.log("values:", values);
        handleValuesDistribution(values);
        onClose();
        onAlertOpen();
      }}
    >
      {({ setFieldValue, isSubmitting, errors, touched, values }) => (
        <Form>
          <DialogContent>
            <Container maxWidth="md" className="p-4">
              <Box className="mt-2">
                <Field
                  type="text"
                  name="taskName"
                  placeholder="Task Name"
                  as={TextField}
                  fullWidth
                  error={errors.taskName && touched.taskName ? true : false}
                  helperText={
                    errors.taskName && touched.taskName ? errors.taskName : ""
                  }
                />
              </Box>
              <Box className="mt-2">
                <Field
                  name="taskDescription"
                  placeholder="Task Description (Optional)"
                  as={TextareaAutosize}
                  className="size-full"
                />
              </Box>

              <TaskButtonGroup
                scheduleValue={scheduleValue}
                setScheduleValue={setScheduleValue}
                setFieldValue={setFieldValue}
                values={values}
              />

              <Box className="mt-2">
                <Field
                  name="tags"
                  placeholder="#Tags (Optional)"
                  as={TextareaAutosize}
                  className="size-full"
                />
              </Box>
            </Container>
          </DialogContent>

          <TaskFormFooter
            onClose={onClose}
            scheduleValue={scheduleValue}
            setFieldValue={setFieldValue}
            isSubmitting={isSubmitting}
            submitButton={submitButton}
            currentTaskListChoice={currentTaskListChoice}
            defaultTaskListChoice={defaultTaskListChoice}
            tasklistChoiceValue={values.taskList}
            taskList={taskList}
          />
        </Form>
      )}
    </Formik>
  );
};

export default TaskForm;
