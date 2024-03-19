<script lang="ts">
  import Button from "../../components/shared/Button.svelte";
  import { faHouse, faPerson, faUser } from "@fortawesome/free-solid-svg-icons";
  import Fa from "svelte-fa";
  import NavigationMenu from "./NavigationMenu.svelte";
  import MainArea from "./MainArea.svelte";
  import { onMount } from "svelte";
  import { navigate } from "svelte-navigator";
  import { AuthService, tAuthService } from "../../services/AuthService";
  import type { User } from "../../data/User";
  import Dialog from "../../components/shared/Dialog.svelte";
  import { sl } from "../../di";

  let authService: AuthService;

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

  <div
    class="relative ml-auto rounded-[50%] border p-1.5 aspect-square border-slate-800 bg-slate-50"
    on:click={(e) => (accountDropDownShowing = !accountDropDownShowing)}
  >
    <Fa icon={faUser} color="#59ff" />
  </div>
</div>

<main class="flex min-h-full">
  <div class="flex-grow-0 w-72">
    <NavigationMenu />
  </div>

  <MainArea />
</main>
