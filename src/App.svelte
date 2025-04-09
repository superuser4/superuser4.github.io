<script>
  let name = "John Doe";
  let title = "Web Developer";
  let about = "I build cool websites with Svelte.";
  let email = "your.email@example.com";
</script>

<main class="p-8 text-center">
  <h1 class="text-4xl font-bold">{name}</h1>
  <p class="text-xl mt-2">{title}</p>

  <section class="mt-6">
    <h2 class="text-2xl">About Me</h2>
    <p>{about}</p>
  </section>

  <section class="mt-6">
    <h2 class="text-2xl">Contact</h2>
    <a href="mailto:{email}" class="text-blue-500">{email}</a>
  </section>
</main>

<style>
  main {
    font-family: Arial, sans-serif;
    background-color: #f7f7f7;
    border-radius: 8px;
    max-width: 600px;
    margin: 0 auto;
  }

  h1, h2 {
    color: #333;
  }

  p, a {
    color: #555;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
