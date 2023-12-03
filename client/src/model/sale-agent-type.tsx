import FirebaseUserType from './firebase-user-type';

export default interface SaleAgentType {
  _id: string;
  active: boolean;
  firstName: string;
  lastName: string;
  firebase: FirebaseUserType;
}