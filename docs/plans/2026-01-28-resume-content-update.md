# Portfolio Site Resume Content Update

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Update all portfolio site content to match the latest resume (Jan 2026).

**Architecture:** Direct content edits across 5 existing React component files. No new files, no structural changes -- just updating text content, data arrays, and dates to reflect current resume.

**Tech Stack:** React, Tailwind CSS (existing site)

---

### Task 1: Update Experience Page (`src/pages/Experience.js`)

**Files:**
- Modify: `src/pages/Experience.js`

**Step 1: Fix Platform Engineer dates and bullets**

Change start date from `'2025-08-01'` to `'2025-09-01'` in the `useEffect` call (line 130).

Change `duration` prop from `Aug 2025 - Present` to `Sep 2025 - Present`.

Replace the Platform Engineer bullet points with resume-accurate content:

```javascript
details={[
  "Operate and extend platform protecting 100M+ messaging endpoints from spam across Verizon's internal and inter-carrier networks.",
  "Replaced legacy OpenStack+Heat workflows with Terraform-based VM orchestration, reducing deployment time from 3-4 hours (6 VMs) to 5 minutes (62 VMs across 4 tenant spaces in multiple states).",
  "Built URL intelligence microservice in Go processing 3,100+ IP/s for ASN lookups; implemented warm caching layer that increased DNS throughput from 120/s to 75,000+/s for repeated domains.",
  "Developed agentic workflow that navigates our environment to detect spam patterns and generate threat intelligence reports, reducing manual investigation time.",
  "Designed data lake architecture for spam intelligence pipeline (BigQuery, Apache NiFi, Redis) with retention policies—currently driving cross-org alignment for implementation."
]}
```

**Step 2: Fix Network Engineer dates and bullets**

Change end date from `'2025-08-01'` to `'2025-09-01'` in `calculateDuration` call (line 131).

Change `duration` prop from `Jun 2024 - Aug 2025` to `Jun 2024 - Sep 2025`.

Replace the Network Engineer bullet points with resume-accurate content:

```javascript
details={[
  "Led automation efforts across Verizon's nationwide Edge sites, developing agentic AI tools to assist engineers in managing projects and troubleshooting edge infrastructure.",
  "Built automation pipeline for site audits, decreasing preparation time by 90% and enabling $100,000+ annual power savings after pilot program.",
  "Automated end-to-end FOA network testing for AWS MEC deployments using Terraform, Ansible, and Python—reduced test suite deployment from 3 hours to seconds per site."
]}
```

**Step 3: Consolidate Rutgers roles**

The resume shows a single "Level 3 Supervisor" entry covering May 2022 - Jun 2024. Remove the 4 separate Rutgers cards (L1 Consultant, L2 Specialist, L3 Asst Supervisor, L3 Supervisor) and replace with a single consolidated card:

```javascript
<ExperienceCard
  title="Level 3 Supervisor, Office of Information Technology"
  company="Rutgers University"
  type="Part-time"
  duration="May 2022 - Jun 2024"
  location="Piscataway, NJ"
  details={[
    "Supervised and trained 200+ consultants while managing high-priority technical escalations; achieved top ticket resolution rate with 20% reduction in average response time."
  ]}
/>
```

**Step 4: Verify the build compiles**

Run: `cd /Users/alex/Code/Personal-Portfolio-Site && npm start` (or build)
Expected: No compile errors

**Step 5: Commit**

```bash
git add src/pages/Experience.js
git commit -m "feat: update experience page with latest resume content"
```

---

### Task 2: Update About Page (`src/pages/About.js`)

**Files:**
- Modify: `src/pages/About.js`

**Step 1: Update introduction paragraph**

Replace the current intro text referencing "Network Engineer" with updated content reflecting Platform Engineer, Anti-Spam Systems role:

```javascript
<p className="text-gray-800 dark:text-gray-300 text-lg leading-relaxed transition-colors duration-300">
  I am Alessandro Gonzaga, a Platform Engineer at Verizon specializing in Anti-Spam Systems.
  I operate and extend platforms protecting 100M+ messaging endpoints, building microservices in Go,
  designing data lake architectures, and driving automation with Terraform and agentic AI workflows.
  Previously, I led automation across Verizon's nationwide Edge sites and supervised 200+ consultants
  at Rutgers University's Office of Information Technology.
</p>
```

**Step 2: Update "Current Role at Verizon" section**

Change heading from "Current Role at Verizon" to reflect anti-spam platform work:

```javascript
<h3 className="text-xl font-heading font-semibold text-primary-400 mb-4">
  Current Role at Verizon
</h3>
<p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed transition-colors duration-300">
  At Verizon, I operate and extend the platform protecting 100M+ messaging endpoints from spam.
  My work includes replacing legacy workflows with Terraform-based orchestration, building Go
  microservices for URL intelligence, and designing data lake architectures with BigQuery,
  Apache NiFi, and Redis.
</p>
```

Update the bullet points to:
- Anti-Spam Platform Engineering
- Infrastructure Automation (Terraform, Go)
- Data & Intelligence Pipelines
- Cross-org Technical Leadership

**Step 3: Update "Development Skills" tags**

Replace the skills array `['Python', 'Java', 'JavaScript', 'React', 'SQL', 'Docker', 'Git', 'Nginx']` with resume-accurate skills:

```javascript
{['Python', 'Go', 'Terraform', 'Bash', 'SQL', 'JavaScript', 'Docker', 'Kubernetes'].map((skill) => (
```

**Step 4: Update "Core Specializations" list**

Replace with:
- Anti-Spam & Security Platforms
- Infrastructure Automation (Terraform, Ansible)
- Data Pipelines (BigQuery, NiFi, Redis)
- Kubernetes & Container Orchestration

**Step 5: Commit**

```bash
git add src/pages/About.js
git commit -m "feat: update about page with current role and skills"
```

---

### Task 3: Update Skills Component (`src/components/SkillsComponent.js`)

**Files:**
- Modify: `src/components/SkillsComponent.js`

**Step 1: Update skills array to match resume**

Replace the skills array with updated technologies from the resume:

```javascript
export const skills = [
  {
    name: 'Infrastructure (K8s, Docker, Terraform)',
    level: 95,
    projectRoute: '/projects?filter=Kubernetes'
  },
  {
    name: 'Python & Automation',
    level: 90,
    projectRoute: '/projects?filter=Python'
  },
  {
    name: 'Go',
    level: 80,
    projectRoute: '/projects?filter=Go'
  },
  {
    name: 'Data & ML (BigQuery, NiFi, Splunk)',
    level: 75,
    projectRoute: '/projects?filter=AI'
  },
  {
    name: 'Cloud Platforms (AWS, GCP)',
    level: 85,
    projectRoute: '/projects?filter=Networking'
  },
  {
    name: 'Networking & Security',
    level: 90,
    projectRoute: '/projects?filter=Networking'
  },
  {
    name: 'React & Frontend',
    level: 80,
    projectRoute: '/projects?filter=React'
  }
];
```

**Step 2: Commit**

```bash
git add src/components/SkillsComponent.js
git commit -m "feat: update skills to match current resume"
```

---

### Task 4: Update Projects Page (`src/pages/Projects.js`)

**Files:**
- Modify: `src/pages/Projects.js`

**Step 1: Update Homelab project to match resume**

The resume calls this "Self-Hosted Infrastructure Platform" with specific technologies. Update the homelab entry:

```javascript
{
  title: "Self-Hosted Infrastructure Platform",
  description: "3-node HA Proxmox cluster running multi-node Talos Kubernetes with supporting VMs/LXCs for load balancing, storage, DNS, and routing. Includes AI/ML inference stack serving LLaMA, Mistral, and Gemma models, plus multi-tenant VPN mesh across multiple ISPs.",
  githubLink: "https://github.com/gnzaga",
  projectLink: "/projects/homelab",
  technologies: ['Kubernetes', 'Docker', 'Networking', 'AI', 'Go']
}
```

**Step 2: Remove the separate Kubernetes Cluster entry**

The resume consolidates this into the Self-Hosted Infrastructure Platform. Remove the "Kubernetes Cluster" project card since it's redundant with the updated homelab entry.

**Step 3: Add 'Go' to the technology filter set**

Adding Go as a technology tag to the homelab project (done in step 1) will automatically make it available in the filter buttons since `allTechnologies` is derived from the projects array.

**Step 4: Commit**

```bash
git add src/pages/Projects.js
git commit -m "feat: update projects to match resume, consolidate homelab"
```

---

### Task 5: Update Home Page (`src/pages/Home.js`)

**Files:**
- Modify: `src/pages/Home.js`

**Step 1: Update the tagline/description**

The current description mentions "Architecting next-gen adaptive platforms with AI/ML, agentic automation, and vector search to secure 100M+ messaging endpoints." -- update to be more concise and match the resume tone:

```javascript
<motion.p
  className="text-gray-600 dark:text-gray-300 text-lg md:text-xl mb-4 leading-relaxed"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.4, duration: 0.5 }}
>
  Platform Engineer at Verizon protecting 100M+ messaging endpoints from spam.
</motion.p>
<motion.p
  className="text-gray-500 dark:text-gray-400 text-base md:text-lg mb-12 leading-relaxed max-w-2xl mx-auto"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 0.5 }}
>
  Building microservices in Go, automating infrastructure with Terraform, and designing
  data pipelines to power next-gen anti-spam intelligence.
</motion.p>
```

**Step 2: Update stats section**

Update the stats to be more accurate:

```javascript
{ number: "3+", label: "Years Experience", icon: "📊" },
{ number: "100M+", label: "Endpoints Protected", icon: "🛡️" },
{ number: "200+", label: "Team Members Led", icon: "👥" },
{ number: "24/7", label: "Infrastructure Managed", icon: "🔧" }
```

**Step 3: Commit**

```bash
git add src/pages/Home.js
git commit -m "feat: update home page stats and descriptions"
```

---

### Task 6: Update resume PDF file reference

**Files:**
- Check: `src/res/` directory for the resume PDF

**Step 1: Copy the new resume PDF into the project**

```bash
cp "/Users/alex/Downloads/RESUME (1).pdf" src/res/Alessandro_Gonzaga_Resume.pdf
```

This overwrites the old resume so the download link on the Home page serves the updated version.

**Step 2: Commit**

```bash
git add src/res/Alessandro_Gonzaga_Resume.pdf
git commit -m "chore: update resume PDF"
```

---

### Task 7: Final verification

**Step 1: Run the dev server and verify all pages render**

```bash
cd /Users/alex/Code/Personal-Portfolio-Site && npm start
```

Verify:
- Home page: updated stats, description
- About page: updated intro, role description, skills
- Experience page: 3 cards (Platform Engineer, Network Engineer, Rutgers consolidated), correct dates and bullets
- Projects page: updated homelab entry, no separate K8s entry

**Step 2: Final commit if any fixes needed**
