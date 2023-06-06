import { Strategy } from "../interfaces/strategy";
import { Entity } from "../models/entity";

export class Context {
  private strategy!: Strategy;

  setStrategy(strategy: Strategy): void {
    this.strategy = strategy;
  }

  executeStrategy(entities: Entity[]): Promise<string> {
    return this.strategy.execute(entities);
  }
}
