import React, { useEffect, useState } from "react";
import "./styles.css"

import Glider from "react-glider";
import "glider-js/glider.min.css";
import { daysOfWeek } from "../../utils/daysOfWeek";

export const HourlyCarousel = (props: any) => {
  interface hourInfoType {
    time: string;
    tempC: number;
    chanceOfRain: number;
    precipMm: number;
    willItRain: number;
    condition: any;
  }
  
  const initialState :hourInfoType[] = []

  const [hours, setHours] = useState<hourInfoType[]>(initialState);

  const getHourInfo = () => {
    setHours(initialState)
    props.forecastData &&
      props.forecastData.forecast.forecastday.forEach((day: any) => {
        day.hour.forEach((hour: any) => {
          let hourData = {
            time: hour.time,
            tempC: hour.temp_c,
            chanceOfRain: hour.chance_of_rain,
            precipMm: hour.precip_mm,
            willItRain: hour.will_it_rain,
            condition: hour.condition,
          };
          setHours((hours) => [...hours, hourData]);
        });
      });
  };

  useEffect(() => {
    getHourInfo();
    console.log(hours);
  }, [props.forecastData]);

  return (
    <Glider
      className="glider-container"
      hasArrows
      /* arrows={{
        prev: '#arrow-prev',
        next: '#arrow-next',
      }} */
      rewind
      draggable
      dragVelocity={1.2}
      scrollLock
      responsive={[
        {
          breakpoint: 775,
          settings: {
            slidesToShow: "auto",
            slidesToScroll: "auto",
            itemWidth: 150,
            duration: 0.25,
          },
        },
      ]}
    >
      {hours &&
        hours.map((hour: any) => {
          return (
            <div className="hour-info" key={hour.time}>
              <h4>{daysOfWeek[new Date(`${hour.time.substring(0, 10)}`).getDay() + 1]}</h4>
              <h5>{hour.time.substring(10)}</h5>
              <div className="justify-center">
                <img
                  src={`${hour.condition.icon
                    }`}
                  alt=""
                />
              </div>
              <p>{hour.chanceOfRain}%</p>
              <p>{hour.precipMm}mm</p>
            </div>
          );
        })}
    </Glider>
  );
};
