import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid
} from '@mui/material';
import api from '../services/api';

export default function EditCuidadoModal({ cuidado, open, onClose, onUpdate }) {
  const [editedCuidado, setEditedCuidado] = useState({...cuidado});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedCuidado(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await api.put(`/Cuidados/${cuidado.id}`, editedCuidado);
      alert('Cuidado atualizado com sucesso!');
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Erro ao atualizar cuidado:', error);
      alert('Erro ao atualizar cuidado');
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Editar Cuidado</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="nome"
                label="Nome"
                value={editedCuidado.nome}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="frequencia"
                label="Frequência"
                value={editedCuidado.frequencia}
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
                value={editedCuidado.descricao}
                onChange={handleChange}
                fullWidth
                margin="normal"
                multiline
                rows={3}
              />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}