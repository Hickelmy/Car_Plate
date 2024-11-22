import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Grid,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

// Tipagem para os dados do formulário
interface FormData {
  plate: string;
  owner: string;
  matricula: string;
  address: string;
  carType: string;
}

// Tipagem para os dados do carro retornados pela API
interface CarData {
  make: string;
  model: string;
  year: number;
  engine: string;
  power: string;
  image: string;
}

const PlatesRegister: React.FC = () => {
  // Estado do formulário
  const [formData, setFormData] = useState<FormData>({
    plate: "",
    owner: "",
    matricula: "",
    address: "",
    carType: "",
  });

  // Estado para consulta de tipo de carro
  const [isLoadingCar, setIsLoadingCar] = useState(false);
  const [carData, setCarData] = useState<CarData | null>(null);
  const [carError, setCarError] = useState(false);

  // Atualiza os valores do formulário
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Consulta a API para buscar informações do tipo de carro
  const handleCarSearch = async () => {
    if (!formData.carType) {
      alert("Digite o nome do carro para pesquisar!");
      return;
    }

    setIsLoadingCar(true);
    setCarError(false);

    try {
      const response = await axios.get(`https://car-api2.p.rapidapi.com/api/car`, {
        params: { query: formData.carType },
        headers: {
          "X-RapidAPI-Host": "car-api2.p.rapidapi.com",
          "X-RapidAPI-Key": process.env.REACT_APP_RAPIDAPI_KEY || "",
        },
      });

      const car = response.data.results?.[0];
      if (car) {
        setCarData({
          make: car.make,
          model: car.model,
          year: car.year,
          engine: car.engine,
          power: car.power,
          image: car.image_url || "https://via.placeholder.com/300",
        });
      } else {
        setCarData(null);
        setCarError(true);
      }
    } catch (error) {
      console.error("Erro ao buscar o carro:", error);
      setCarError(true);
      setCarData(null);
    } finally {
      setIsLoadingCar(false);
    }
  };

  // Submissão do formulário
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Formulário enviado:", formData);
    alert("Cadastro realizado com sucesso!");
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Cadastro de Placas
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          {/* Coluna Esquerda: Formulário */}
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Placa"
              name="plate"
              value={formData.plate}
              onChange={handleInputChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Dono"
              name="owner"
              value={formData.owner}
              onChange={handleInputChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Matrícula"
              name="matricula"
              value={formData.matricula}
              onChange={handleInputChange}
              required
              margin="normal"
            />
            <TextField
              fullWidth
              label="Endereço"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              margin="normal"
            />
            <Box display="flex" alignItems="center" gap={2}>
              <TextField
                fullWidth
                label="Tipo de Carro"
                name="carType"
                value={formData.carType}
                onChange={handleInputChange}
                required
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleCarSearch}
                disabled={isLoadingCar}
              >
                {isLoadingCar ? <CircularProgress size={20} /> : "Buscar"}
              </Button>
            </Box>
          </Grid>

          {/* Coluna Direita: Dados da API */}
          <Grid item xs={12} md={6}>
            {carData ? (
              <Card>
                <CardContent>
                  <Typography variant="h6">
                    {carData.make} {carData.model}
                  </Typography>
                  <Typography>Ano: {carData.year}</Typography>
                  <Typography>Motor: {carData.engine}</Typography>
                  <Typography>Potência: {carData.power}</Typography>
                  <Box mt={2}>
                    <img
                      src={carData.image}
                      alt={`${carData.make} ${carData.model}`}
                      style={{ width: "100%", borderRadius: "8px" }}
                    />
                  </Box>
                </CardContent>
              </Card>
            ) : carError ? (
              <Typography color="error">
                Não foi possível encontrar as especificações do carro.
              </Typography>
            ) : (
              <Typography color="textSecondary">
                Insira o nome do carro e clique em buscar para ver as informações.
              </Typography>
            )}
          </Grid>
        </Grid>
        <Box mt={3}>
          <Button variant="contained" color="success" type="submit">
            Cadastrar
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default PlatesRegister;
