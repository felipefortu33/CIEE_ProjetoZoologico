import { useState, useEffect } from 'react';
import { 
  Box,
  Typography,
  Container,
  CircularProgress,
  Alert,
  useMediaQuery,
  useTheme
} from '@mui/material';
import AnimalList from '../components/AnimalList';
import AnimalForm from '../components/AnimalForm';
import api from '../services/api';

export default function Animais() {
  const [animais, setAnimais] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const fetchAnimais = async () => {
    try {
      setLoading(true);
      const response = await api.get('/Animais');
      setAnimais(response.data);
      setError(null);
    } catch (err) {
      setError('Erro ao carregar animais');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAnimais();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ px: isSmallScreen ? 2 : 4 }}>
      <Box sx={{ 
        my: 4,
        padding: isSmallScreen ? 1 : 3,
        backgroundColor: theme.palette.background.paper,
        borderRadius: 2,
        boxShadow: theme.shadows[1]
      }}>
        <Typography 
          variant={isSmallScreen ? "h5" : "h4"} 
          component="h1" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            textAlign: isSmallScreen ? 'center' : 'left'
          }}
        >
          Animais do Zoológico
        </Typography>
        
        <Box sx={{ 
          mb: 4,
          p: isSmallScreen ? 1 : 2,
          backgroundColor: theme.palette.grey[100],
          borderRadius: 2
        }}>
          <AnimalForm onAnimalAdded={fetchAnimais} />
        </Box>
        
        {loading ? (
          <Box sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            mt: 4,
            minHeight: '200px',
            alignItems: 'center'
          }}>
            <CircularProgress size={isSmallScreen ? 40 : 60} />
          </Box>
        ) : error ? (
          <Alert 
            severity="error" 
            sx={{ 
              mt: 2,
              width: '100%'
            }}
          >
            {error}
          </Alert>
        ) : (
          <Box sx={{
            overflowX: 'auto',
            '-webkit-overflow-scrolling': 'touch'
          }}>
            <AnimalList animais={animais} onUpdate={fetchAnimais} />
          </Box>
        )}
      </Box>
    </Container>
  );
}