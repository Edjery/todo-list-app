export interface ITagData {
  tagId: string;
  tagName: string;
  taskId: string;
}

const dummyTagData: ITagData[] = [
  { tagId: "0", tagName: "mail", taskId: "0" },
  { tagId: "1", tagName: "message", taskId: "1" },
];

export default dummyTagData;
