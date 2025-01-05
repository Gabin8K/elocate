import { Place } from "@/services/types";


export function usePlacesList() {
  const places: Place[] = [
    {
      id: '1',
      address: 'Address 1',
      location: 'Location 1',
      description: 'Description 1',
      image: 'https://via.placeholder.com/800',
    },
    {
      id: '2',
      address: 'Address 2',
      location: 'Location 2',
      description: 'Description 2',
    },
    {
      id: '3',
      address: 'Address 3',
      location: 'Location 3',
      description: 'Description 3',
      image: 'https://via.placeholder.com/800',
    },
    {
      id: '4',
      address: 'Address 4',
      location: 'Location 4',
      description: 'Description 4',
      image: 'https://via.placeholder.com/800',
    },
    {
      id: '5',
      address: 'Address 5',
      location: 'Location 5',
      description: 'Description 5',
      image: 'https://via.placeholder.com/800',
    },
  ];

  return {
    places,
  }
}