<script lang="ts">
  import { Button } from "ui-commons";
  import { faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
  import NavigationMenu from "./NavigationMenu.svelte";
  import MainArea from "./MainArea.svelte";
  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";
  import { AuthService, tAuthService } from "../../services/AuthService";
  import type { User } from "../../data/User";
  import { sl } from "../../di";
  import {
    tNoteService,
    type NoteService,
  } from "../../services/note/NoteService";
  import type { Tag } from "../../data/Tag";

  let authService: AuthService;
  let noteService: NoteService = sl.resolve(tNoteService);
  let tags: Tag[] = $state([])

  noteService.fetchAllTags().then((data) => {
    tags = data;
  });

  let user: User = null;
  let accountDropDownShowing: boolean = false;

  onMount(async () => {
    authService = sl.resolve(tAuthService);
    user = await authService.currentUser();

    checkIfUserLoggedIn();
  });

  function checkIfUserLoggedIn() {
    if (user == null) {
      navigate("/login");
    }
  }
</script>

<div class="navbar bg-red-500 h-10 flex items-center px-4 md:px-12 lg:px-24">
  <Button hoverColor="#fff3">
    <Fa icon={faHouse} />
  </Button>

  <Fa icon={faUser} color="#59ff" />
</div>

<main class="flex min-h-full">
  <div class="flex-grow-0 w-96">
    <NavigationMenu {tags} />
  </div>

  <MainArea />
</main>
