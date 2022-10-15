import React from 'react';
import { useTimer } from 'react-timer-hook';

export const getExpiryTime = (millisecondsToLast: number) => {
  const time = new Date();
  time.setMilliseconds(time.getMilliseconds() + millisecondsToLast);
  return time;
};

export function Timer({ timeToLast }: any) {
  const { seconds, minutes, isRunning, start, pause, resume, restart } = useTimer({
    expiryTimestamp: timeToLast,
    onExpire: () => console.warn('onExpire called'),
  });

  return (
    <div>
      <div style={{ fontSize: '100px' }}>
        <span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <span className="isolate inline-flex rounded-md shadow-sm">
        <button
          onClick={start}
          type="button"
          className="relative inline-flex items-center rounded-l-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          Start
        </button>
        <button
          onClick={pause}
          type="button"
          className="relative -ml-px inline-flex items-center border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          Pause
        </button>
        <button
          onClick={resume}
          type="button"
          className="relative -ml-px inline-flex items-center rounded-r-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
        >
          Resume
        </button>
      </span>
      {/* <button
        onClick={() => {
          // Restarts to 5 minutes timer
          const time = new Date();
          time.setSeconds(time.getSeconds() + 300);
          restart(time);
        }}
      >
        Restart
      </button> */}
    </div>
  );
}
