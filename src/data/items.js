export const items = [
    {
      id: 1,
      title: "About Me.txt",
      icon: "📄",
      content: (
        <div className="text-file">
          <h2>About Me</h2>
          <p>Hi! I'm a CS student passionate about web development...</p>
        </div>
      )
    },
    {
      id: 2,
      title: "Projects.exe",
      icon: "💻",
      content: (
        <div className="projects">
          <h2>My Projects</h2>
          <ul>
            <li>Project 1</li>
            <li>Project 2</li>
          </ul>
        </div>
      )
    },
    {
      id: 3,
      title: "Contact.ini",
      icon: "📧",
      content: (
        <div className="contact">
          <h2>Contact Me</h2>
          <p>Email: student@example.com</p>
        </div>
      )
    }
  ];