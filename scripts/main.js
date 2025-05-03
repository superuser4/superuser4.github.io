document.addEventListener('DOMContentLoaded', () => {
    const wm = new WindowManager();
    
    // Desktop icons
    document.querySelectorAll('.icon').forEach(icon => {
        icon.addEventListener('dblclick', () => {
            const type = icon.dataset.window;
            if (type === 'projects') openProjects(wm);
            if (type === 'blogs') openBlogs(wm);
            if (type === 'about') openAbout(wm);
        });
    });
    // Update clock
    setInterval(() => {
        const now = new Date();
        document.querySelector('.clock').textContent = 
            now.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'});
    }, 1000);
});

function openAbout(wm) {
    wm.createWindow({
        id: 'about_me',
        title: 'About me',
        x: 350,
        y: 100,
        width: 750,
        height: 550,
        content: `
            <div class="content">
                <h2> ✉️ About Me </h2>
                <ul>
                    <li> My name is Kayra Guner </li>
                    <li> I'm a Computer Science student at the University of Windsor </li>
                    <li>Contact:
                        <ul>
                            <li><a href="https://www.linkedin.com/in/kayra-guner-a44b71343">Linkedin</a></li>
                            <li><a href="https://github.com/superuser4">Github</a></li>
                            <li><a href="">Resume</a></li>
                            <li><a href="">Email</a></li>
                        </ul>
                    </li>
                    <li>Some cool things I've done:
                        <ul>
                            <li> I've attended CS Games 2025 hosted in Quebec City, University of L'aval with a team of 20 </li>
                            <li> Multiple Hackathons </li>
                            <li> Winner of multiple CTF competitions in cybersecurity workshops offered by the University of Windsor in collaboration with Sterling Information Technologies </li>
                        </ul>
                    </li>
                    <li>Education:
                        <ul>
                            <li> Computer Science Honours, University of Windsor </li>
                        </ul>
                    </li>
                </ul>
            </div>
        `
    });
}

function openProjects(wm) {
    wm.createWindow({
        id: 'projects',
        title: 'Projects',
        x: 350,
        y: 100,
        width: 650,
        height: 400,
        content: `
            <div class="content">
                <h2>📂 My Projects</h2>
                <ul>
                    <li><a href="https://github.com/superuser4">Github</a></li>
                    <li><a href="https://github.com/superuser4/gstrike">Gstrike</a> is a C2 server written in Go that uses HTTPS for communication with beacon</li>
                </ul>
            </div>
        `
    });
}

function openBlogs(wm) {
    const blogWindow = wm.createWindow({
        id: 'blogs',
        title: 'Blog Categories',
        x: 350,
        y: 100,
        width: 800,
        height: 600,
        content: `
            <div class="content">
                <h2>📝 Blog Categories</h2>
                <div id="blog-categories">Loading categories...</div>
            </div>
        `
    });

    fetch('/blogs.json')
        .then(response => response.json())
        .then(data => {
            const categories = {};
            data.posts.forEach(post => {
                if (!categories[post.category]) {
                    categories[post.category] = [];
                }
                categories[post.category].push(post);
            });

            const categoryContainer = blogWindow.el.querySelector('#blog-categories');
            categoryContainer.innerHTML = '';

            Object.keys(categories).forEach(category => {
                const categoryDiv = document.createElement('div');
                categoryDiv.innerHTML = `<h3>${category}</h3>`;
                const ul = document.createElement('ul');

                categories[category].forEach(post => {
                    const li = document.createElement('li');
                    li.innerHTML = `<a href="#" data-path="${post.path}" data-title="${post.title}">${post.title}</a>`;
                    ul.appendChild(li);

                    li.querySelector('a').addEventListener('click', (e) => {
                        e.preventDefault();
                        openBlogPost(post.path, wm);
                    });
                });

                categoryDiv.appendChild(ul);
                categoryContainer.appendChild(categoryDiv);
            });
        })
        .catch(err => {
            const categoryContainer = blogWindow.el.querySelector('#blog-categories');
            categoryContainer.innerHTML = '<p style="color:red;">Failed to load blog categories.</p>';
            console.error('Error loading blogs.json:', err);
        });
}

function openBlogPost(path, wm) {
    fetch(`${path}?ts=${Date.now()}`)
        .then(response => response.text())
        .then(markdown => {
            const blogPostWindow = wm.createWindow({
                id: 'blog-post',
                title: 'Blog Post',
                x: 400,
                y: 150,
                width: 800,
                height: 600,
                content: `
                    <div class="content">
                        <h2>${path}</h2>
                        <div class="markdown-content">${markdownToHTML(markdown)}</div>
                    </div>
                `
            });
        })
        .catch(err => {
            console.error('Error loading blog post:', err);
        });
}

function markdownToHTML(markdown) {
    return markdown
        .replace(/^### (.*$)/gim, '<h3>$1</h3>') // H3 Headers
        .replace(/^## (.*$)/gim, '<h2>$1</h2>')  // H2 Headers
        .replace(/^# (.*$)/gim, '<h1>$1</h1>')   // H1 Headers
        .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>') // Bold text
        .replace(/\*(.*)\*/gim, '<em>$1</em>')    // Italics text
        .replace(/\n$/gim, '<br>');                // Newlines
}

