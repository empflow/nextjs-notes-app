import { QueryOptions } from "mongoose";

const mongoUpdateOpts: QueryOptions = {
  new: true,
  runValidators: true,
};

export default mongoUpdateOpts;
