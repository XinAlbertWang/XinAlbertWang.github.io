const USER_CONFIG = {
  name:       "Xin Wang",
  initials:   "XW",
  role:       "PhD Candidate",
  university: "Western University",
  email:      "xwan2552@uwo.ca",
  bio:        "I'm Xin Wang, a sixth-year economics PhD student at Western University. I completed my undergraduate at Sun Yat-sen University studying Economics and Mathematics. My CV can be found here. I am interested in game theory, mechanism design, and behavioral economics.",
  photo:      "",

  stats: [
    { value: "10+",  label: "Publications" },
    { value: "200+", label: "Citations" },
    { value: "5+",   label: "Projects" },
  ],

  links: {
    scholar: "https://scholar.google.com/",
    github:  "https://github.com/",
    twitter: "",
    cv:      "assets/cv.pdf",
  },

  // ───────────────────────────────────────────────
  // ⭐ Job Market Paper
  // ───────────────────────────────────────────────
  jmp: [
    {
      year:     2026,
      title:    "Your Job Market Paper Title",
      authors:  "Your Name",
      venue:    "Job Market Paper",
      links:    { pdf: "assets/jmp.pdf" },
      abstract: "A short abstract summarizing your JMP contribution."
    }
  ],

  // ───────────────────────────────────────────────
  // ⭐ Working Papers
  // ───────────────────────────────────────────────
  working_papers: [
    {
      year:     2025,
      title:    "Working Paper Title 1",
      authors:  "Your Name",
      venue:    "Working Paper",
      links:    { pdf: "assets/wp1.pdf" },
      abstract: ""
    },
    {
      year:     2024,
      title:    "Working Paper Title 2",
      authors:  "Your Name, Co-author",
      venue:    "Submitted",
      links:    {},
      abstract: ""
    }
  ],

  // ───────────────────────────────────────────────
  // ⭐ Work in Progress
  // ───────────────────────────────────────────────
  wip: [
    {
      title:    "Project Title 1",
      authors:  "Your Name",
      venue:    "Work in Progress",
      links:    {},
      abstract: "Optional: short description of the idea."
    },
    {
      title:    "Project Title 2",
      authors:  "Your Name",
      venue:    "Early Stage",
      links:    {},
      abstract: ""
    }
  ],

  // ───────────────────────────────────────────────
  // Existing modules (unchanged)
  // ───────────────────────────────────────────────
  publications: [
    {
      year:     2025,
      title:    "Your Paper Title Here",
      authors:  "Your Name, Co-Author 1, Co-Author 2",
      venue:    "Conference / Journal Name 2025",
      links:    { pdf: "#", code: "#" },
      abstract: "A brief summary of your paper's contributions and findings.",
    },
    {
      year:     2024,
      title:    "Another Paper Title",
      authors:  "Your Name, Co-Author 1",
      venue:    "Conference / Journal Name 2024",
      links:    { pdf: "#" },
      abstract: "",
    },
  ],

  projects: [
    {
      name: "Project Name",
      desc: "Brief description of your project and its impact.",
      tags: ["Python", "PyTorch"],
      url:  "#",
    },
  ],

  news: [
    { date: "2025.01", badge: "New",   text: "Paper accepted at Conference 2025!" },
    { date: "2024.09", badge: "Award", text: "Received fellowship / award." },
  ],

  education: [
    { period: "2020–Present", degree: "Ph.D. in Computer Science", institution: "Your University" },
    { period: "2016–2020",    degree: "B.S. in Computer Science",  institution: "Your University" },
  ],

  experience: [
    { period: "Summer 2024", role: "Research Intern", institution: "Research Lab / Company" },
  ],
};
