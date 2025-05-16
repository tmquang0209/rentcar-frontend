export * from "./document.interface";
export * from "./equipment.interface";
export * from "./functional-diagram.interface";
export * from "./module-equipment.interface";
export * from "./repair-history.interface";
export * from "./upload.interface";
export * from "./user.interface";

export interface IResponse<T> {
  data: T;
  status: string;
  message: string;
}
