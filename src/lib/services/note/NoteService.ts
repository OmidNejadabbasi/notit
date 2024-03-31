import { Inject, Injectable } from "container-ioc/dist/lib/decorators";
import { AuthService, tAuthService } from "../AuthService";
import type { Note } from "../../data/Note";
import { HttpModule, tHttpModule } from "../http";
import type { AxiosResponse } from "axios";
import { retry } from "rxjs";
import type { Tag } from "src/lib/data/Tag";

export const tNoteService = Symbol("noteService");

@Injectable()
export class NoteService {
  constructor(
    @Inject(tAuthService) private authService: AuthService,
    @Inject(tHttpModule) private http: HttpModule
  ) {}

  async saveNote(note: Note): Promise<AxiosResponse> {
    let newNote = {
      ...note,
    };

    return this.http.post(this.http.url("notes"), newNote);
  }

  async updateNote(note: Note) {
    if (!note.id) throw new Error("Note does not have id ");
    return this.http.put(this.http.url(`notes/${note.id}`), note);
  }

  async fetchAllNotes(): Promise<Note[]> {
    let notesUrl = this.http.url("notes");

    let res = await this.http.get(notesUrl);
    return (res.data as any[]).map((v) => ({
      ...v,
      createdAt: new Date(v.createdAt),
      updatedAt: new Date(v.updatedAt),
    }));
  }
  async fetchAllTags(): Promise<Tag[]>{
    let tagsUrl = this.http.url("tags");

    let res = await this.http.get(tagsUrl);
    return (res.data as Tag[])
  }
}
