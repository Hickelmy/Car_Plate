import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  CircularProgress,
  Alert,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

interface User {
  name: string;
  images: string[]; // Lista de imagens em Base64
}

const UserGrid: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{
    type: "user" | "image";
    target: string | null;
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    setFilteredUsers(
      users.filter((user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, users]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5050/users");
      const fetchedUsers = Object.entries(response.data).map(
        ([name, images]) => ({
          name,
          images: images as string[],
        })
      );
      setUsers(fetchedUsers);
      setFilteredUsers(fetchedUsers);
      setLoading(false);
    } catch (err: any) {
      setError("Erro ao carregar usuários. Tente novamente.");
      setLoading(false);
    }
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setSelectedImages([]);
  };

  const handleBackClick = () => {
    setSelectedUser(null);
  };

  const handleDeleteConfirmation = (type: "user" | "image", target: string) => {
    setConfirmDelete({ type, target });
  };

  const handleCancelDelete = () => {
    setConfirmDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (confirmDelete) {
      const { type, target } = confirmDelete;
      try {
        if (type === "user" && target) {
          await axios.delete(`http://localhost:5050/delete_user/${target}`);
          setUsers(users.filter((user) => user.name !== target));
          setSelectedUser(null);
        } else if (type === "image" && selectedUser && target) {
          const imageName = target.split("/").pop() || "unknown";
          await axios.delete(
            `http://localhost:5050/delete_image/${selectedUser.name}/${imageName}`
          );
          setSelectedUser({
            ...selectedUser,
            images: selectedUser.images.filter((image) => image !== target),
          });
        }
      } catch (err: any) {
        setError("Erro ao deletar.");
      } finally {
        fetchUsers();
        setConfirmDelete(null);
      }
    }
  };

  const handleImageSelect = (image: string) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(selectedImages.filter((img) => img !== image));
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  const handleSelectAll = () => {
    if (selectedUser) {
      if (selectedImages.length === selectedUser.images.length) {
        setSelectedImages([]);
      } else {
        setSelectedImages([...selectedUser.images]);
      }
    }
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box padding={3}>
      <Typography variant="h4" gutterBottom>
        Usuários
      </Typography>
      <TextField
        label="Pesquisar Usuário"
        variant="outlined"
        fullWidth
        margin="normal"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />

      <AnimatePresence>
        {!selectedUser && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Grid container spacing={2}>
              {filteredUsers.map((user) => (
                <Grid item xs={12} sm={6} md={4} key={user.name}>
                  <Card
                    sx={{
                      cursor: "pointer",
                      "&:hover": { boxShadow: 6 },
                    }}
                    onClick={() => handleUserClick(user)}
                  >
                    <CardMedia
                      component="img"
                      height="140"
                      image={user.images[0]} // Mostra a primeira imagem como capa
                      alt={user.name}
                    />
                    <CardContent>
                      <Typography variant="h6">{user.name}</Typography>
                      <Typography variant="body2" color="textSecondary">
                        {user.images.length} imagens
                      </Typography>
                      <IconButton
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteConfirmation("user", user.name);
                        }}
                        sx={{ color: "red", float: "right" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        )}

        {selectedUser && (
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
          >
            <Box display="flex" alignItems="center" mb={2}>
              <IconButton onClick={handleBackClick}>
                <ArrowBackIcon />
              </IconButton>
              <Typography variant="h5" ml={1}>
                {selectedUser.name}
              </Typography>
              <Button
                variant="contained"
                color="error"
                onClick={() =>
                  handleDeleteConfirmation("user", selectedUser.name)
                }
                sx={{ marginLeft: "auto" }}
              >
                Deletar Usuário
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSelectAll}
                sx={{ marginLeft: 2 }}
              >
                {selectedImages.length === selectedUser.images.length
                  ? "Desmarcar Todos"
                  : "Selecionar Todos"}
              </Button>
              {selectedImages.length > 0 && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleConfirmDelete}
                  sx={{ marginLeft: 2 }}
                >
                  Deletar Selecionados
                </Button>
              )}
            </Box>

            <Grid container spacing={2}>
              {selectedUser.images.map((image, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      image={image}
                      alt={`Imagem ${index + 1}`}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Checkbox
                        checked={selectedImages.includes(image)}
                        onChange={() => handleImageSelect(image)}
                      />
                      <IconButton
                        onClick={() => handleDeleteConfirmation("image", image)}
                        sx={{ color: "red" }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dialog de confirmação */}
      {confirmDelete && (
        <Dialog open onClose={handleCancelDelete}>
          <DialogTitle>Confirmar Exclusão</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {confirmDelete.type === "user"
                ? "Tem certeza que deseja excluir este usuário e todas as suas imagens?"
                : "Tem certeza que deseja excluir esta imagem?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleConfirmDelete} color="error">
              Excluir
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Box>
  );
};

export default UserGrid;
