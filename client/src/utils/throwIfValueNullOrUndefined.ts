interface IOpts {
  errMsg?: string;
}
export default function throwIfValueNullOrUndefined(val: any, opts?: IOpts) {
  const defaultErrMsg = "Value must not be null or undefined";
  const { errMsg = defaultErrMsg } = opts ?? {};

  if (val === null || val === undefined) {
    throw new Error(errMsg);
  }
}
