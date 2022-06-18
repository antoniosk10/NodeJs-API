export type Response = {
  status?: number;
  message?: string;
  data?: DBItem | DBItem[] | null;
};

export type DB = Array<DBItem>;

export type DBItem = {
  id: string;
  username: string;
  age: number;
  hobbies: Array<string>;
};

export type BodyRequest = Omit<DBItem, "id">;
