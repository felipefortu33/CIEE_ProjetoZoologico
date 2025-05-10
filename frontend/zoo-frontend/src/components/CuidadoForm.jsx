import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box,
  Typography,
  Grid
} from '@mui/material';
import api from '../services/api';

export default function CuidadoForm({ onCuidadoAdded }) {
  const [cuidado, setCuidado] = useState({
    nome: '',
    descricao: '',
    frequencia: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/Cuidados', cuidado);
      alert('Cuidado cadastrado com sucesso!');
      setCuidado({
        nome: '',
        descricao: '',
        frequencia: ''
      });
      if (onCuidadoAdded) onCuidadoAdded();
    } catch (error) {
      console.error('Erro ao cadastrar cuidado:', error);
      alert('Erro ao cadastrar cuidado');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCuidado(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Cadastrar Novo Cuidado
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="nome"
            label="Nome"
            value={cuidado.nome}
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
            value={cuidado.frequencia}
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
            value={cuidado.descricao}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            rows={3}
          />
        </Grid>
        <Grid item xs={12}>
          <Button 
            type="submit" 
            variant="contained" 
            color="primary"
            sx={{ mt: 2 }}
            fullWidth
          >
            Cadastrar Cuidado
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}