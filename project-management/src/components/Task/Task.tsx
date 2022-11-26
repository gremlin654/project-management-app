import { TaskModal } from 'components/TaskModal/TaskModal';
import { ITaskProps } from 'models/assets';
import React from 'react';
import './Task.scss';

export function Task(props: ITaskProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <div className='columns__item__task' onClick={() => handleOpen()}>
        {props.task.title}
      </div>
      {/* <TaskModal handleClose={handleClose} open={open} /> */}
    </div>
  );
}
