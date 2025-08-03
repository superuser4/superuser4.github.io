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
                        </ul>
                    </li>
                    <li>Some cool things I've done:
                        <ul>
                            <li> I've attended CS Games 2025 hosted in Quebec City, University of L'aval with a team of 20 </li>
                            <li> UWindsor Winhacks participant </li>
                            <li> Winner of CTF competitions in cybersecurity workshops offered by the University of Windsor </li>
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
			<li><a href="https://github.com/superuser4">My Github</a></li>
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
                <h2>📝 Blog Page Link</h2>
		<ul>
			<li><a href="https://superuser4.github.io/blogs/index.html">Blogs</a></li>
		</ul>
            </div>
        `
    });
}
