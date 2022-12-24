import React from "react";
import './styles.css'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  export const HourlyChart = (props:any) => {

    let chartData = []
    for(let i in props.forecastData.forecast.forecastday[props.day].hour){
        chartData.push(props.forecastData.forecast.forecastday[props.day].hour[i].chance_of_rain)
    }
    console.log(chartData)

    const options = {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
          title: {
            display: false,
          },
        },
      };

      const labelsFunc = () => {
        let sla = []
        for(let i in props.forecastData.forecast.forecastday[props.day].hour){
            sla.push(i)
        }
        return sla
      }

      const labels = labelsFunc()

      const data = {
        labels,
        datasets: [
          {
            data: chartData,
            backgroundColor: 'rgba(33, 110, 211, 0.671)'
          }
        ]
      };

    return(
       <div className="chart">
        <h3 style={{textAlign: 'center'}}>Chance de Chuva</h3>
           <Bar options={options} data={data} />
       </div>
    )
  }