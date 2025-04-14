class WindowManager {
    constructor() {
        this.windows = [];
        this.zIndex = 100;
        this.taskbar = document.getElementById('taskbar-items');
        
        document.addEventListener('click', this.bringToFront.bind(this));
    }

    createWindow(config) {
        const template = document.getElementById('window-template');
        const clone = template.content.cloneNode(true);
        const windowEl = clone.querySelector('.window');
        
        windowEl.id = `window-${config.id}`;
        windowEl.style.left = `${config.x}px`;
        windowEl.style.top = `${config.y}px`;
        windowEl.querySelector('.title').textContent = config.title;
        windowEl.querySelector('.content').innerHTML = config.content;

        // Add to taskbar
        const taskbarItem = this.createTaskbarItem(config.title, windowEl.id);
        this.taskbar.appendChild(taskbarItem);

        // Window controls
        clone.querySelector('.close').addEventListener('click', () => this.closeWindow(windowEl.id));
        clone.querySelector('.minimize').addEventListener('click', () => this.minimizeWindow(windowEl.id));

        // Make draggable
        this.makeDraggable(windowEl);

        document.getElementById('windows-container').appendChild(clone);
        this.windows.push(windowEl);
        this.bringToFront({target: windowEl});
    }

    createTaskbarItem(title, windowId) {
        const item = document.createElement('div');
        item.className = 'taskbar-item';
        item.innerHTML = `📄 ${title}`;
        item.dataset.windowId = windowId;
        item.addEventListener('click', () => this.bringToFront({target: document.getElementById(windowId)}));
        return item;
    }

    makeDraggable(windowEl) {
        const titleBar = windowEl.querySelector('.title-bar');
        let isDragging = false;
        let offset = [0, 0];

        titleBar.addEventListener('mousedown', e => {
            isDragging = true;
            offset = [
                windowEl.offsetLeft - e.clientX,
                windowEl.offsetTop - e.clientY
            ];
        });

        document.addEventListener('mousemove', e => {
            if (!isDragging) return;
            windowEl.style.left = `${e.clientX + offset[0]}px`;
            windowEl.style.top = `${e.clientY + offset[1]}px`;
        });

        document.addEventListener('mouseup', () => isDragging = false);
    }

    bringToFront(e) {
        const windowEl = e.target.closest('.window');
        if (!windowEl) return;
        
        this.zIndex++;
        windowEl.style.zIndex = this.zIndex;
    }

    closeWindow(windowId) {
        const windowEl = document.getElementById(windowId);
        windowEl.remove();
        this.taskbar.querySelector(`[data-window-id="${windowId}"]`).remove();
    }

    minimizeWindow(windowId) {
        const windowEl = document.getElementById(windowId);
        windowEl.style.display = 'none';
    }
}