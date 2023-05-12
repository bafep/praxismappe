export type DocumentProps = {
  name: string;
  path: string;
  type: string;
};

export type DayProps = {
  previewpic: string;
  date: string;
  thema: string;
  description: string;
  documents?: DocumentProps[];
  tag: string;
};

