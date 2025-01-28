export interface Auth {
  uid: string
  displayName: string,
  email: string,
  phoneNumber: string | null,
  photoURL: string,
  emailVerified: boolean,
  providerData: any[],
  providerId: string,
  tenantId: null | string,
  isAnonymous: boolean,
  metadata: {
    creationTime: number,
    lastSignInTime: number,
  },
  multiFactor: {
    enrolledFactors: any[],
  },
}

export interface Place {
  id: string;
  address?: string;
  location: string;
  description?: string;
  image?: string;
}

export interface File {
  uri: string;
  name: string;
  type: string;
}

export type Coordinate = {
  longitude: number;
  latitude: number;
}


export interface PlaceDoc {
  id?: string;
  user: User;
  address: string;
  createdAt?: string;
  imageRef?: string;
  description: string;
  coordinate: Coordinate;
}


export interface CommentDoc {
  id?: string;
  user: User;
  text: string;
  parentId: string;
  createdAt?: string;
}


export interface User {
  id?: string;
  photoURL: string;
  displayName: string;
}