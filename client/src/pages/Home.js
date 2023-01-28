import React, { useState } from "react";
import BarChart from "../components/BarChart";
import { chart as chartjs } from 'chart.js'

const data = [
  {
    id: 1,
    subscriberGained: 4555,
    year: 2018,
    subscriberLost: 899,
  },
  {
    id: 2,
    subscriberGained: 3555,
    year: 2019,
    subscriberLost: 399,
  },
  {
    id: 3,
    subscriberGained: 21555,
    year: 2020,
    subscriberLost: 559,
  },
  {
    id: 4,
    subscriberGained: 20555,
    year: 2021,
    subscriberLost: 1339,
  },
  {
    id: 5,
    subscriberGained: 15555,
    year: 2022,
    subscriberLost: 2003,
  }
]

function Home() {

  const [userData, setUserData] = useState({
    labels: data.map((data) => data.year),
    datasets: [
      {
        label: "Users Gained",
        data: data.map((data) => data.subscriberGained),
        backgroundColor: [
          "rgba(75,192,192,1)",
          "#ecf0f1",
          "#50AF95",
          "#f3ba2f",
          "#2a71d0",
        ],
        borderColor: "black",
        borderWidth: 2,
      },
    ],
  });
  
  
  return (
    <BarChart chartData={userData} />
  );
}

export default Home;
