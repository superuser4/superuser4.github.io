<script>
	import { Router, Route, Link } from "svelte-routing";
  
	let name = "Superuser4";
	let hobbies = ["Coding", "Photography", "Traveling", "Gaming"];
  </script>
  
  <Router>
	<header>
	  <nav>
		<ul>
		  <li><Link to="/">Home</Link></li>
		  <li><Link to="/about">About</Link></li>
		</ul>
	  </nav>
	</header>
  
	<Route path="/">
	  <main>
		<h1>Welcome to my personal website!</h1>
		<p>This is the homepage of <strong>{name}</strong></p>
		<section class="about">
		  <h2>About Me</h2>
		  <p>Hello, I’m {name}, a passionate developer...</p>
		</section>
		<section class="hobbies">
		  <h2>My Hobbies</h2>
		  <ul>
			{#each hobbies as hobby}
			  <li>{hobby}</li>
			{/each}
		  </ul>
		</section>
		<section class="contact">
		  <h2>Contact</h2>
		  <p>If you want to reach out, feel free to send me an email at <a href="mailto:superuser4@example.com">superuser4@example.com</a></p>
		</section>
	  </main>
	</Route>
  
	<Route path="/about">
	  <main>
		<h1>About Me</h1>
		<p>This is a more detailed page about me.</p>
	  </main>
	</Route>
  </Router>
  
  <style>
	main {
	  font-family: Arial, sans-serif;
	  margin: 2rem;
	}
  
	header {
	  text-align: center;
	  margin-bottom: 2rem;
	}
  
	h1 {
	  font-size: 2.5rem;
	  margin-bottom: 1rem;
	}
  
	section {
	  margin: 2rem 0;
	}
  
	ul {
	  list-style-type: none;
	  padding-left: 0;
	}
  
	li {
	  margin: 0.5rem 0;
	}
  
	a {
	  color: #007bff;
	}
  
	nav ul {
	  display: flex;
	  justify-content: center;
	  gap: 20px;
	  list-style-type: none;
	}
  
	li {
	  font-size: 1.2rem;
	}
  
	a {
	  text-decoration: none;
	  color: #007bff;
	}
  </style>
  