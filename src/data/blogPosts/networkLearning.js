export default {
    slug: "learning-networking",
    date: "May 20, 2024",
    title: "Learning Networking at Home",
    summary: "A look at how I injected new life into my home wifi network, learned about networking and prepared for my new job as a Network Engineer at Verizon.",
    paragraphs: [
        "In February I accepted my offer to a Network Engineer position at Verizon. I am super excited for this role - but I don’t have much practical experience with networking. I have studied networking and know enough for my upcoming start date - and I know I’ll learn a lot on the job - but I haven’t really worked with any networking equipment outside of a normal home router.",
        "Because of this, I headed to Microcenter and picked up a Router, a Switch, a POE Switch, 250ft of Cat6 cable, wire cutters, RJ-45 headers and a few other items. Once I got home I set up my new network alongside my current one. Connected my modem to the Router, router to the switches, switches to the AP’s. I also wired my home office to the switch using existing holes drilled for TV cables before I lived here. The 250ft of CAT6 I bought came in really handy…",
        "After testing my network out, making sure it worked etc. I turned my old router off and moved completely to the new equipment I bought. The first thing I did was test out PiHole as a DNS by connecting a raspberry Pi I had lying around to it. I also set up some additional firewall rules after looking online about what sorts of configurations to set up."
    ],
    tags: [{label:"Networking", url:"/projects?filter=networking"}],
    images: [],
    links: [
        { label: "Related Projects", url: "/projects?filter=networking" }
    ]
};
