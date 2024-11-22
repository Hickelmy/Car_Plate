import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

interface CarDetailsProps {
  make: string;
  model: string;
  year: number;
  engine: string;
  power: string;
  image: string;
}

const CarDetails: React.FC<CarDetailsProps> = ({ make, model, year, engine, power, image }) => (
  <Card>
    <CardContent>
      <Typography variant="h6">
        {make} {model}
      </Typography>
      <Typography>Ano: {year}</Typography>
      <Typography>Motor: {engine}</Typography>
      <Typography>Potência: {power}</Typography>
      <Box mt={2}>
        <img src={image} alt={`${make} ${model}`} style={{ width: "100%", borderRadius: "8px" }} />
      </Box>
    </CardContent>
  </Card>
);

export default CarDetails;
