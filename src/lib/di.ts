import { Container, LifeTime } from "container-ioc";
import { AuthService, tAuthService } from "./services/AuthService";
import { HttpModule, tHttpModule } from "./services/http";
import { NoteService, tNoteService } from "./services/note/NoteService";

export const sl = new Container({
  defaultLifeTime: LifeTime.Persistent,
});

sl.register([
  {
    token: tAuthService,
    useClass: AuthService,
  },
  {
    token: tNoteService,
    useClass: NoteService,
  },
  {
    token: tHttpModule,
    useClass: HttpModule,
  },
]);
