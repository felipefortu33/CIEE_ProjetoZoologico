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
import EditCuidadoModal from './EditCuidadoModal';

export default function CuidadoList({ cuidados, onUpdate }) {
  const [editingCuidado, setEditingCuidado] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/Cuidados/${id}`);
      onUpdate();
      alert('Cuidado removido com sucesso!');
    } catch (error) {
      console.error('Erro ao remover cuidado:', error);
      alert('Erro ao remover cuidado');
    }
  };

  const handleEditClick = (cuidado) => {
    setEditingCuidado(cuidado);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCuidado(null);
  };

  if (cuidados.length === 0) {
    return <Alert severity="info">Nenhum cuidado cadastrado ainda.</Alert>;
  }

  return (
    <>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Frequência</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cuidados.map((cuidado) => (
              <TableRow key={cuidado.id}>
                <TableCell>{cuidado.id}</TableCell>
                <TableCell>{cuidado.nome}</TableCell>
                <TableCell>{cuidado.frequencia}</TableCell>
                <TableCell>{cuidado.descricao}</TableCell>
                <TableCell>
                  <Tooltip title="Editar">
                    <IconButton 
                      color="primary"
                      onClick={() => handleEditClick(cuidado)}
                    >
                      <Edit />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton 
                      color="error"
                      onClick={() => handleDelete(cuidado.id)}
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

      {editingCuidado && (
        <EditCuidadoModal
          cuidado={editingCuidado}
          open={isModalOpen}
          onClose={handleCloseModal}
          onUpdate={onUpdate}
        />
      )}
    </>
  );
}