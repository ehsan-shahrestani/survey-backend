export interface IQuestion {
  id: number;
  created_at: Date;
  text: string;
  options: IQuestionOptions[];
}

export interface IQuestionOptions {
  id: number;
  created_at: Date;
  text: string;
  icon: string;
}
