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

export interface IColumn {
  _id: string;
  title: string;
  order: number;
  boardId: string;
}

export interface IColumnProps {
  column: IColumn;
}

export interface ITask {
  _id: string;
  title: string;
  order: number;
  boardId: string;
  columnId: string;
  description: string;
  userId: string;
  users: [string] | string[];
}

export interface ITaskInitial {
  tasks: ITask[];
}

export interface ITaskProps {
  task: ITask;
}

export interface IModalColumnProps {
  open: boolean;
  handleClose: () => void;
  handleCreateColumn: (title: string) => void;
}

export interface IModalTaskProps {
  open: boolean;
  handleClose: () => void;
  handleCreateTask: (title: string, description: string) => void;
}
