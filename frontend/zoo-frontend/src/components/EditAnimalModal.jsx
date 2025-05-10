import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box,
  Typography,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import api from '../services/api';

export default function EditAnimalModal({ animal, open, onClose, onUpdate }) {
  const [editedAnimal, setEditedAnimal] = useState(animal);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedAnimal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/Animais/${animal.id}`, editedAnimal);
      alert('Animal atualizado com sucesso!');
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar animal:', error);
      alert('Erro ao atualizar animal');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Animal</DialogTitle>
      <DialogContent>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="nome"
                label="Nome"
                value={editedAnimal.nome}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="especie"
                label="Espécie"
                value={editedAnimal.especie}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="descricao"
                label="Descrição"
                value={editedAnimal.descricao}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={3}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="dataNascimento"
                label="Data de Nascimento"
                type="date"
                value={editedAnimal.dataNascimento}
                onChange={handleChange}
                fullWidth
                margin="normal"
                InputLabelProps={{
                  shrink: true,
                }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="habitat"
                label="Habitat Natural"
                value={editedAnimal.habitat}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                name="paisOrigem"
                label="País de Origem"
                value={editedAnimal.paisOrigem}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Salvar Alterações
        </Button>
      </DialogActions>
    </Dialog>
  );
}