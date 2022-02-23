export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  color?: string;
};

export enum StatusFilter {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}
