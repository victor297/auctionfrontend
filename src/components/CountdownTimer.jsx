import React, { useState, useEffect } from "react";

const CountdownTimer = () => {
  const [remainingTime, setRemainingTime] = useState("");

  useEffect(() => {
    const targetTime = new Date();
    const currentTime = new Date();
    const currentHour = currentTime.getHours();

    if (currentHour >= 22) {
      // Set the target time to 22:00:00 of the next day
      targetTime.setDate(targetTime.getDate() + 1);
    }

    targetTime.setHours(8); // Set the target time to 18:00:00
    targetTime.setMinutes(0);
    targetTime.setSeconds(0);

    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const difference = targetTime - currentTime;

      if (difference <= 0) {
        // Time has reached or passed the target time
        setRemainingTime("Time is up!");
        clearInterval(intervalId);
      } else {
        // Calculate remaining time
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor(
          (difference % (1000 * 60 * 60)) / (1000 * 60)
        );
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        // Format remaining time
        const formattedTime = `${days}d ${hours}h ${minutes}m ${seconds}s`;
        setRemainingTime(formattedTime);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <strong className='text-success'>{remainingTime}</strong>;
};

export default CountdownTimer;
