import { Model } from "./Model";

export class Note extends Model {
  title?: string;
  content?: string;
  reviews?: number;
  createdAt?: Date;
  updatedAt?: Date;
  private noteType: number = NoteType.Note;

  private constructor(
    title: string,
    content: string,
    reviews: number,
    noteType: NoteType
  ) {
    super();
    this.title = title;
    this.content = content;
    this.reviews = reviews;
    this.noteType = noteType;
  }
  static newNote(title, content) {
    return new Note(title, content, 0, NoteType.Note);
  }
}

export enum NoteType {
  Note = 0,
  Flashcard = 1,
  CheetSheet = 2,
}
