<script>
  let name = "Your Name";
  let about = "A passionate web developer with experience in modern web technologies.";
  let projects = [
    { title: "Project 1", description: "Description of project 1" },
    { title: "Project 2", description: "Description of project 2" },
    { title: "Project 3", description: "Description of project 3" }
  ];
</script>

<main class="p-8">
  <header class="text-center">
    <h1 class="text-4xl font-bold text-blue-600">Welcome to {name}'s Portfolio</h1>
  </header>

  <section class="mt-8">
    <h2 class="text-2xl font-bold">About Me</h2>
    <p>{about}</p>
  </section>

  <section class="mt-8">
    <h2 class="text-2xl font-bold">Projects</h2>
    <div>
      {#each projects as project}
        <div class="bg-white p-4 shadow-md mb-4">
          <h3 class="font-semibold text-xl">{project.title}</h3>
          <p>{project.description}</p>
        </div>
      {/each}
    </div>
  </section>

  <footer class="text-center mt-8">
    <p>Contact me at <a href="mailto:your.email@example.com" class="text-blue-600">your.email@example.com</a></p>
  </footer>
</main>

<style>
  main {
    max-width: 900px;
    margin: 0 auto;
    background-color: #f9fafb;
    border-radius: 8px;
  }
</style>

