export type Response = {
  status?: number;
  message?: string;
  data?: any; //TODO:
};

export type DB = Array<DBItem>;

export type DBItem = {
  id: string;
  name: string;
  age: number;
  hobbies: Array<string>;
};

export type BodyRequest = Omit<DBItem, "id">;
