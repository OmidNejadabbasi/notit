<script>
  import { CssColors } from "../../data/Color";

  import Button from "../../components/Button.svelte";

  import TextField from "../../components/TextField.svelte";
  import { ColorPalette } from "../../utils/ColorPalete";
  import { AuthService } from "../../services/AuthService";
  import { navigate } from "svelte-navigator";
  import { Constants } from "src/lib/config/config";

  let email;
  let username;
  let password;

  async function onSignUp() {
    console.log("on click");
    let service = new AuthService();
    try {
      const res = await service.signUp({ email, password, username });
      console.log(res);
      localStorage.setItem(Constants.accessTokenKey, res.accessToken);
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  }
</script>

<div class="flex items-center justify-center h-full md:gap-12 lg:gap-24 p-6">
  <form action="" class="w-72 flex flex-col gap-3 ">
    <Button
      borderColor={CssColors.black.withAlpha(0.5).s()}
      hoverColor={CssColors.black.withAlpha(0.2).s()}
    >
      <svg
        enable-background="new 0 0 128 128"
        id="Social_Icons"
        version="1.1"
        viewBox="0 0 128 128"
        width="28px"
        height="28px"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        ><g id="_x31__stroke"
          ><g id="Google"
            ><rect
              clip-rule="evenodd"
              fill="none"
              fill-rule="evenodd"
              height="128"
              width="128"
            /><path
              clip-rule="evenodd"
              d="M27.585,64c0-4.157,0.69-8.143,1.923-11.881L7.938,35.648    C3.734,44.183,1.366,53.801,1.366,64c0,10.191,2.366,19.802,6.563,28.332l21.558-16.503C28.266,72.108,27.585,68.137,27.585,64"
              fill="#FBBC05"
              fill-rule="evenodd"
            /><path
              clip-rule="evenodd"
              d="M65.457,26.182c9.031,0,17.188,3.2,23.597,8.436L107.698,16    C96.337,6.109,81.771,0,65.457,0C40.129,0,18.361,14.484,7.938,35.648l21.569,16.471C34.477,37.033,48.644,26.182,65.457,26.182"
              fill="#EA4335"
              fill-rule="evenodd"
            /><path
              clip-rule="evenodd"
              d="M65.457,101.818c-16.812,0-30.979-10.851-35.949-25.937    L7.938,92.349C18.361,113.516,40.129,128,65.457,128c15.632,0,30.557-5.551,41.758-15.951L86.741,96.221    C80.964,99.86,73.689,101.818,65.457,101.818"
              fill="#34A853"
              fill-rule="evenodd"
            /><path
              clip-rule="evenodd"
              d="M126.634,64c0-3.782-0.583-7.855-1.457-11.636H65.457v24.727    h34.376c-1.719,8.431-6.397,14.912-13.092,19.13l20.474,15.828C118.981,101.129,126.634,84.861,126.634,64"
              fill="#4285F4"
              fill-rule="evenodd"
            /></g
          ></g
        ></svg
      >
      Sign in with google
    </Button>
    <Button
      borderColor={CssColors.black.withAlpha(0.5).s()}
      hoverColor={CssColors.black.withAlpha(0.2).s()}
    >
      <svg
        id="Layer_1"
        style="enable-background:new 0 0 512 512;"
        version="1.1"
        viewBox="0 0 512 512"
        height="28px"
        width="28px"
        xml:space="preserve"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
      >
        <g>
          <path
            class="st0"
            d="M256,32C132.3,32,32,134.8,32,261.7c0,101.5,64.2,187.5,153.2,217.9c11.2,2.1,15.3-5,15.3-11.1   c0-5.5-0.2-19.9-0.3-39.1c-62.3,13.9-75.5-30.8-75.5-30.8c-10.2-26.5-24.9-33.6-24.9-33.6c-20.3-14.3,1.5-14,1.5-14   c22.5,1.6,34.3,23.7,34.3,23.7c20,35.1,52.4,25,65.2,19.1c2-14.8,7.8-25,14.2-30.7c-49.7-5.8-102-25.5-102-113.5   c0-25.1,8.7-45.6,23-61.6c-2.3-5.8-10-29.2,2.2-60.8c0,0,18.8-6.2,61.6,23.5c17.9-5.1,37-7.6,56.1-7.7c19,0.1,38.2,2.6,56.1,7.7   c42.8-29.7,61.5-23.5,61.5-23.5c12.2,31.6,4.5,55,2.2,60.8c14.3,16.1,23,36.6,23,61.6c0,88.2-52.4,107.6-102.3,113.3   c8,7.1,15.2,21.1,15.2,42.5c0,30.7-0.3,55.5-0.3,63c0,6.1,4,13.3,15.4,11C415.9,449.1,480,363.1,480,261.7   C480,134.8,379.7,32,256,32z"
          />
        </g>
      </svg>
      Sign in with google
    </Button>
    <hr class="my-3 bg-slate-300 h-[0.8px]" />
    <TextField
      type="text"
      label="Email"
      placeholder="name@example.com"
      bind:value={email}
    />

    <TextField
      type="text"
      label="Password"
      placeholder="Username"
      bind:value={username}
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
      on:click={onSignUp}
    >
      <p class="font-semibold text-lg font-label text-center w-full">Sign Up</p>
    </Button>
  </form>
  <img src="/banner.png" alt="site banner" class="w-96 md:block hidden" />
</div>
