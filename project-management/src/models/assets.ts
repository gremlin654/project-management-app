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
  isLoading: boolean;
  error: string;
}

export type FormData = {
  title: string;
  description: string;
};
