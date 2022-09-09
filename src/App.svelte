<script>
  import { Router, Route, Link } from "svelte-navigator";
  import HomePage from "./lib/pages/homepage/HomePage.svelte";
  import SignUp from "./lib/pages/signup/SignUp.svelte";
</script>

<Router>
  <Route path="/">
    <HomePage />
  </Route>
  <Route path="/signup">
    <SignUp />
  </Route>
</Router>
