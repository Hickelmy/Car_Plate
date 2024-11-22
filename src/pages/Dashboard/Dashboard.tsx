import React from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Mock Data
const barChartData = [
  { month: "Jan", completed: 120 },
  { month: "Feb", completed: 150 },
  { month: "Mar", completed: 200 },
  { month: "Apr", completed: 170 },
  { month: "May", completed: 250 },
  { month: "Jun", completed: 300 },
  { month: "Jul", completed: 280 },
  { month: "Aug", completed: 220 },
  { month: "Sep", completed: 260 },
  { month: "Oct", completed: 300 },
  { month: "Nov", completed: 310 },
  { month: "Dec", completed: 400 },
];

const lineChartData = [
  { month: "Jan", revenue: 3000 },
  { month: "Feb", revenue: 4500 },
  { month: "Mar", revenue: 2000 },
  { month: "Apr", revenue: 3500 },
  { month: "May", revenue: 5000 },
  { month: "Jun", revenue: 6000 },
  { month: "Jul", revenue: 5800 },
  { month: "Aug", revenue: 4000 },
  { month: "Sep", revenue: 5200 },
  { month: "Oct", revenue: 6000 },
  { month: "Nov", revenue: 6200 },
  { month: "Dec", revenue: 7000 },
];

const Dashboard: React.FC = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      {/* Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Total Projects
              </Typography>
              <Typography variant="h4">10,724</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Completed Projects
              </Typography>
              <Typography variant="h4">9,801</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" color="textSecondary">
                Running Projects
              </Typography>
              <Typography variant="h4">923</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} mt={2}>
        {/* Bar Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Projects Completed by Month
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="completed" fill="#4c5df3" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Line Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Revenue Over Months
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="revenue" stroke="#82ca9d" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
