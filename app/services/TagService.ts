import ITag from "./Interfaces/ITag";
import axiosInstance from "./apiClient";

const endpoint = "/tag";

class TagService {
  tags: ITag[];

  constructor() {
    this.tags = [];
    this._loadData();
  }

  private async _loadData() {
    try {
      const response = await axiosInstance.get(endpoint);
      this.tags = response.data;
    } catch (error) {
      console.error("Error in loading data:", error);
    }
  }

  getAll(): ITag[] {
    return this.tags;
  }

  get(tagId: number): ITag | undefined {
    return this.tags.find((tag) => tag.id === tagId);
  }

  getByTaskId(taskId: number): ITag | undefined {
    return this.tags.find((tag) => tag.taskId === taskId);
  }

  async create(newTag: ITag): Promise<ITag> {
    try {
      const response = await axiosInstance.post(endpoint, {
        name: newTag.name,
        taskId: newTag.taskId,
      });
      const newData: ITag = response.data;
      await this._loadData();
      return newData;
    } catch (error) {
      console.error("Error in creating data:", error);
      throw error;
    }
  }

  async update(tagId: number, newTag: ITag): Promise<ITag | null> {
    try {
      const response = await axiosInstance.put(`${endpoint}/${tagId}`, {
        name: newTag.name,
        taskId: newTag.taskId,
      });
      if ((response.status = 200)) {
        const updatedData: ITag = response.data;
        await this._loadData();
        return updatedData;
      } else {
        console.error("Error: No data with that ID");
        return null;
      }
    } catch (error) {
      console.error("Error in updating data:", error);
      throw error;
    }
  }

  async remove(tagId: number) {
    try {
      const response = await axiosInstance.delete(`${endpoint}/${tagId}`);

      if ((response.status = 200)) {
        const deletedTaskList: ITag = response.data;
        await this._loadData();
        return deletedTaskList;
      } else {
        console.error("Error: No data with that ID");
        return null;
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

const tagService = new TagService();
export default tagService;
