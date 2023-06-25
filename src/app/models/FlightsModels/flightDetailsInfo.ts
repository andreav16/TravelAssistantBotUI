import { Departure } from "./departure";
import { Airline } from "./airline";
import { Arrival } from "./arrival";
import { FlightInfo } from "./flightInfo";

export interface FlightDetailsInfo{
    flightDate: string;
    flightStatus: string;
    flightDeparture: Departure;
    flightArrival: Arrival;
    flightAirline: Airline;
    flight:FlightInfo;
}