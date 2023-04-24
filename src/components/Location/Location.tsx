import React from "react";
import "./styles.css";

export const Location = (props: any) => {
  return (
    <>
      <div className="location row align-end">
        <h2>{`${props.result.location.name},  ${props.result.location.country}`}</h2>
        <p>{`${props.result.location.localtime.substring(
          11,
          16
        )}, ${props.result.location.localtime
          .substring(0, 10) /* os 10 primeiros digitos representam data, de 11 a 16 representam o horário */
          .replaceAll("-", "/")}`}</p>
      </div>
    </>
  );
};
