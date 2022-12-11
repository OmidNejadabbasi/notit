import { writable } from "svelte/store";
import type { Note } from "../data/Note";

export const noteStore = writable<Note[]>();
