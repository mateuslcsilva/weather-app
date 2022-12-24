import React from "react";
import "./styles.css";

export const Location = (props: any) => {
  return (
    <>
      <div className="location row align-end">
        <h2>{props.result.location.name}</h2>
        {/* <h2>{', ' + result.location.region}</h2> */}
        <h2>{", " + props.result.location.country}</h2>
        <p>{`${props.result.location.localtime.substring(
          11,
          16
        )}, ${props.result.location.localtime
          .substring(0, 10)
          .replaceAll("-", "/")}`}</p>
      </div>
    </>
  );
};
