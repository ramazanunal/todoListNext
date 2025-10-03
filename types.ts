export type TodoItemChildren = {
  text: string;
  completed: boolean;
};

export type TodoItem = {
  id: string;
  title: string;
  completed: boolean;
  children: Array<TodoItemChildren>;
};