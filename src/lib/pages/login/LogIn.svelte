<script>
  import { CssColors } from "../../data/Color";

  import github from "../../../assets/img/github.svg";
  import google from "../../../assets/img/google.svg";

  import { Button, TextField, Dialog, Space, Collapsible  } from "ui-commons";

  import { ColorPalette } from "../../utils/ColorPalete";
  import { AuthService, tAuthService } from "../../services/AuthService";
  import { navigate } from "svelte-navigator";
  import { Constants } from "../../config/config";
  import { sl } from "../../di";

  // let email;
  let email;
  let password;

  async function onLogin() {
    console.log("on click");
    let service = sl.resolve(tAuthService);
    try {
      const res = await service.login({
        email,
        password,
      });
      console.log(res);
      localStorage.setItem(Constants.accessTokenKey, res.accessToken);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }
</script>

<div
  class="flex items-center justify-center h-full md:gap-12 lg:gap-24 p-6 bg-diag-pattern bg-400p bg-repeat bg-opacity-10"
>
  <form action="" class="w-96 flex flex-col gap-3 bg-white rounded p-9">
    <Button
      borderColor={CssColors.black.withAlpha(0.5).s()}
      hoverColor={CssColors.black.withAlpha(0.2).s()}
    >
      <img src={google} alt="" />
      Sign in with google
    </Button>
    <Button
      borderColor={CssColors.black.withAlpha(0.5).s()}
      hoverColor={CssColors.black.withAlpha(0.2).s()}
    >
      <img src={github} alt="" />
      Sign in with GitHub
    </Button>
    <hr class="my-3 bg-slate-300 h-[0.8px]" />

    <TextField
      type="text"
      label="Username"
      placeholder="Username"
      bind:value={email}
    />

    <TextField
      type="password"
      label="Password"
      placeholder="Enter yout password:"
      bind:value={password}
    />

    <Button
      color={ColorPalette.primary.s()}
      textColor={CssColors.white.s()}
      hoverColor={ColorPalette.primaryDark.s()}
      on:click={onLogin}
    >
      <p class="font-semibold text-lg font-label text-center w-full">Login</p>
    </Button>
  </form>
  <img src="/banner.png" alt="site banner" class="w-96 md:block hidden" />
</div>
