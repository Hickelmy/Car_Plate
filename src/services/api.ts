import axios from "axios";

// Envia vídeo para o servidor
export const uploadVideoForPlateDetection = async (videoFile: File) => {
  const formData = new FormData();
  formData.append("video", videoFile);

  try {
    const response = await axios.post("http://127.0.0.1:5000/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar vídeo:", error);
    return { success: false, message: "Erro no upload do vídeo." };
  }
};

// Busca snapshots do servidor
export const fetchSnapshots = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:5000/snapshots");
    return response.data.snapshots.map((snapshot: string, index: number) => ({
      plate: `Placa ${index + 1}`,
      snapshot,
    }));
  } catch (error) {
    console.error("Erro ao buscar snapshots:", error);
    return [];
  }
};