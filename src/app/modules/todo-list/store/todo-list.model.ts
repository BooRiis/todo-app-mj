export interface TodosState {
    todos: Todos[];
    loading: boolean;
    error: string | null;
  }


export interface Todos {
    id: string;
    title: string;
    description: string;
    date: string;
    isCompleted: boolean;
}