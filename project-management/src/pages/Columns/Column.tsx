import { Spinner } from 'components/Spinner/Spinner';
import { Task } from 'components/Task/Task';
import { TaskModal } from 'components/TaskModal/TaskModal';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import { IColumn, IColumnProps, ITask } from 'models/assets';
import React, { useEffect } from 'react';
import { useDeleteColumnMutation } from 'store/actions/columnsApi';
import { useCreateTaskMutation, useGetTasksQuery } from 'store/actions/taskApi';
import { columnSlice } from 'store/reducers/columnSlice';
import { taskSlice } from 'store/reducers/tasksSlice';

export function Column(props: IColumnProps) {
  const { currentBoard } = useAppSelector((state) => state.columns);
  const { tasks } = useAppSelector((state) => state.tasks);

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch = useAppDispatch();
  const { setTasks, addTask } = taskSlice.actions;
  const { deleteColumn } = columnSlice.actions;

  const [deleteColumnApi] = useDeleteColumnMutation();
  const [createTaskApi] = useCreateTaskMutation();

  const body = {
    boardId: currentBoard,
    columnId: props.column._id,
  };
  const { data: tasksApi, isLoading } = useGetTasksQuery(body);

  useEffect(() => {
    if (!isLoading) {
      console.log(props.column._id);
      console.log(tasksApi, 'taskApi');
      console.log(tasks, 'tasks');
      dispatch(setTasks(tasksApi));
    }
  }, [isLoading]);

  const handleCreateTask = async (title: string, description: string) => {
    try {
      const response = await createTaskApi({
        boardId: currentBoard,
        columnId: props.column._id,
        title: title,
        order: '1',
        description: description,
        userId: '1',
        users: ['userId of responsible user #1', 'userId of responsible user #2'],
      }).unwrap();
      dispatch(addTask(response));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteColumn = async () => {
    try {
      const body = {
        boardId: currentBoard,
        columnId: props.column._id,
      };
      await deleteColumnApi(body);
      dispatch(deleteColumn(props.column._id));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='columns__item'>
      <h2>{props.column.title}</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        tasks
          .filter((task: ITask) => task.columnId === props.column._id)
          .map((task: ITask) => <Task key={task._id} task={task} />)
      )}
      <div className='columns__item__bottom'>
        <div className='columns__item__bottom__btn' onClick={() => handleOpen()}>
          + Add task
        </div>
        <div className='columns__item__bottom__btn' onClick={() => handleDeleteColumn()}>
          - Delete collumn
        </div>
      </div>
      <TaskModal open={open} handleClose={handleClose} handleCreateTask={handleCreateTask} />
    </div>
  );
}
