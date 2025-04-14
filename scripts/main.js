const wm = new WindowManager();

document.addEventListener('DOMContentLoaded', () => {
  // Desktop icons
  document.querySelectorAll('.icon').forEach(icon => {
    icon.addEventListener('dblclick', () => {
      const type = icon.dataset.window;
      if (type === 'projects') openProjects();
      if (type === 'blogs') openBlogs();
    });
  });

  // Start menu toggle
  document.querySelector('.start-button').addEventListener('click', toggleStartMenu);

  // Update clock every second
  setInterval(updateClock, 1000);
  updateClock();
});

// Clock function
function updateClock() {
  const now = new Date();
  document.getElementById('clock').textContent = 
    now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
}

// Start menu toggle
function toggleStartMenu() {
  const menu = document.getElementById('startMenu');
  menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
}

// Window creators
function openAbout() {
  wm.createWindow({
    id: 'about',
    title: 'About Me',
    content: `
      <div class="about-content">
        <img src="avatar.png" alt="My Photo" width="100" style="float:left;margin-right:15px;">
        <h2>Hi, I'm [Your Name]</h2>
        <p>[Your introduction here]</p>
        <div class="skills">
          ${['JavaScript', 'HTML/CSS', 'React'].map(skill => `
            <div class="skill-tag">🏷️ ${skill}</div>
          `).join('')}
        </div>
      </div>
    `
  });
}

function openResume() {
  wm.createWindow({
    id: 'resume',
    title: 'My Resume',
    content: `
      <iframe 
        src="resume.pdf" 
        class="pdf-viewer"
        title="My Resume"
      ></iframe>
    `
  });
}

async function openBlogs() {
  const categories = await loadBlogCategories();
  const blogs = await Promise.all(
    categories.map(async cat => ({
      category: cat,
      posts: await loadBlogPosts(cat)
    }))
  );

  wm.createWindow({
    id: 'blogs',
    title: 'Blog Posts',
    width: '800px',
    content: `
      <div class="blog-container">
        <div class="blog-categories">
          ${blogs.map(cat => `
            <div class="category" onclick="filterBlogs('${cat.category}')">
              📂 ${cat.category}
            </div>
          `).join('')}
        </div>
        <div class="blog-posts">
          ${blogs.flatMap(cat => cat.posts).map(post => `
            <article class="blog-post">
              <h3>${post.title}</h3>
              <div class="blog-meta">
                <span>📅 ${post.date}</span>
                <span>⏱️ ${post.readTime}</span>
              </div>
              <div class="blog-content">${post.content}</div>
            </article>
          `).join('')}
        </div>
      </div>
    `
  });
}

// Blog loading functions
async function loadBlogCategories() {
  try {
    const response = await fetch('/blogs/');
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return [...doc.querySelectorAll('a')]
      .filter(a => a.href.includes('/blogs/'))
      .map(a => a.href.split('/').pop());
  } catch (error) {
    console.error('Error loading blog categories:', error);
    return [];
  }
}

async function loadBlogPosts(category) {
  try {
    const response = await fetch(`/blogs/${category}/`);
    const html = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    const posts = await Promise.all(
      [...doc.querySelectorAll('a')]
        .filter(a => a.href.endsWith('.md'))
        .map(async a => {
          const postResponse = await fetch(a.href);
          const text = await postResponse.text();
          const [metadata, content] = text.split('---\n').slice(1);
          return {
            ...Object.fromEntries(metadata.split('\n').filter(l => l).map(l => l.split(': '))),
            content: marked.parse(content.trim())
          };
        })
    );
    return posts;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
}