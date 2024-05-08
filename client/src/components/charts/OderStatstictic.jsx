import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const monthsArray = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const OderStatstictic = ({ results = [] }) => {
  const countUsersByMonth = (results) => {
    const userCountsByMonth = {};
    results.forEach((user) => {
      const createdAt = new Date(user.createdAt);
      const month = createdAt.getMonth();
      if (!userCountsByMonth[month]) {
        userCountsByMonth[month] = 1;
      } else {
        userCountsByMonth[month]++;
      }
    });
    return userCountsByMonth;
  };

  const userCountsByMonth = countUsersByMonth(results);

  const chartData = Array.from({ length: 12 }, (_, i) => ({
    month: monthsArray[i],
    count: userCountsByMonth[i] || 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default OderStatstictic;
