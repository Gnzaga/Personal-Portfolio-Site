export default {
    "slug": "kubernetes-adventure",
    "date": "January 16, 2025",
    "title": "Kubernetes: The Next Frontier",
    "summary": "A detailed account of setting up a Kubernetes cluster using HP Prodesk G3s, including the installation of Debian, K3s, and MetalLB, and deploying a personal website to the cluster.",
    "paragraphs": [
      "I have wanted to work with kubernetes for a good amount of time now; however, I haven't seemed to get it working how I wanted it to go yet. I tried running it on virtual machines, and I was able to get it working, but it didn't feel right running projects in containers on Kubernetes inside VM's on my ProxMox server. In any case, I still had some other projects to work on and so I wasn't pressed to really learn it. But it always remained a topic of interest to me.",
      "Eventually, in late December I stumbled across 3 HP Mini PC's with intel i5 7500T processors. They didn't come with any RAM or Hard drives, but at $100 plus shipping for the entire lot, I couldn't pass it up. I bought them and they arrived in early January. I spent a few days cleaning them up and installing RAM and storage into them. I kitted each with 16gb of ram, and a 250gb nvme drive. I spent an evening last week installing Debian on each, working out the hostnames and assigning IP addresses to each, along with setting up SSH, ansible and other tools I would need to manage them.",
      "After I was able to get each of these set up with tools - as well as mapping my network storage Samba drive to each of them, I was ready to start setting up the cluster.",
      "I decided to go with K3s for this cluster due to its simple installation, but with it's management being the same as K8's, I get the best of both worlds. I installed K3s on the first Mini PC, and then joined the other two to the cluster. I then installed MetalLB as my load balancer, and was able to get it working. I then deployed my portfolio website to the cluster. I was incredibly surprised when it just worked. I could see on my cluster the multiple pods running, and I could see the load balancer distributing the traffic to the different pods. Everything worked from accessing the website, to navigation to even working with my chatbot - due to the Ollama API being on a host separate from the kubernetes cluster, all of the traffic was able to be routed correctly."
    ],
    "tags": [
        { label: "AI", url: "/projects?filter=AI" },
        { label: "React", url: "/projects?filter=React" },
        { label: "Docker", url: "/projects?filter=Docker" },
        { label: "Kubernetes", url: "/projects?filter=Kubernetes" }
    ],
    
    "images": [],
    "links": [
        { label: "Related Projects", url: "/projects?filter=Kubernetes" }
    ]
  };
  