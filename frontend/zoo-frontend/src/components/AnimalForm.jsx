import { useState } from 'react';
import { 
  TextField, 
  Button, 
  Box,
  Typography,
  Grid
} from '@mui/material';
import api from '../services/api';

export default function AnimalForm({ onAnimalAdded }) {
  const [animal, setAnimal] = useState({
    nome: '',
    descricao: '',
    dataNascimento: '',
    especie: '',
    habitat: '',
    paisOrigem: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/Animais', animal);
      alert('Animal cadastrado com sucesso!');
      // Limpa o formulário
      setAnimal({
        nome: '',
        descricao: '',
        dataNascimento: '',
        especie: '',
        habitat: '',
        paisOrigem: ''
      });
      // Chama a função para atualizar a lista
      if (onAnimalAdded) onAnimalAdded();
    } catch (error) {
      console.error('Erro ao cadastrar animal:', error);
      alert('Erro ao cadastrar animal');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAnimal(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3, mb: 4 }}>
      <Typography variant="h6" gutterBottom>
        Cadastrar Novo Animal
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            name="nome"
            label="Nome"
            value={animal.nome}
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
            value={animal.especie}
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
            value={animal.descricao}
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
            value={animal.dataNascimento}
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
            value={animal.habitat}
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
            value={animal.paisOrigem}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
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
            Cadastrar Animal
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}