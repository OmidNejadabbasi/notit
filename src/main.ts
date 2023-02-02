import App from "./App.svelte";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Container } from "container-ioc";
import { LifeTime } from "container-ioc/dist/lib/interfaces";
import { AuthService, tAuthService } from "./lib/services/AuthService";
import { NoteService, tNoteService } from "./lib/services/note/NoteService";

const app = new App({
  target: document.getElementById("app"),
});

export default app;
