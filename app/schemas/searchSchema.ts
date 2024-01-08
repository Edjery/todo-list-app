import * as yup from "yup";

const searchSchema = yup.object({
  search: yup.string(),
});

export default searchSchema;
