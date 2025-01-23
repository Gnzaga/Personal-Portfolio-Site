export default {
    "slug": "learning-ai-at-home",
    "date": "July 30, 2024",
    "title": "Experimenting with AI at Home",
    "summary": "An exploration of AI and large language models, detailing the process of setting up a Proxmox server to host AI models and creating a chatbot for a personal website.",
    "paragraphs": [
      "I’ve always been curious about AI, and today, I took the plunge into hosting AI models locally. Using my newly built Proxmox server, I set up an environment to run large language models (LLMs). It’s amazing to see the power of AI right in my home lab!",
      "This VM has 8 CPU Cores, 32GB of Memory and two 1080ti GPUs. I've already installed the drivers necessary, as well as CUDA. And so running AI workloads on this server goes quite smoothly.",
      "Running Llama 3 on Ollama, I can get around 50 tokens per second. This is for a roughly 8b parameter model - and so while I could definitely fit this in just one 1080ti, I plan on having multiple concurrent models running on this server.",
      "After testing the Ollama CLI for a while, I ended up installing OpenWebUI via Docker. This is a UI for interacting with Ollama, and it's incredibly useful. I can see the models I have running and interact with the models via the UI. It has features also like multiple user accounts, integration with CAS/LDAP, and the ability to make custom models within the UI. You're able to create custom models with custom system instructions, along with upload files to vectorized stores to use with RAG.",
      "I also realized that there is an application to be had implementing this to my portfolio website. By using RAG with some custom system prompting, I should be able to make a custom model which can serve as an assistant to help people learn more about me. I plan on implementing this soon.",
      "Another application I realize is that I can connect this to my discord bot using the Ollama API, so that my discord bot can be much, much more interactive. I plan on implementing this soon as well.",
      "The next thing that I also should be able to do, is use this to teach others about how to use AI/ML particularly LLM's like my dad, sister and family & friends. I've let quite a few of them know and have given them accounts",
      "",
      "Update: as of January, 2025 I have 18 users on chat.gnzaga.com. They are all friends and family, and I have been able to teach them how to use the system. I have also been able to implement a chatbot on my portfolio website that has access to some information regarding my resume and experience. At the bottom of the website, there is a perpetual chat button that will pull up a window for you to talk to the bot.",
    ],
    "tags": [
        { label: "AI", url: "/projects?filter=AI" },
        { label: "React", url: "/projects?filter=React" },
        { label: "Docker", url: "/projects?filter=Docker" },
        { label: "Kubernetes", url: "/projects?filter=Kubernetes" }
    ],
    "images": [],
    "links": [
        { label: "Related Projects", url: "/projects?filter=AI" },
        { label: "Open WebUI", url: "https://openwebui.com/" },
        { label: "Ollama", url: "https://ollama.com/" },
        { label: "chat.gnzaga.com", url: "https://chat.gnzaga.com/" }
    ]
  };
  