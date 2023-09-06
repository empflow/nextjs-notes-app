import { useEffect, useState } from "react";

interface TProps {
  isRunningInitially?: boolean;
  intervalMs?: number;
}

export default function useTimer({
  isRunningInitially: runningInitially = true,
  intervalMs = 10,
}: TProps = {}) {
  const [isRunning, setIsRunning] = useState(runningInitially);
  const [timeElapsed, setTimeElapsed] = useState(0);

  function reset() {
    setTimeElapsed(0);
  }

  function pause() {
    setIsRunning(false);
  }

  function stop() {
    setIsRunning(false);
    setTimeElapsed(0);
  }

  function resume() {
    setIsRunning(true);
  }

  function restart() {
    setIsRunning(true);
    setTimeElapsed(0);
  }

  useEffect(() => {
    const timer = setInterval(() => {
      if (!isRunning) return;
      setTimeElapsed((prev) => (prev += intervalMs));
    }, intervalMs);

    return () => clearInterval(timer);
  }, [isRunning]);

  return { reset, pause, stop, resume, restart, timeElapsed, isRunning };
}
