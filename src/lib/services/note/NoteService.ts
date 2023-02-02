import { Inject, Injectable } from "container-ioc/dist/lib/decorators";
import { AuthService, tAuthService } from "../AuthService";
import type { Note } from "../../data/Note";
import { HttpModule, tHttpModule } from "../http";

export const tNoteService = Symbol("noteService");

@Injectable()
export class NoteService {
  constructor(
    @Inject(tAuthService) private authService: AuthService,
    @Inject(tHttpModule) private http: HttpModule
  ) {}

  async saveNote(note: Note): Promise<Note> {
    let newNote = {
      ...note,
      userid: {
        id: (await this.authService.currentUser()).id,
      },
    };
    debugger;

    return this.http.post(this.http.url("api/notes"), newNote);
  }
}
