export interface IError {
  status: number;
  data: {
    message: string;
    statusCodes: number;
  };
}
