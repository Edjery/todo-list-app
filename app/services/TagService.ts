import { ITag } from "../data/tagData";

class TagService {
  tags: ITag[];

  constructor() {
    this.tags = [
      { id: "0", name: "mail", taskId: "0" },
      { id: "1", name: "message", taskId: "1" },
    ];
  }

  getAll(): ITag[] {
    return this.tags;
  }

  get(tagId: string): ITag | undefined {
    return this.tags.find((tag) => tag.id === tagId);
  }

  create(newTag: ITag): ITag {
    this.tags.push(newTag);
    return newTag;
  }

  update(tagId: string, updatedTag: ITag): ITag | null {
    const index = this.tags.findIndex((tag) => tag.id === tagId);
    if (index !== -1) {
      this.tags[index] = { ...this.tags[index], ...updatedTag };
      return this.tags[index];
    }
    return null; // Tag not found
  }

  remove(tagId: string) {
    const index = this.tags.findIndex((tag) => tag.id === tagId);
    if (index !== -1) {
      const removedTagList = this.tags.splice(index, 1)[0];
      return removedTagList; // Successfully removed
    }
  }
}

const tagService = new TagService();
export default tagService;
