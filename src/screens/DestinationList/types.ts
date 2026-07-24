export interface IDestination {
  id: number;
  name: string;
  description: string;
  country: string;
  imageUrls: string[];
  defaultImgUrlIndex: number;
}

export interface IDestinationList {
  destinations: IDestination[];
}
