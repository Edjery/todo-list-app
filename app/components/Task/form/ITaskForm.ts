import ObjectStatus from "../common/interface/IObjectStatus";

interface ITaskForm {
  id: number | undefined;
  name: string;
  description: string;
  schedule: string;
  dueAt: string;
  timeInterval: string;
  dayIntervalData: ObjectStatus[];
  priority: boolean;
  taskList: string;
  tags: string;
}
export default ITaskForm;
