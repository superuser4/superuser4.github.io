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
        x: 550,
        y: 150,
        width: 600,
        height: 400,
        content: `
            <div class="content">
                <h2> ✉️ About Me </h2>
                <ul>
                    <li> My name is Kayra Guner </li>
                    <li> I'm a Computer Science student at the University of Windsor </li>
                    <li>Contact:
                        <ul>
                            <li><a href="https://www.linkedin.com/in/kayra-guner-a44b71343">Linkedin</a></li>
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
        x: 550,
        y: 150,
        width: 650,
        height: 400,
        content: `
            <div class="content">
                <h2>📂 My Projects</h2>
                <ul>
                    <li>gobricked is a C2 server written in Go that uses HTTPS for communication with beacon</li>
                </ul>
            </div>
        `
    });
}

function openBlogs(wm) {
    fetchBlogs().then(async blogs => {
        const content = document.createElement('div');
        content.className = 'content';
        content.innerHTML = `<h2>📝 Blog Posts</h2>`;

        for (const category in blogs) {
            const section = document.createElement('div');
            section.innerHTML = `<h3>${category}</h3><ul></ul>`;
            const ul = section.querySelector('ul');

            for (const url of blogs[category]) {
                const li = document.createElement('li');
                const filename = url.split('/').pop().replace('.md', '');
                li.innerHTML = `<a href="#" data-url="${url}">${filename}</a>`;
                
                li.querySelector('a').addEventListener('click', async e => {
                    e.preventDefault();
                    const md = await fetch(url).then(res => res.text());
                    const html = marked.parse(md);

                    wm.createWindow({
                        id: `blog_${filename}`,
                        title: filename,
                        x: 600,
                        y: 200,
                        width: 650,
                        height: 500,
                        content: `<div class="content">${html}</div>`
                    });
                });

                ul.appendChild(li);
            }

            content.appendChild(section);
        }

        wm.createWindow({
            id: 'blogs',
            title: 'Blog Posts',
            x: 550,
            y: 150,
            width: 600,
            height: 400,
            content: content.outerHTML
        });
    });
}

async function fetchBlogs() {
    const response = await fetch('blogIndex.json');
    if (!response.ok) {
        throw new Error('Failed to load blogIndex.json');
    }
    return await response.json();
}

