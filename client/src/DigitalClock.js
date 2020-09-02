import React from "react";
const DigitalClock = props => {

  const time = new Date();
  const hh = time.getHours();
  const mm = time.getMinutes();
  const ss = time.getSeconds();
  const sendTime = hh + ":" + mm + ":" + ss;

  return (
    <>
      <div className="client-time"> Client_Time  {sendTime}</div>
    </>
  );
};

export default DigitalClock
