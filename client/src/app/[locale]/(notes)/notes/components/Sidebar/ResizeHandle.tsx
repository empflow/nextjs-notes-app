import { forwardRef } from "react";

const ResizeHandle = forwardRef<any, any>((props, ref) => {
  const { handleAxis, ...restProps } = props;
  return (
    <div
      ref={ref}
      className="border-2 border-r border-light-3.5xl-gray hover:cursor-ew-resize dark:border-dark-4xl-gray"
      {...restProps}
    ></div>
  );
});

export default ResizeHandle;
