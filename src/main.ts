import App from "./App.svelte";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Container } from "container-ioc";
import { LifeTime } from "container-ioc/dist/lib/interfaces";
import { AuthService, tAuthService } from "./lib/services/AuthService";
import { NoteService, tNoteService } from "./lib/services/note/NoteService";
import { mount } from "svelte";
import { gsap } from "gsap/dist/gsap";
import { Flip } from "gsap/dist/Flip";

gsap.registerPlugin(Flip);

const app = mount(App, { target: document.getElementById("app") });
export default app;
