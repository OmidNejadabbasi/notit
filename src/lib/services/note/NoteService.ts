import { Inject, Injectable } from "container-ioc/dist/lib/decorators";
import { AuthService, tAuthService } from "../AuthService";
import type { Note } from "../../data/Note";
import { HttpModule, tHttpModule } from "../http";
import type { AxiosResponse } from "axios";

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
      userid: {
        id: (await this.authService.currentUser()).id,
      },
    };
    debugger;

    return this.http.post(this.http.url("api/notes"), newNote);
  }

  async updateNote(note: Note) {
    if (!note.id) throw new Error("Note does not have id ");
    return this.http.patch(this.http.url(`api/notes/${note.id}`), note);
  }
}
