export interface TableColumn {
  field: string;
  header: string;
  type?: 'text' | 'boolean' | 'date' | 'numeric';
}