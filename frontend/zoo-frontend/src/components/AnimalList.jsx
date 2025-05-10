import { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper,
  IconButton,
  Tooltip,
  Alert
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import api from '../services/api';
import EditAnimalModal from './EditAnimalModal';

export default function AnimalList({ animais, onUpdate }) {
  const [editingAnimal, setEditingAnimal] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/Animais/${id}`);
      onUpdate();
      alert('Animal removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover animal:', error);
      alert('Erro ao remover animal');
    }
  };

  const handleEditClick = (animal) => {
    setEditingAnimal(animal);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAnimal(null);
  };

  if (animais.length === 0) {
    return <Alert severity="info">Nenhum animal cadastrado ainda.</Alert>;
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Espécie</TableCell>
              <TableCell>Habitat</TableCell>
              <TableCell>País de Origem</TableCell>
              <TableCell>Data de Nascimento</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {animais.map((animal) => (
              <TableRow key={animal.id}>
                <TableCell>{animal.id}</TableCell>
                <TableCell>{animal.nome}</TableCell>
                <TableCell>{animal.especie}</TableCell>
                <TableCell>{animal.habitat}</TableCell>
                <TableCell>{animal.paisOrigem}</TableCell>
                <TableCell>
                  {animal.dataNascimento ? new Date(animal.dataNascimento).toLocaleDateString() : 'Não informada'}
                </TableCell>
                <TableCell>
                  <Tooltip title="Editar">
                    <IconButton 
                      color="primary"
                      onClick={() => handleEditClick(animal)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton 
                      color="error"
                      onClick={() => handleDelete(animal.id)}
                    >
                      <Delete />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {editingAnimal && (
        <EditAnimalModal
          animal={editingAnimal}
          open={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}