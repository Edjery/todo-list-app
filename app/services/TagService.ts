import ITag from "./Interfaces/ITag";
import axiosInstance from "./apiClient";

const API_ENDPOINT = "/tag";

class TagService {
  private tags: ITag[] = [];

  constructor() {
    this._loadData();
  }

  private async _loadData() {
    try {
      const response = await axiosInstance.get<ITag[]>(API_ENDPOINT);
      this.tags = response.data;
    } catch (error) {
      console.error("Error in loading data:", error);
    }
  }

  async getAll(): Promise<ITag[]> {
    const response = await axiosInstance.get<ITag[]>(API_ENDPOINT);
    return response.data;
  }

  get(tagId: number): ITag | undefined {
    return this.tags.find((tag) => tag.id === tagId);
  }

  getByTaskId(id: number): ITag | undefined {
    return this.tags.find((item) => item.taskId === id);
  }

  async create(newTag: ITag): Promise<ITag> {
    try {
      const response = await axiosInstance.post<ITag>(API_ENDPOINT, {
        name: newTag.name,
        taskId: newTag.taskId,
      });
      const newData: ITag = response.data;
      this.tags.push(newData);
      return newData;
    } catch (error) {
      console.error("Error in creating data:", error);
      throw error;
    }
  }

  async update(id: number, newTag: ITag): Promise<ITag | null> {
    try {
      const response = await axiosInstance.put<ITag>(`${API_ENDPOINT}/${id}`, {
        name: newTag.name,
        taskId: newTag.taskId,
      });
      if ((response.status = 200)) {
        const updatedData = response.data;
        const index = this.tags.findIndex((item) => item.id === id);
        if (index !== -1) {
          this.tags[index] = { ...updatedData };
        }
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

  async remove(id: number): Promise<ITag | null> {
    try {
      const response = await axiosInstance.delete(`${API_ENDPOINT}/${id}`);

      if ((response.status = 200)) {
        const deletedTaskList = response.data;
        this.tags = this.tags.filter((item) => item.id !== id);
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
