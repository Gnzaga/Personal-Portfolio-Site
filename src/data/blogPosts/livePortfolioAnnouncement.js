export default {
    "slug": "live-portfolio-announcement",
    "date": "January 22, 2025",
    "title": "🚀 Its LIVE! My Portfolio Website!",
    "summary": "Announcing the launch of my portfolio website, a project that has been in the works since November 2023. This blog post details the journey of creating, deploying, and maintaining the website, along with the technologies and skills learned along the way.",
    "paragraphs": [
      "Even though I am simply announcing my portfolio website, I'd like to take some time to appreciate the immense amount of time that this project has taken. It wasn't simply a matter of me writing some code and demonstrating it - it was a culmination of all my curiosities and learning throughout 2024. This project has been entirely done by me, from the code written to the CPU and RAM installed into the computers it is hosted on, to the Kubernetes config files, to the CAT6 Cables I custom cut, to the (way too many) installations of Debian on my hosts. This project has given me immense insight into the process of creating, deploying, and maintaining software in production and has inspired me to continue learning. 2024 was incredible for growth, and starting this year I'm excited to see what I and everyone else will accomplish.",
        "📅 The Beginning",
    "I've been working on this project since November 2023, when I first made a sample website in my Rutgers dorm room - just out of curiosity and a desire to learn web development. Over the course of 2024, I've learned a lot more, not just developing my own website but also deploying it, securing it, and serving it on my own hardware.",
        "🏫 At Rutgers",
    "I started in Fall 2023 with the basics of HTML/CSS/JS and a mission to learn more about web development. Over the course of that Fall and the following Spring 2024, I enhanced my website with modern technologies like React and TailwindCSS.",
        "💻 First Deployment",
    "After spending time updating and tailoring my website to my liking, I thought in June after starting my job at Verizon, \"Why not host this on my spare Mini PC as a server?\" That's when I uninstalled Windows on it, installed Debian. Over the beginning of the summer, I began learning how to self-host my website using Nginx as an HTTPS Proxy and Cloudflare to manage DNS Records and WAF.",
        "🐳 Docker!",
    "After initially hosting my server on bare metal Debian, I learned about Docker. It became so much more convenient and flexible to deploy my services, and my eyes were opened to how portable deployments could be. I began hosting a ton of services on Docker, like PiHole, Nginx, my Discord Bot, Databases, and even Minecraft Servers on Docker.",
        "🤖 Implementing AI",
    "Diving into self-hosting, I had a strong interest in the power of AI and Large Language Models. This took my attention for the rest of the summer and into the fall (I even got my dad into AI with a custom model to help him with work!). After upgrading my PC, I took some spare PC parts (along with a second GPU a good friend lent me) and threw together a Proxmox Server - specifically for hosting services along with LLMs via Ollama. I first started just using it as an alternative to tools like ChatGPT, but after learning about what else it could do, I became empowered to do more. Using the power of Retrieval Augmented Generation (RAG), I implemented a way for my self-hosted model to serve as an assistant and to help people wanting to learn about me. I incorporated that into a simple chatbot on my website that has access to some information regarding my resume and experience! At the bottom of the website, there is a perpetual chat button that will pull up a window for you to talk to the bot!",
        "☸️ Kubernetes!",
      "At this point in December, I had been working with Docker for 6 months - BUT Kubernetes was the last frontier I wanted to conquer but hadn’t. It was on my mind, but I wasn’t able to wrap my head around it until I stumbled across 3 HP Prodesk G3s on eBay. They didn’t have RAM or hard drives, but the deal I got was too good to pass up. Now I was ready to take on Kubernetes. On a cold January afternoon, I cleaned and kitted each computer with RAM and storage and installed Debian one by one before putting each of them in my network rack. I formed a K3s Kubernetes Cluster with one as the control plane, with MetalLB as my load balancer. Once I was able to confirm it worked, I added 2 more VMs from one of my Proxmox servers to the cluster and FINALLY deployed my website to it…",
      "🔧 Next Steps",
      "After some testing to ensure the Kubernetes deployment was working as expected, I changed my Nginx configuration to route traffic to the cluster for gnzaga.com. On January 16th, I shut down the container running my portfolio website for the last time. It was officially on Kubernetes. That is where we are today.",
      "This project has taught me so much. From being familiar with web development, to backend API servers, to networking, DevOps, Docker, Kubernetes, AI/ML. I am so proud of this project because it isn’t just one skill I learned - this required me to learn everything from writing software to wiring hardware. It was incredibly interesting, eye-opening, and I am so excited to keep going. In 2025, I hope to add better styling with the help of my tremendously talented sister, commissioning her to make a set of logos for me. After recently deploying a local instance of GitLab to my Kubernetes cluster, I also plan on learning more CI/CD. I haven’t quite cracked it yet - but I know I will soon enough.",
      "I know this was a long read, but thank you to those who read this far. I am so excited to see what we will all accomplish in 2025."
    ],
    "tags": [
        { label: "React", url: "/projects?filter=React" },
        { label: "Docker", url: "/projects?filter=Docker" },
        { label: "Networking", url: "/projects?filter=Networking" },
        { label: "AI", url: "/projects?filter=AI" },
        { label: "Kubernetes", url: "/projects?filter=Kubernetes" }
    ],
    "images": [],
    "links": [
        { label: "Portfolio Website", url: "https://gnzaga.com" },
        { label: "Live Portfolio Announcement Blog Post", url: "https://gnzaga.com/blog/live-portfolio-announcement" },
        { label: "Related Projects", url: "/projects" }
    ]
};