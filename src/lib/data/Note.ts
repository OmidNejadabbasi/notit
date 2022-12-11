export class Note {
  title?: string;
  content?: string;
  noteType?: NoteType;
  reviews?: number;
}

export enum NoteType {
  Note,
  Flashcard,
  CheetSheet,
}
