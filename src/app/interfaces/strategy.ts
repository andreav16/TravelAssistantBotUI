import { Entity } from "../models/entity";

export interface Strategy {
  execute(entities: Entity[]): Promise<string>;
}
