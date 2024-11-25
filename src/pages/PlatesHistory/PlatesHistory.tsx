import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import axios from "axios";

const PlatesHistory: React.FC = () => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // Lida com o upload do vídeo
  const handleVideoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setVideoFile(event.target.files[0]);
      setMessage(null);
    }
  };

  // Envia o vídeo ao servidor
  const handleVideoSubmit = async () => {
    if (!videoFile) {
      setMessage("Por favor, selecione um vídeo para enviar.");
      return;
    }

    setIsUploading(true);
    setMessage(null);

    const formData = new FormData();
    formData.append("video", videoFile);

    try {
      const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage(response.data.message || "Upload bem-sucedido.");
    } catch (error) {
      console.error("Erro ao enviar o vídeo:", error);
      setMessage("Erro ao enviar o vídeo. Por favor, tente novamente.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>
        Processamento de Placas em Tempo Real
      </Typography>

      {/* Upload de Vídeo */}
      <Box
        sx={{
          marginTop: 3,
          marginBottom: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" gutterBottom>
          Enviar Vídeo para Identificação de Placas
        </Typography>
        <TextField
          type="file"
          inputProps={{ accept: "video/*" }}
          onChange={handleVideoUpload}
          sx={{ marginBottom: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleVideoSubmit}
          disabled={isUploading}
        >
          {isUploading ? <CircularProgress size={20} /> : "Enviar Vídeo"}
        </Button>
        {message && (
          <Typography
            color={message.includes("Erro") ? "error" : "success"}
            sx={{ marginTop: 2 }}
          >
            {message}
          </Typography>
        )}
      </Box>

      {/* Exibição do Stream */}
      <Box sx={{ marginTop: 4, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          Vídeo Processado
        </Typography>
        <video
          style={{ width: "80%", borderRadius: "8px", border: "1px solid #ccc" }}
          src="http://127.0.0.1:5000/stream"
          controls
          autoPlay
        ></video>
      </Box>
    </Box>
  );
};

export default PlatesHistory;
