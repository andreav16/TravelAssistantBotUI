import { Entity } from "../models/InterpreterModels/entity";

export interface Strategy {
  execute(entities: Entity[]): Promise<string>;
}
