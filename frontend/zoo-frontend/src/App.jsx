import { 
  CssBaseline, 
  Container, 
  Box, 
  AppBar, 
  Toolbar, 
  Button,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { 
  BrowserRouter, 
  Routes, 
  Route, 
  Link 
} from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import PetsIcon from '@mui/icons-material/Pets';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import Animais from './pages/Animais';
import Cuidados from './pages/Cuidados';

function Home() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box sx={{ 
      textAlign: 'center', 
      mt: 4,
      px: isSmallScreen ? 2 : 0,
      minHeight: '70vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }}>
      <Typography 
        variant={isSmallScreen ? "h4" : "h3"} 
        component="h1"
        sx={{ 
          fontWeight: 700,
          mb: 4,
          color: theme.palette.primary.main
        }}
      >
        Bem-vindo ao ZooFront
      </Typography>
      <Box sx={{ 
        display: 'flex', 
        gap: 2, 
        justifyContent: 'center',
        flexDirection: isSmallScreen ? 'column' : 'row',
        alignItems: 'center'
      }}>
        <Button 
          component={Link} 
          to="/animais" 
          variant="contained" 
          size={isSmallScreen ? "medium" : "large"}
          startIcon={<PetsIcon />}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            boxShadow: theme.shadows[3],
            '&:hover': {
              boxShadow: theme.shadows[6]
            }
          }}
        >
          Ver Animais
        </Button>
        <Button 
          component={Link} 
          to="/cuidados" 
          variant="contained" 
          size={isSmallScreen ? "medium" : "large"}
          color="secondary"
          startIcon={<MedicalServicesIcon />}
          sx={{
            px: 4,
            py: 1.5,
            borderRadius: 2,
            boxShadow: theme.shadows[3],
            '&:hover': {
              boxShadow: theme.shadows[6]
            }
          }}
        >
          Ver Cuidados
        </Button>
      </Box>
    </Box>
  );
}

export default function App() {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <BrowserRouter>
      <CssBaseline />
      <AppBar 
        position="static"
        sx={{ 
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          boxShadow: theme.shadows[1]
        }}
      >
        <Toolbar sx={{ 
          justifyContent: 'space-between',
          px: isSmallScreen ? 1 : 3
        }}>
          {isSmallScreen ? (
            <IconButton
              color="inherit"
              edge="start"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <PetsIcon sx={{ mr: 1 }} />
              <Typography variant="h6" component="div">
                ZooFront
              </Typography>
            </Box>
          )}
          
          <Box sx={{ 
            display: 'flex',
            gap: isSmallScreen ? 1 : 2
          }}>
            <Button 
              color="inherit" 
              component={Link} 
              to="/"
              startIcon={isSmallScreen ? null : <HomeIcon />}
              sx={{ 
                minWidth: 'auto',
                px: isSmallScreen ? 1 : 2
              }}
            >
              {isSmallScreen ? <HomeIcon /> : 'Home'}
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/animais"
              startIcon={isSmallScreen ? null : <PetsIcon />}
              sx={{ 
                minWidth: 'auto',
                px: isSmallScreen ? 1 : 2
              }}
            >
              {isSmallScreen ? <PetsIcon /> : 'Animais'}
            </Button>
            <Button 
              color="inherit" 
              component={Link} 
              to="/cuidados"
              startIcon={isSmallScreen ? null : <MedicalServicesIcon />}
              sx={{ 
                minWidth: 'auto',
                px: isSmallScreen ? 1 : 2
              }}
            >
              {isSmallScreen ? <MedicalServicesIcon /> : 'Cuidados'}
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Container 
        maxWidth="lg" 
        sx={{ 
          px: isSmallScreen ? 2 : 4,
          py: 3
        }}
      >
        <Box sx={{ 
          my: 4,
          minHeight: 'calc(100vh - 200px)'
        }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/animais" element={<Animais />} />
            <Route path="/cuidados" element={<Cuidados />} />
          </Routes>
        </Box>
      </Container>
    </BrowserRouter>
  );
}