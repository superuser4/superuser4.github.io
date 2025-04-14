document.addEventListener('DOMContentLoaded', () => {
    const wm = new WindowManager();
    
    // Desktop icons
    document.querySelectorAll('.icon').forEach(icon => {
        icon.addEventListener('dblclick', () => {
            const type = icon.dataset.window;
            if (type === 'projects') openProjects(wm);
            if (type === 'blogs') openBlogs(wm);
        });
    });

    // Update clock
    setInterval(() => {
        const now = new Date();
        document.querySelector('.clock').textContent = 
            now.toLocaleTimeString('en-US', {hour: 'numeric', minute: '2-digit'});
    }, 1000);
});

function openProjects(wm) {
    wm.createWindow({
        id: 'projects',
        title: 'Projects',
        x: 100,
        y: 100,
        content: `
            <div class="content">
                <h2>📂 My Projects</h2>
                <ul>
                    <li>Project 1</li>
                    <li>Project 2</li>
                    <li>Project 3</li>
                </ul>
            </div>
        `
    });
}

function openBlogs(wm) {
    fetchBlogs().then(blogs => {
        wm.createWindow({
            id: 'blogs',
            title: 'Blog Posts',
            x: 200,
            y: 200,
            content: `
                <div class="blog-categories">
                    <button class="category active" data-category="all">All</button>
                    ${Object.keys(blogs).map(cat => `
                        <button class="category" data-category="${cat}">${cat}</button>
                    `).join('')}
                </div>
                <div class="blog-list">
                    ${Object.entries(blogs).map(([category, posts]) => `
                        <div class="blog-category" data-category="${category}">
                            <h3>${category}</h3>
                            ${posts.map(post => `
                                <div class="blog-post">
                                    <h4>${post.title}</h4>
                                    <div class="date">📅 ${post.date}</div>
                                    <p>${post.content}</p>
                                </div>
                            `).join('')}
                        </div>
                    `).join('')}
                </div>
            `
        });
    });
}

async function fetchBlogs() {
    // In real implementation, fetch from Markdown files
    return {
        'CTF': [
            {
                title: "HackTheBox Walkthrough",
                date: "2024-03-15",
                content: "Detailed solution for the XYZ machine..."
            }
        ],
        'Tech Talks': [
            {
                title: "WebAssembly Deep Dive",
                date: "2024-03-20",
                content: "Exploring WASM internals..."
            }
        ]
    };
}