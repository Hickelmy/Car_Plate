import { LineChart, Line, CartesianGrid, XAxis, YAxis } from "recharts";

const data = [
  { name: "Jan", revenue: 3000 },
  { name: "Feb", revenue: 4500 },
  { name: "Mar", revenue: 2000 },
];

const ChartContainer: React.FC = () => (
  <div>
    <h2>Revenue Chart</h2>
    <LineChart width={400} height={200} data={data}>
      <Line type="monotone" dataKey="revenue" stroke="#4c5df3" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="name" />
      <YAxis />
    </LineChart>
  </div>
);

export default ChartContainer;
