import React from "react";
import { Location } from "../Location/Location";
import { Current } from "../Current/Current";
import "./style.css";
import { ForecastContent } from "../ForecastContent/ForecastContent";

export const LocationCurrent = (props: any) => {
  return (
    <div className="location-current">
      {props.result?.location && <Location result={props.result} />}
      <div className="row" style={{ width: "100%" }}>
        {props.result?.current && <Current result={props.result} />}
        <hr />
        {!props.forecastData?.forecast && <p className="loading-text">Carregando...</p>}
        {props.forecastData?.forecast && (
            <ForecastContent forecastData={props.forecastData} day={"0"} />
        )}
      </div>
    </div>
  );
};
