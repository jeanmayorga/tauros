export interface CustomError {
  message: string;
}
export type NoUndefinedField<T> = {
  [P in keyof T]-?: NoUndefinedField<NonNullable<T[P]>>;
};

export * from "./database";
