/* eslint-disable react/prop-types */
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { useEffect, useState } from "react";
import { useIncomeByYearQuery } from "../../Redux/api/dashboardApi";

const IncomeBarChart = ({ selectedYear }) => {
  console.log(selectedYear);

  const { data: incomeData, refetch } = useIncomeByYearQuery(selectedYear);
  const income = incomeData?.data;
  console.log("income", income);
  const [chartData, setChartData] = useState([]);

  // Month mapping (1 -> January, 2 -> February, ...)
  const monthNames = [
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

  useEffect(() => {
    if (incomeData) {
      // Map the month number to month name in the data
      const updatedData = incomeData?.data?.map((item) => ({
        ...item,
        monthName: monthNames[item.month - 1],
      }));
      setChartData(updatedData || []);
    }
  }, [incomeData]);

  useEffect(() => {
    refetch();
  }, [selectedYear, refetch]);

  return (
    <div className="w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="monthName" /> {/* Use the new monthName field */}
          <YAxis />
          <Tooltip />
          <Bar
            name="Income"
            dataKey="totalIncome"
            fill="#2774c2"
            barSize={20}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeBarChart;
