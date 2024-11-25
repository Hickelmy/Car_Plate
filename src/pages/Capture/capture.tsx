import React, { useRef, useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import { useDropzone } from "react-dropzone";
import Webcam from "react-webcam";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

const Capture: React.FC = () => {
  // Estados para armazenar os dados do formulário
  const [nome, setNome] = useState("");
  const [matricula, setMatricula] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [placaCarro, setPlacaCarro] = useState("");
  const [nomeCarro, setNomeCarro] = useState("");
  const [tipoCarro, setTipoCarro] = useState("");
  const [corCarro, setCorCarro] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
    setImage(null);
    setMessage(null);
    setError(null);
  };

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setError(null);
      };
      reader.readAsDataURL(file);
    } else {
      setError("Erro ao carregar o arquivo. Tente novamente.");
    }
  };

  const captureFromWebcam = () => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      setImage(screenshot);
      setError(null);
    } else {
      setError("Erro ao capturar imagem da webcam.");
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError("Por favor, carregue ou capture uma imagem antes de enviar.");
      return;
    }

    if (!nome) {
      setError("Por favor, insira um nome antes de enviar.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5050/upload",
        { file: image, nome },
        { headers: { "Content-Type": "application/json" } }
      );

      const { message } = response.data;
      setMessage(message || "Imagem enviada com sucesso!");
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao enviar a imagem.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setImage(null);
    setMessage(null);
    setError(null);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    maxFiles: 1,
  });

  const calcularIdade = (dataNascimento: string): number => {
    const anoAtual = new Date().getFullYear();
    const anoNascimento = new Date(dataNascimento).getFullYear();
    return anoAtual - anoNascimento;
  };

  const handleSubmit = () => {
    const idade = calcularIdade(dataNascimento);
    // Aqui você pode enviar os dados para o backend ou realizar qualquer ação necessária
    console.log({
      nome,
      matricula,
      idade,
      telefone,
      email,
      empresa,
      placaCarro,
      nomeCarro,
      tipoCarro,
      corCarro,
    });
  };

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Captura de Dados
      </Typography>

      {/* Tabs para escolher entre Dropzone e Webcam */}
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        textColor="primary"
        indicatorColor="primary"
        centered
        sx={{ marginTop: 4 }}
      >
        <Tab label="Upload" />
        <Tab label="Webcam" />
      </Tabs>

      {/* Conteúdo da Aba: Upload via Dropzone */}
      {tabValue === 0 && !image && (
        <Box
          {...getRootProps()}
          sx={{
            border: "2px dashed #91e4c6",
            borderRadius: "12px",
            padding: "20px",
            textAlign: "center",
            backgroundColor: "#ffffff",
            transition: "0.3s ease",
            cursor: "pointer",
            width: "80%",
            maxWidth: "500px",
            margin: "auto",
            mt: 3,
          }}
        >
          <input {...getInputProps()} />
          <Typography variant="h6" color="textSecondary">
            Arraste uma imagem ou clique para carregar
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Suporta formatos: PNG, JPG, JPEG
          </Typography>
        </Box>
      )}

      {/* Conteúdo da Aba: Webcam */}
      {tabValue === 1 && !image && (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          mt={2}
        >
          <Webcam
            ref={webcamRef}
            audio={false}
            screenshotFormat="image/jpeg"
            style={{
              width: "100%",
              maxWidth: "400px",
              borderRadius: "8px",
              border: "2px solid #91e4c6",
              marginBottom: "16px",
            }}
          />
          <Button
            variant="contained"
            color="secondary"
            onClick={captureFromWebcam}
          >
            Capturar Imagem
          </Button>
        </Box>
      )}

      {/* Grid de exibição da Imagem e Dados */}
      {image && (
        <Grid container spacing={2} mt={3}>
          {/* Coluna Esquerda: Imagem */}
          <Grid item xs={12} md={12}>
            <Box textAlign="center" position="relative">
              <Typography variant="body1">Pré-visualização:</Typography>
              <img
                src={image}
                alt="Preview"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  marginTop: "10px",
                  borderRadius: "8px",
                  border: "2px solid #91e4c6",
                }}
              />
              <IconButton
                onClick={handleClear}
                sx={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  color: "red",
                  backgroundColor: "#ffffff",
                  "&:hover": { backgroundColor: "#ffcccc" },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      )}

      {/* Loader */}
      {loading && <CircularProgress sx={{ mt: 3 }} />}

      {/* Mensagens */}
      {message && (
        <Alert severity="success" sx={{ mt: 3 }}>
          {message}
        </Alert>
      )}
      {error && (
        <Alert severity="error" sx={{ mt: 3 }}>
          {error}
        </Alert>
      )}

      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <Grid container spacing={2} style={{ marginTop: 6 }}>
          {/* Coluna para dados pessoais */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Dados Pessoais
            </Typography>
            <TextField
              label="Nome *"
              variant="outlined"
              fullWidth
              margin="normal"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <TextField
              label="Matrícula *"
              variant="outlined"
              fullWidth
              margin="normal"
              value={matricula}
              onChange={(e) => setMatricula(e.target.value)}
              required
            />
            <TextField
              label="Data de Nascimento *"
              type="date"
              variant="outlined"
              fullWidth
              margin="normal"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              InputLabelProps={{ shrink: true }}
              required
            />
            <TextField
              label="Telefone"
              variant="outlined"
              fullWidth
              margin="normal"
              value={telefone}
              onChange={(e) => setTelefone(e.target.value)}
            />
            <TextField
              label="Email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Empresa"
              variant="outlined"
              fullWidth
              margin="normal"
              value={empresa}
              onChange={(e) => setEmpresa(e.target.value)}
            />
          </Grid>

          {/* Coluna para dados do automóvel */}
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Dados do Automóvel
            </Typography>
            <TextField
              label="Placa do Carro"
              variant="outlined"
              fullWidth
              margin="normal"
              value={placaCarro}
              onChange={(e) => setPlacaCarro(e.target.value)}
            />
            <TextField
              label="Nome do Carro"
              variant="outlined"
              fullWidth
              margin="normal"
              value={nomeCarro}
              onChange={(e) => setNomeCarro(e.target.value)}
            />
            <TextField
              label="Tipo de Carro"
              variant="outlined"
              fullWidth
              margin="normal"
              value={tipoCarro}
              onChange={(e) => setTipoCarro(e.target.value)}
            />
            <TextField
              label="Cor do Carro"
              variant="outlined"
              fullWidth
              margin="normal"
              value={corCarro}
              onChange={(e) => setCorCarro(e.target.value)}
            />
          </Grid>
        </Grid>
        <Box mt={3}>
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default Capture;
