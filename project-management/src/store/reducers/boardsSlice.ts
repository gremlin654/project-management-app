import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IAddAllColumns, IBoards, IBoardsInitial, IGetTasksResponse } from 'models/assets';
import {
  addAllColumns,
  changeColumnTitle,
  changeTask,
  createColumn,
  createTask,
  deleteColumn,
  deleteTask,
  getTasks,
} from 'store/actions/boardsApi';

const initialState: IBoardsInitial = {
  getAllBoards: [],
  currentBoard: localStorage.getItem('currentBoard')
    ? JSON.parse(localStorage.getItem('currentBoard') ?? '')
    : null,
  currentColumns: [],
  allTasks: [],
  currentTask: null,
  isLoading: false,
  isLoadingBoard: false,
  addBoardModal: false,
  isAddColumn: false,
  isAddTask: false,
  isDeleteBoard: false,
  isDeleteColumn: false,
  isDeleteTask: false,
  isChangeTask: false,
  currentColumnId: '',
  deleteBoardId: '',
  currentTaskId: '',
  error: '',
};

export const boardsSlice = createSlice({
  name: 'boards',
  initialState,
  reducers: {
    setAddBoardModal: (state, action: PayloadAction<boolean>) => {
      state.addBoardModal = action.payload;
    },
    setGetAllBoards: (state, action: PayloadAction<IBoards[]>) => {
      state.getAllBoards = action.payload;
    },
    addBoard: (state, action: PayloadAction<IBoards>) => {
      state.getAllBoards.push(action.payload);
      state.addBoardModal = false;
    },
    deleteBoard: (state, action: PayloadAction<string>) => {
      state.getAllBoards = state.getAllBoards.filter((board) => board._id !== action.payload);
    },
    setDeleteBoardId: (state, action: PayloadAction<string>) => {
      state.deleteBoardId = action.payload;
    },
    deleteBoardModal: (state, action: PayloadAction<boolean>) => {
      state.isDeleteBoard = action.payload;
    },
    getCurrentBoard: (state, action: PayloadAction<IBoards>) => {
      state.currentBoard = action.payload;
      localStorage.setItem('currentBoard', JSON.stringify(state.currentBoard));
    },
    addColumn: (state, action: PayloadAction<boolean>) => {
      state.isAddColumn = action.payload;
    },
    deleteColumnModal: (state, action: PayloadAction<boolean>) => {
      state.isDeleteColumn = action.payload;
    },
    changeTaskModal: (state, action: PayloadAction<boolean>) => {
      state.isChangeTask = action.payload;
    },
    getCurrentTask: (state, action: PayloadAction<IGetTasksResponse>) => {
      state.currentTask = action.payload;
    },
    addTask: (state, action: PayloadAction<boolean>) => {
      state.isAddTask = action.payload;
    },
    setColumnId: (state, action: PayloadAction<string>) => {
      state.currentColumnId = action.payload;
    },
    setDeleteTaskId: (state, action: PayloadAction<string>) => {
      state.currentTaskId = action.payload;
    },
    deleteTaskModal: (state, action: PayloadAction<boolean>) => {
      state.isDeleteTask = action.payload;
    },
    setSpinnerBoard: (state, action: PayloadAction<boolean>) => {
      state.isLoadingBoard = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(addAllColumns.fulfilled, (state, action: PayloadAction<IAddAllColumns[]>) => {
      state.currentColumns = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addAllColumns.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addAllColumns.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });

    builder.addCase(createColumn.fulfilled, (state, action: PayloadAction<IAddAllColumns>) => {
      state.currentColumns = [...state.currentColumns, action.payload];
      state.isLoadingBoard = false;
      state.isAddColumn = false;
    });
    builder.addCase(createColumn.pending, (state) => {
      state.isLoadingBoard = true;
    });
    builder.addCase(createColumn.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoadingBoard = false;
      state.isAddColumn = false;
    });

    builder.addCase(changeColumnTitle.fulfilled, (state, action: PayloadAction<IAddAllColumns>) => {
      state.currentColumns = state.currentColumns.map((column) => {
        if (column._id === action.payload._id) {
          return action.payload;
        }
        return column;
      });
      state.isLoadingBoard = false;
    });
    builder.addCase(changeColumnTitle.pending, (state) => {
      state.isLoadingBoard = true;
    });
    builder.addCase(changeColumnTitle.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoadingBoard = false;
    });

    builder.addCase(deleteColumn.fulfilled, (state, action: PayloadAction<IAddAllColumns>) => {
      state.currentColumns = state.currentColumns.filter(
        (column) => column._id !== action.payload._id,
      );
      state.allTasks = state.allTasks.filter((task) => task.columnId !== action.payload._id);
      state.isLoadingBoard = false;
      state.isDeleteColumn = false;
    });
    builder.addCase(deleteColumn.pending, (state) => {
      state.isLoadingBoard = true;
    });
    builder.addCase(deleteColumn.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoadingBoard = false;
      state.isDeleteColumn = false;
    });

    builder.addCase(getTasks.fulfilled, (state, action: PayloadAction<IGetTasksResponse[]>) => {
      const stateId = state.allTasks.map((task) => task._id);
      const actionFilter = action.payload.filter((task) => !stateId.includes(task._id));
      state.allTasks = [...state.allTasks, ...actionFilter];
      state.isLoadingBoard = false;
    });
    builder.addCase(getTasks.pending, (state) => {
      state.isLoadingBoard = true;
    });
    builder.addCase(getTasks.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoadingBoard = false;
    });

    builder.addCase(createTask.fulfilled, (state, action: PayloadAction<IGetTasksResponse>) => {
      state.allTasks = [...state.allTasks, action.payload];
      state.isLoadingBoard = false;
      state.isAddTask = false;
    });
    builder.addCase(createTask.pending, (state) => {
      state.isLoadingBoard = true;
    });
    builder.addCase(createTask.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoadingBoard = false;
      state.isAddTask = false;
    });

    builder.addCase(changeTask.fulfilled, (state, action: PayloadAction<IGetTasksResponse>) => {
      state.allTasks = state.allTasks.map((task) => {
        if (task._id === action.payload._id) {
          return action.payload;
        }
        return task;
      });
      state.isLoadingBoard = false;
      state.isChangeTask = false;
    });
    builder.addCase(changeTask.pending, (state) => {
      state.isLoadingBoard = true;
    });
    builder.addCase(changeTask.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoadingBoard = false;
      state.isChangeTask = false;
    });

    builder.addCase(deleteTask.fulfilled, (state, action: PayloadAction<IGetTasksResponse>) => {
      state.allTasks = state.allTasks.filter((task) => task._id !== action.payload._id);
      state.isLoadingBoard = false;
      state.isDeleteTask = false;
    });
    builder.addCase(deleteTask.pending, (state) => {
      state.isLoadingBoard = true;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoadingBoard = false;
      state.isDeleteTask = false;
    });
  },
});
