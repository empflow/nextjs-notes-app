import { useState } from "react";

export default function useRerender() {
  const [rerenderState, setRerenderState] = useState(false);

  function rerender() {
    setRerenderState((prev) => !prev);
  }

  return rerender;
}
