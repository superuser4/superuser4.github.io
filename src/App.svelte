<script>
  let name = "John Doe";
  let title = "Web Developer & Designer";
  let about = "I am a passionate web developer with experience in creating dynamic and responsive websites. I specialize in JavaScript, Svelte, and modern web design techniques.";

  let projects = [
    {
      title: "Project One",
      description: "A web application built with Svelte and Tailwind CSS to manage tasks.",
      link: "https://example.com/project-one"
    },
    {
      title: "Project Two",
      description: "A portfolio website to showcase my personal projects and achievements.",
      link: "https://example.com/project-two"
    },
    {
      title: "Project Three",
      description: "A real-time chat application built with Node.js and WebSocket.",
      link: "https://example.com/project-three"
    }
  ];

  let email = "your.email@example.com";
</script>

<main class="max-w-4xl mx-auto p-8">
  <!-- Header Section -->
  <header class="text-center mb-12">
    <h1 class="text-4xl font-bold text-blue-600">{name}</h1>
    <p class="text-xl mt-2">{title}</p>
  </header>

  <!-- About Me Section -->
  <section class="mb-12">
    <h2 class="text-2xl font-semibold mb-4">About Me</h2>
    <p class="text-lg">{about}</p>
  </section>

  <!-- Projects Section -->
  <section class="mb-12">
    <h2 class="text-2xl font-semibold mb-4">Projects</h2>
    <div class="space-y-6">
      {#each projects as project}
        <div class="bg-white p-6 shadow-md rounded-lg">
          <h3 class="text-xl font-semibold text-blue-600">{project.title}</h3>
          <p class="text-gray-700">{project.description}</p>
          <a href={project.link} class="text-blue-500 hover:text-blue-700 mt-4 inline-block">View Project</a>
        </div>
      {/each}
    </div>
  </section>

  <!-- Contact Section -->
  <section>
    <h2 class="text-2xl font-semibold mb-4">Contact</h2>
    <p class="text-lg">Feel free to reach out to me via email:</p>
    <a href="mailto:{email}" class="text-blue-500 hover:text-blue-700">{email}</a>
  </section>
</main>

<style>
  main {
    font-family: 'Arial', sans-serif;
    background-color: #f7f7f7;
    border-radius: 8px;
  }

  h1, h2 {
    color: #2d3748;
  }

  p {
    color: #4a5568;
  }

  a {
    transition: color 0.3s ease;
  }

  a:hover {
    text-decoration: underline;
  }
</style>
