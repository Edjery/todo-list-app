export interface ITag {
  id: string;
  name: string;
  taskId: string;
}

const dummyTagData: ITag[] = [
  { id: "0", name: "mail", taskId: "0" },
  { id: "1", name: "message", taskId: "1" },
];

export default dummyTagData;
