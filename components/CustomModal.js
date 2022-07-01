import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, styled } from '@mui/material';

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

export default function CustomModal({ open, closeModal, passedFunction, children, content, confirm }) {

  const CustomButton = styled(Button)(() => ({
    backgroundColor: '#c5c7c7',
    '&:hover': {
      backgroundColor: '#8c8c8c',
    },
  }))

  return (
    <div>
      {children}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={closeModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" textAlign="center">
              {content.header}
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }} textAlign="center">
              {content.body}
            </Typography>
            <Grid container marginTop={3} justifyContent="space-evenly">
              <Grid item>
                <CustomButton disableElevation variant="contained" onClick={closeModal}>Cancel</CustomButton>
              </Grid>
              <Grid item>
                {confirm ? <Button disableElevation variant="contained" onClick={passedFunction}>Confirm</Button>
                  : <Button disableElevation variant="contained" color="error" sx={{ 'backgroundColor': 'red' }} onClick={passedFunction}>Delete</Button>}
              </Grid>
            </Grid>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
