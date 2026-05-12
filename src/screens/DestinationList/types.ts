export interface IDestination {
  id: number;
  name: string;
  description: string;
  url: string;
}

export interface IDestinationList {
  destinations: IDestination[];
}
