export interface IError {
  status: number;
  data: {
    message: string;
    statusCodes: number;
  };
}

export interface IQueryNewBoard {
  title: string;
  owner: string;
  users: string[];
}

export interface INewBoardResponse {
  _id: string;
  title: string;
  owner: string;
  users: [string];
}

export interface IBoardsInitial {
  addBoardModal: boolean;
  getAllBoards: IBoards[];
  currentBoard: IBoards | null;
  isLoading: boolean;
  error: string | unknown;
  currentColumns: IAddAllColumns[];
  isAddColumn: boolean;
  isAddTask: boolean;
  currentColumnId: string;
  isLoadingBoard: boolean;
  allTasks: IGetTasksResponse[];
  isDeleteBoard: boolean;
  isDeleteColumn: boolean;
  isChangeTask: boolean;
  deleteBoardId: string;
  isDeleteTask: boolean;
  currentTaskId: string;
  currentTask: IGetTasksResponse | null;
}

export type FormData = {
  title: string;
  description: string;
};

export interface IBoards {
  _id: string;
  title: string;
  owner: string;
  users: [string];
}

export interface IBoardsProps {
  card: IBoards;
}

export interface IAddAllColumns {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface IGetTasksQuery {
  idBoard: string;
  idColumn: string;
}

export interface IGetTasksResponse {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: number;
  users: [string];
}

export interface ICreateColumn {
  id: string;
  title: string;
  order: number;
}

export interface IDeleteProps {
  closeModal: () => void;
}

export interface ITeamMember {
  avatar: string;
  name: string;
  major: string;
  github: string;
  avatarWebP: string;
}

export type FormTaskData = {
  title: string;
  description: string;
};

export interface IColumnTaskProps {
  task: IGetTasksResponse;
}

export interface IColumns {
  idBoard: string;
}

export type FormColumnData = {
  title: string;
};

export interface IColumnProps {
  item: IAddAllColumns;
  idBoard: string;
}

export interface IDeleteTaskQuery {
  taskId: string;
  boardId: string;
  columnId: string;
}

export interface IDeleteColumnQuery {
  idBoard: string;
  idColumn: string;
}

export interface ICreateTaskQuery {
  title: string;
  order: number;
  description: string;
  userId: number | string;
  users: string[];
  idBoard: string;
  idColumn: string;
}

export interface IChangeColumnTitle {
  boardId: string;
  columnId: string;
  order: number;
  title: string;
}
