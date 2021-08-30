import { Timestamp } from './firebase';

export type TSFixMe = any;

export type PostInterface = {
  content: string;
  username: string;
  title: string;
  heartCount: number;
  published: boolean;
  slug: string;
  createdAt: number | Timestamp;
};

export type UserInterface = {
  displayName: string;
  photoURL: string;
  username: string;
};
