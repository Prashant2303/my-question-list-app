import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, IconButton, styled } from '@mui/material';
import DeleteForever from '@mui/icons-material/DeleteForever';
import { useState } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 300,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export default function ConfirmationModal({ deleteFunction }) {
  const [deleting, setDeleting] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const executeFunction = async () => {
    handleClose();
    setDeleting(true);
    await deleteFunction();
    setDeleting(false);
  }

  const CustomButton = styled(Button)(() => ({
    backgroundColor: '#c5c7c7',
    '&:hover': {
      backgroundColor: '#8c8c8c',
    },
  }))

  return (
    <div>
      <IconButton disabled={deleting} color="error" onClick={handleOpen}>
        <DeleteForever />
      </IconButton>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" textAlign="center">
              Delete this list ?
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }} textAlign="center">
              This action cannot be undone.
            </Typography>
            <Grid container marginTop={3} justifyContent="space-evenly">
              <Grid item>
                <CustomButton disableElevation variant="contained" onClick={handleClose}>Cancel</CustomButton>
              </Grid>
              <Grid item>
                <Button disableElevation variant="contained" color="error" sx={{ 'backgroundColor': 'red' }} onClick={executeFunction}>Delete</Button>
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
