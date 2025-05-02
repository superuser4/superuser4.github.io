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
        
        if (config.width) {
            windowEl.style.width = `${config.width}px`;
        }
        if (config.height) {
            windowEl.style.height = `${config.height}px`;
        }
        
        windowEl.querySelector('.title').textContent = config.title;
        windowEl.querySelector('.content').innerHTML = config.content;
    
        // Add to taskbar
        const taskbarItem = this.createTaskbarItem(config.title, windowEl.id);
        this.taskbar.appendChild(taskbarItem);
    
        // Window controls
        clone.querySelector('.close').addEventListener('click', () => this.closeWindow(windowEl.id));
        clone.querySelector('.maximize').addEventListener('click', () => this.maximizeWindow(windowEl.id));
        clone.querySelector('.minimize').addEventListener('click', () => this.minimizeWindow(windowEl.id));
    
        // Make draggable
        this.makeDraggable(windowEl);
    
        document.getElementById('windows-container').appendChild(clone);
        this.windows.push(windowEl);
        this.bringToFront({target: windowEl});
        
        return {el: windowEl};
    }

    createTaskbarItem(title, windowId) {
        const item = document.createElement('div');
        item.className = 'taskbar-item';
        item.innerHTML = `📄 ${title}`;
        item.dataset.windowId = windowId;
        item.addEventListener('click', () => {
            const win = document.getElementById(windowId);
            if (win.style.display === 'none') {
                win.style.display = 'block'; // Show window again if it was minimized
            }
            this.bringToFront({target: win});
        });
        return item;
    }
    

    makeDraggable(windowEl) {
        const titleBar = windowEl.querySelector('.title-bar');
        let isDragging = false;
        let offset = [0, 0];

        titleBar.addEventListener('mousedown', e => {
            if (windowEl.dataset.maximized === 'true') return; // Prevent dragging when maximized
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

    maximizeWindow(windowId) {
        const windowEl = document.getElementById(windowId);
    
        // Toggle maximize
        if (windowEl.classList.contains('maximized')) {
            // Restore previous size/position
            const { left, top, width, height } = windowEl.dataset;
            windowEl.style.left = left;
            windowEl.style.top = top;
            windowEl.style.width = width;
            windowEl.style.height = height;
            windowEl.classList.remove('maximized');
        } else {
            // Store current size/position
            windowEl.dataset.left = windowEl.style.left;
            windowEl.dataset.top = windowEl.style.top;
            windowEl.dataset.width = windowEl.style.width;
            windowEl.dataset.height = windowEl.style.height;
    
            // Maximize
            windowEl.style.left = '0px';
            windowEl.style.top = '0px';
            windowEl.classList.add('maximized');
        }
    }    
}
