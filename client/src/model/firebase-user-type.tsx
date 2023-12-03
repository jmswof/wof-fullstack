export default interface FirebaseUserType {
  uid: string;
  disabled: boolean;
  email: string;
  emailVerified: boolean;
  creationTime: Date;
  lastSignInTime: Date;
}