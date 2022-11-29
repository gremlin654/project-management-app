import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IModalColumnProps } from 'models/assets';
import { Button, TextField, Typography } from '@mui/material';

export function ColumnModal(props: IModalColumnProps) {
  const [title, setTitle] = React.useState('');
  return (
    <div>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '30%',
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography
            sx={{
              marginBottom: '1rem',
            }}
            variant='h4'
            id='modal-modal-title'
            component='h2'
          >
            Enter name of column
          </Typography>
          <TextField
            id='outlined-basic'
            label='Name'
            variant='outlined'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            sx={{
              display: 'block',
            }}
            inputProps={{ style: { fontSize: 20 } }} // font size of input text
            InputLabelProps={{ style: { fontSize: 20 } }} // font size of input label
            FormHelperTextProps={{ style: { fontSize: 10 } }} // font size of helper text
          />
          <Button
            sx={{ marginTop: '1rem', height: '5vh', width: '15vh', fontSize: '20px' }}
            variant='contained'
            onClick={() => {
              props.handleCreateColumn(title);
              props.handleClose();
              setTitle('');
            }}
          >
            Confirm
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
