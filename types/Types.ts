export type Podcast = {
  image: string;
  audio: string;
  title: string;
  description: string;
  id: number;
  isFree: boolean;
};
export type PodcastData = {
  image: string;
  audio: string;
  title: string;
  description: string;
  id: number;
  isFree: boolean;
};

export type FormData = {
  email: string;
  password: string;
};

export type LoginModalProps = {
  open: boolean;
  setOpen: (value: boolean) => void;
};

export type UserData = {
  email: string;
  password: string;
  username: string;
};
