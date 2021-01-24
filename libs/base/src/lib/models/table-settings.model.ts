export interface TableActionModel<T> {
  icon: string;
  color: 'p-button-success' | 'p-button-warning';
  onClick(v: T): void;
}

export interface TableSettingsModel<T> {
  actions: TableActionModel<T>[];
}
