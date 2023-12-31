import { forwardRef } from "react";

// ref and {...restProps} should be on the element which will need to be dragged to resize whatever you're resizing

// here the parent is 1px wide but the draggable element inside it is 5px wide
// so this changes the layout by just 1 pixel but the draggable area is 5 pixels
const ResizeHandle = forwardRef<any, any>((props, ref) => {
  const { handleAxis, ...restProps } = props;
  return (
    <div className="relative flex w-[1px] border-light-3.5xl-gray dark:border-dark-4xl-gray md:border-r">
      <div
        className="absolute bottom-0 left-[-5px] top-0 w-[10px] hover:cursor-ew-resize"
        ref={ref}
        {...restProps}
      ></div>
    </div>
  );
});

export default ResizeHandle;
