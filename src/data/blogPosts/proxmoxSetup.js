export default {
  "slug": "custom-pc-proxmox-setup",
  "date": "July 23, 2024",
  "title": "Building My Custom Proxmox Server",
  "summary": "A detailed account of setting up a Proxmox server using spare PC components and a second GPU, highlighting the challenges and rewards of working with a hypervisor for the first time.",
  "paragraphs": [
    "Earlier this year I upgraded my PC with a new CPU, Motherboard and RAM. Recently I got a new GPU for my computer and this left me with effectively my entire old PC as spare parts... Armed with a second GPU lent to me by one of my best friends Ryan Ferrer ( thank you Ryan ), I decided to build a server. I installed a Ryzen 9 5900x, 128gb of ram, 2TB of NVME SSD Storage into an old PC case. I decided to use Proxmox as my hypervisor. This was my first time working with a hypervisor and the process of installing and configuring it was both challenging and incredibly rewarding.",
    "Initially I got the proxmox server up and running, but wasn't able to get PCIE passthrough working. I started by familiarizing myself with the Proxmox interface and creating a few VMs. Using my linux distribution of choice - debian - I was able to get a few VMs up and running. I tested different settings and their performance - and I even migrated a longtime minecraft server that I had been running on my PC to a VM on the server.",
    "I also installed 5 2TB hard drives in a RAID 5 configuration to store data on the server. I set these up in a container on my proxmox server and formed a Samba share to access the data from my other computers. I started using this as a network storage for my personal files and as backups for my family.",
    "After some time, I was able to finally crack the PCIE passthrough on both 1080ti GPU's and set up a monster Debian VM with 8 CPU cores, 32gb of memory and both GPU's to start doing AI/ML workloads. The drivers were difficult to set up at first but after some trial and error I was able to even get past that and started running Ollama on this server via the VM. I was able to run some AI workloads on this server and it was incredibly rewarding to see the power of the server in action."
  ],
  "tags": [
    { label: "AI", url: "/projects?filter=AI" },
    { label: "React", url: "/projects?filter=React" },
    { label: "Docker", url: "/projects?filter=Docker" },
    { label: "Kubernetes", url: "/projects?filter=Kubernetes" }
  ],
  "images": [],
  "links": [
    { label: "Related Projects", url: "/projects" },
    { label: "Ryan's Linkedin", url: "https://www.linkedin.com/in/ryanrferrer/"}
  ]
};
