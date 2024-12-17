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