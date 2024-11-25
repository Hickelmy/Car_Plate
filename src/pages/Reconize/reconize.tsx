import React, { useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Box, Typography, CircularProgress } from '@mui/material';
import Webcam from 'react-webcam';
import axios from 'axios';

const Recognize: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [useWebcam, setUseWebcam] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [responseMessage, setResponseMessage] = useState<string | null>(null);
  const [confidence, setConfidence] = useState<number | null>(null);
  const [faceImageBase64, setFaceImageBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const webcamRef = React.useRef<Webcam>(null);

  const handleOpenDialog = () => {
    setResponseMessage(null);
    setConfidence(null);
    setFaceImageBase64(null);
    setLoading(false);
    setOpen(true);
  };

  const handleCloseDialog = () => setOpen(false);

  const handleCapture = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImage(imageSrc);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendImage = async () => {
    if (image) {
      setLoading(true);
      try {
        const response = await axios.post(
          'http://localhost:5050/recognize',
          { file: image },
          { headers: { 'Content-Type': 'application/json' } }
        );

        const { message, confidence, face_image_base64 } = response.data;

        setResponseMessage(message || 'Reconhecimento bem-sucedido!');
        setConfidence(confidence || null);
        setFaceImageBase64(face_image_base64 || null);
      } catch (error: any) {
        const errorMessage = error.response?.data?.error || 'Erro no reconhecimento.';
        setResponseMessage(errorMessage);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Capturar/Enviar Imagem
      </Button>

      <Dialog open={open} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Capturar ou Enviar Imagem</DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            <Button variant="outlined" onClick={() => setUseWebcam((prev) => !prev)}>
              {useWebcam ? 'Usar Upload de Arquivo' : 'Usar Webcam'}
            </Button>

            {useWebcam ? (
              <>
                <Webcam
                  audio={false}
                  ref={webcamRef}
                  screenshotFormat="image/jpeg"
                  style={{ width: '100%', borderRadius: '8px' }}
                />
                <Button variant="contained" color="secondary" onClick={handleCapture}>
                  Capturar Imagem
                </Button>
              </>
            ) : (
              <TextField
                type="file"
                inputProps={{ accept: 'image/*' }}
                onChange={handleFileUpload}
              />
            )}

            {image && (
              <img
                src={image}
                alt="Preview"
                style={{ marginTop: '10px', width: '100%', borderRadius: '8px' }}
              />
            )}

            {loading && <CircularProgress style={{ marginTop: '20px' }} />}

            {!loading && responseMessage && (
              <Box textAlign="center" marginTop={2}>
                <Typography variant="h6" color="primary">
                  {responseMessage}
                </Typography>
                {confidence !== null && (
                  <Typography variant="body1">Confiança: {confidence.toFixed(2)}</Typography>
                )}
                {faceImageBase64 && (
                  <img
                    src={`data:image/jpeg;base64,${faceImageBase64}`}
                    alt="Face reconhecida"
                    style={{ marginTop: '10px', width: '100%', borderRadius: '8px' }}
                  />
                )}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSendImage}
            disabled={!image || loading}
          >
            Enviar Imagem
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Recognize;
