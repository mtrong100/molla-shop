import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CategoryStatistic = ({ results = [] }) => {
  const getCategoryCounts = () => {
    const categoryCounts = {
      laptop: 0,
      smartphone: 0,
      tablet: 0,
      mouse: 0,
      keyboard: 0,
    };

    results.forEach((item) => {
      categoryCounts[item.category] += 1;
    });

    return categoryCounts;
  };

  const data = Object.entries(getCategoryCounts()).map(([category, count]) => ({
    category,
    count,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <XAxis dataKey="category" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CategoryStatistic;
