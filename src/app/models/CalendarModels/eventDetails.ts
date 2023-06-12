import { EventDatetime } from "./eventDatetime";

export interface EventDetails{
    id: string;
    summary: string;
    description: string;
    start: EventDatetime;
    end: EventDatetime;
}