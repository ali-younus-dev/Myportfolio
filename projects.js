/* Project content preserved from the original portfolio. */
window.PORTFOLIO = {
  "projects": [
    {
      "id": "service",
      "name": "Service Portal",
      "category": "Systems",
      "headline": "Operations, without the chaos.",
      "summary": "A complete complaint-to-cash platform. Every request, technician and spare part, connected.",
      "color": "sage",
      "role": "Sole architect and developer · PHP, MySQL, vanilla JS",
      "status": "Live · production system",
      "story": [
        "<strong>The problem.</strong> Field repairs across several cities ran on calls, WhatsApp and paper. Nobody could see what was open, who owned it, or what parts were sitting in a technician's van.",
        "<strong>What I built.</strong> A complaint-to-cash platform: a six-step public request form, a call-centre desk, zone-locked admin roles, a map with route building, a technician app, a service-centre workflow, parts custody with approvals, customer tracking and ratings, and a forecasting deck for management.",
        "<strong>About the screens.</strong> A demo build of the production system, with invented data for a fictional metal-works company. No real names, brands or figures appear."
      ],
      "facts": [
        {
          "value": "9",
          "label": "role types, each scoped by city zone on the server"
        },
        {
          "value": "800+",
          "label": "fault codes in 7 categories, searchable"
        },
        {
          "value": "8,000+",
          "label": "spare-part units tracked across 500+ SKUs with a full ledger"
        },
        {
          "value": "14 days",
          "label": "demand forecast with 95% confidence band, computed in PHP"
        }
      ],
      "tags": [
        "PHP 7.4",
        "MySQL",
        "Leaflet + OSRM",
        "Claude API",
        "PWA",
        "xlsx export",
        "QR job cards"
      ],
      "images": [
        {
          "src": "svc-dashboard.webp",
          "caption": "Service desk dashboard",
          "note": "Live application · demo data"
        },
        {
          "src": "svc-map.webp",
          "caption": "Dispatch map",
          "note": "Live application · demo data"
        },
        {
          "src": "svc-call.webp",
          "caption": "Call desk with AI diagnosis",
          "note": "Live application · demo data"
        },
        {
          "src": "svc-tech.webp",
          "caption": "Technician app",
          "note": "Live application · demo data",
          "device": "mobile"
        }
      ],
      "mobileDescription": "Built for technicians on the move: today’s jobs, fault details, parts to bring and one-tap navigation. Demo screens with sample data."
    },
    {
      "id": "ams",
      "name": "Attendance & HR Platform",
      "category": "Systems",
      "headline": "A better way to show up.",
      "summary": "Attendance, HR and live operations. Built around the people who make it all happen.",
      "color": "lavender",
      "role": "Sole architect and developer · Node.js, PostgreSQL, React PWA",
      "status": "Live · production system",
      "story": [
        "<strong>The problem.</strong> Buddy punching, uneven leave rules between cities and month-end payroll arguments.",
        "<strong>What I built.</strong> A multi-city platform with four-layer anti-spoofing clock-in, per-location weekly-off rules, a leave balance engine, late-deduction and probation logic, field-worker tracking, executive analytics, a live operations board, and technician KPI scorecards that merge service jobs with attendance. An Arena gamification layer with a 52-item cosmetics shop turned punctuality into a game.",
        "<strong>About the screens.</strong> A demo build of the production system, with invented data for a fictional metal-works company. No real names, brands or figures appear.",
        "The employee app, shown in the gallery, handles one-tap clock-in, leave requests and balances. A native React Native version is in development."
      ],
      "facts": [
        {
          "value": "100+",
          "label": "employees across 10 departments"
        },
        {
          "value": "Multi-city",
          "label": "each location with its own weekly-off and geofence rules"
        },
        {
          "value": "4-layer",
          "label": "anti-spoofing on every clock-in"
        },
        {
          "value": "52",
          "label": "unlockable cosmetics in the Arena reward shop"
        }
      ],
      "tags": [
        "Node.js",
        "Express",
        "PostgreSQL",
        "React PWA",
        "Geofencing",
        "React Native (in progress)"
      ],
      "images": [
        {
          "src": "ams-live.webp",
          "caption": "Live shift board",
          "note": "Live application · demo data"
        },
        {
          "src": "ams-analytics.webp",
          "caption": "Attendance analytics",
          "note": "Live application · demo data"
        },
        {
          "src": "ams-employee.webp",
          "caption": "Employee record",
          "note": "Live application · demo data"
        },
        {
          "src": "ams-mobile.webp",
          "caption": "Employee mobile app",
          "note": "Live application · demo data",
          "device": "mobile"
        }
      ],
      "mobileDescription": "Designed for everyday use on a phone: one-tap clock-in, attendance history, leave requests and balances. React PWA; demo screens with sample data."
    },
    {
      "id": "face",
      "name": "Face-Recognition Attendance",
      "category": "AI & automation",
      "headline": "Your face. Your clock-in.",
      "summary": "Five guided poses, a live landmark mesh and a kiosk that knows who just walked in.",
      "color": "blue",
      "role": "Designed and built end to end · enrolment, kiosk and attendance link",
      "status": "Pilot · test mode",
      "story": [
        "<strong>The problem.</strong> Card swipes and manual sign-ins let people clock in for each other.",
        "<strong>What I built.</strong> A face-recognition clock-in system: guided enrolment with five poses and a quality score for each capture, a live landmark mesh so staff see what the camera sees, and a full-screen kiosk that greets the person and refuses a second punch with an \"Already recorded\" message. A test mode lets it run beside the live system before it records anything.",
        "<strong>About the screens.</strong> A demo build of the production system, with invented data for a fictional metal-works company. No real names, brands or figures appear."
      ],
      "facts": [
        {
          "value": "5",
          "label": "guided poses per enrolment, each quality-scored"
        },
        {
          "value": "1 tap",
          "label": "to retake any pose without starting over"
        },
        {
          "value": "Duplicate guard",
          "label": "second punch is refused with the time of the first"
        },
        {
          "value": "Test mode",
          "label": "proves accuracy before attendance goes live"
        }
      ],
      "tags": [
        "Computer vision",
        "Kiosk UI",
        "Enrolment flow",
        "Anti-proxy attendance"
      ],
      "images": [
        {
          "src": "face-enrol.webp",
          "caption": "Guided enrolment",
          "note": "Live application · demo data"
        },
        {
          "src": "face-kiosk.webp",
          "caption": "Kiosk, duplicate punch refused",
          "note": "Live application · demo data"
        }
      ]
    },
    {
      "id": "solar",
      "name": "Solar Sweep ERP",
      "category": "Systems",
      "headline": "Clean energy. Clear operations.",
      "summary": "The operating system for my own solar-care venture. From first enquiry to final invoice.",
      "color": "sand",
      "role": "Founder-developer · PHP, MySQL",
      "status": "Live · own venture",
      "story": [
        "<strong>The problem.</strong> A solar panel washing company scheduling by phone, with no view of cash or commissions.",
        "<strong>What I built.</strong> A seven-role operations platform: CRM, scheduling and reminders, a washer mobile portal, invoicing and finance, geo-locked attendance, inventory and payroll, with WhatsApp messaging that understands Pakistani phone formats."
      ],
      "facts": [
        {
          "value": "7",
          "label": "user roles from owner to washer"
        },
        {
          "value": "430",
          "label": "active clients on the book"
        },
        {
          "value": "260+",
          "label": "jobs completed in a single month"
        },
        {
          "value": "9",
          "label": "modules from CRM to payroll"
        }
      ],
      "tags": [
        "PHP",
        "MySQL",
        "WhatsApp",
        "Geo-attendance"
      ],
      "images": [
        {
          "src": "solar-dash.webp",
          "caption": "Dashboard",
          "note": "Finances redacted"
        },
        {
          "src": "solar-fin.webp",
          "caption": "Finance and P&L",
          "note": "Finances redacted"
        }
      ]
    },
    {
      "id": "finbot",
      "name": "Finance Analyst Bot",
      "category": "AI & automation",
      "headline": "Numbers, with a narrative.",
      "summary": "An AI finance analyst that turns transactions into a P&L, useful explanations and timely alerts.",
      "color": "pink",
      "role": "Designed and built for a client · P&L preparation and alerts",
      "status": "Client build · confidential",
      "story": [
        "<strong>The problem.</strong> Month-end meant assembling the profit-and-loss by hand, then hunting through it for what had gone wrong.",
        "<strong>What I built.</strong> A bot that arranges the P&amp;L from the transaction data, explains in plain language what looks wrong (cost jumps, margin slips, possible duplicate payments, uncategorised entries) and sends the important updates, such as receivables and upcoming payments. The screen shown is a demo with invented figures, because the client version is confidential."
      ],
      "facts": [
        {
          "value": "Arranged",
          "label": "P&L laid out and compared with the previous month"
        },
        {
          "value": "Explained",
          "label": "flags what is wrong, in plain words"
        },
        {
          "value": "Alerts",
          "label": "overdue receivables and upcoming payments"
        },
        {
          "value": "Confidential",
          "label": "client data never shown; demo uses sample figures"
        }
      ],
      "tags": [
        "Finance automation",
        "P&L analysis",
        "Anomaly flags",
        "Client build"
      ],
      "images": [
        {
          "src": "fin-bot.webp",
          "caption": "Demo screen, sample data",
          "note": "Demo · invented figures"
        }
      ]
    },
    {
      "id": "scraper",
      "name": "Terminal Web Scraper",
      "category": "AI & automation",
      "headline": "Less searching. More finding.",
      "summary": "One command turns scattered web results into structured research, with sources attached.",
      "color": "sage",
      "role": "Designed and built for a client · research from the terminal",
      "status": "Client build · command line",
      "story": [
        "<strong>The problem.</strong> Finding details about a business or a topic meant opening dozens of tabs and copying things across by hand.",
        "<strong>What I built.</strong> A terminal tool that takes a query, searches the web, opens the results and follows the contact pages, then extracts the useful details and prints them with the sources that back each one. The screen shown is a demo with sample data."
      ],
      "facts": [
        {
          "value": "One command",
          "label": "query in, structured details out"
        },
        {
          "value": "Sourced",
          "label": "every detail lists where it was found"
        },
        {
          "value": "Exportable",
          "label": "results saved to a file for the next step"
        },
        {
          "value": "Terminal",
          "label": "no interface to install or learn"
        }
      ],
      "tags": [
        "Web scraping",
        "CLI tooling",
        "Data extraction",
        "Client build"
      ],
      "images": [
        {
          "src": "scraper.webp",
          "caption": "Terminal demo, sample data",
          "note": ""
        }
      ]
    },
    {
      "id": "bogo",
      "name": "Bogo Solutions",
      "category": "Websites",
      "headline": "Built to turn heads. And grow.",
      "summary": "A digital agency website with clear services, confident storytelling and a path to enquiry.",
      "color": "lavender",
      "role": "Digital marketing agency, Canada · project manager, led the full online presence",
      "status": "Live · Canada",
      "story": [
        "<strong>The brief.</strong> A Canadian growth agency needed one online presence that explains its services and proves results to owners who want more traffic, leads and revenue.",
        "<strong>What I did.</strong> As project manager I headed the whole online presence: the website, its messaging and structure, the service pages for search, paid search, conversion and social, and the growth stories that show the work in action."
      ],
      "facts": [
        {
          "value": "End to end",
          "label": "online presence, led as project manager"
        },
        {
          "value": "4+",
          "label": "service lines presented: SEO, paid search, conversion and social"
        }
      ],
      "tags": [
        "Project management",
        "Web design",
        "SEO",
        "Content and messaging",
        "Lead generation"
      ],
      "images": [
        {
          "src": "bogo-hero.webp",
          "caption": "Home page",
          "note": ""
        },
        {
          "src": "bogo-services.webp",
          "caption": "Services",
          "note": ""
        },
        {
          "src": "bogo-results.webp",
          "caption": "Growth stories",
          "note": ""
        }
      ]
    },
    {
      "id": "gforce",
      "name": "G Force Security Website",
      "category": "Websites",
      "headline": "Confidence at first click.",
      "summary": "A Canadian security website designed around trust, clear coverage and a guided quote journey.",
      "color": "sand",
      "role": "Security guard company serving Canada · built from scratch",
      "status": "Live · Canada",
      "story": [
        "<strong>The brief.</strong> A licensed Canadian security firm needed a site that wins quotes: clear services, locations across provinces and a fast way to ask for protection.",
        "<strong>What I built.</strong> The whole site from scratch: a bold home page, service and location pages, a guided quote pop-up that asks only what is relevant to the type of site, and credibility sections for certifications, awards and years of service."
      ],
      "facts": [
        {
          "value": "Solo build",
          "label": "designed and built by me alone"
        },
        {
          "value": "Canada",
          "label": "Ontario, BC and national coverage"
        }
      ],
      "tags": [
        "Built from scratch",
        "Responsive",
        "Quote funnel",
        "Credibility pages",
        "Lead capture"
      ],
      "images": [
        {
          "src": "gf-hero.webp",
          "caption": "Home page",
          "note": ""
        },
        {
          "src": "gf-quote.webp",
          "caption": "Guided quote pop-up",
          "note": ""
        },
        {
          "src": "gf-about.webp",
          "caption": "Credentials and vision",
          "note": ""
        }
      ]
    },
    {
      "id": "alpine",
      "name": "Alpine Canada Website",
      "category": "Websites",
      "headline": "A home for the next run.",
      "summary": "An editorial, bilingual experience for the people behind Canada’s national ski team.",
      "color": "blue",
      "role": "Website for the national ski federation · web design and development",
      "status": "Live · Canada",
      "story": [
        "<strong>The brief.</strong> One site for racers, coaches, officials, clubs and fans of Canada's national ski team, in both official languages.",
        "<strong>What it does.</strong> A pill-shaped navigation that splits visitors into Team &amp; News, Competition, Racer, Coach, Official, Club and Safe Sport, a featured-news hero, category-tagged story cards, social links, a donate call to action and a French switch on every page."
      ],
      "facts": [
        {
          "value": "7",
          "label": "audience sections in the main navigation"
        },
        {
          "value": "EN / FR",
          "label": "bilingual from the top bar"
        }
      ],
      "tags": [
        "Responsive",
        "Bilingual",
        "News CMS",
        "Editorial design"
      ],
      "images": [
        {
          "src": "alpine-hero.webp",
          "caption": "Home and featured news",
          "note": ""
        },
        {
          "src": "alpine-news.webp",
          "caption": "News cards",
          "note": ""
        }
      ]
    },
    {
      "id": "amaza",
      "name": "Amaza Homes Studio Site",
      "category": "Websites",
      "headline": "Imagine your space differently.",
      "summary": "A premium interiors experience with an AI material visualiser and an editorial point of view.",
      "color": "pink",
      "role": "Design, development and brand growth",
      "status": "Live · Amaza Homes",
      "story": [
        "<strong>The problem.</strong> A premium Karachi kitchen and interiors studio whose website looked like a catalogue.",
        "<strong>What I built.</strong> A dark, editorial site with a material visualiser powered by the Gemini API, so clients can preview finishes in a real kitchen, plus a gallery, process and journal pages and a radar-style location map."
      ],
      "facts": [
        {
          "value": "7",
          "label": "finishes in the AI material visualiser"
        },
        {
          "value": "Gemini",
          "label": "API behind the visualiser"
        }
      ],
      "tags": [
        "Gemini API",
        "Canvas",
        "SEO"
      ],
      "images": [
        {
          "src": "amaza-about.webp",
          "caption": "About",
          "note": ""
        },
        {
          "src": "amaza-vis.webp",
          "caption": "Material visualiser",
          "note": ""
        },
        {
          "src": "amaza-find.webp",
          "caption": "Find us",
          "note": "Phone redacted"
        }
      ]
    }
  ],
  "sections": {
    "more": [
      "<h4>StockIQ</h4><p>An offline-first warehouse audit app. Staff scan barcodes with no signal, and a serial number resolves to its model through a prefix table. Photo evidence, guided counts and a five-second undo.</p><div class=\"tags\"><span class=\"tag\">PWA</span><span class=\"tag\">Offline</span><span class=\"tag\">Barcode</span>",
      "<h4>Four-seat VoIP call centre</h4><p>Designed a FreePBX and Asterisk call centre for a regional office, with a carrier SIP trunk and AMI screen-pops into the Service Portal.</p><div class=\"tags\"><span class=\"tag\">FreePBX</span><span class=\"tag\">Asterisk</span><span class=\"tag\">SIP</span>",
      "<h4>Boss feed &amp; KPI bridge</h4><p>A token-secured JSON API that lets the management portal read service performance live, cached for two minutes, plus a scorecard that joins service and attendance data per technician.</p><div class=\"tags\"><span class=\"tag\">REST</span><span class=\"tag\">Caching</span><span class=\"tag\">Integration</span>",
      "<h4>Launch campaign kit</h4><p>For a flagship product launch: a single-file cinematic digital invitation, a 17-slide pitch deck for local management and head office, a 38-item event checklist and an AI video production workflow.</p><div class=\"tags\"><span class=\"tag\">HTML</span><span class=\"tag\">Deck</span><span class=\"tag\">AI video</span>",
      "<h4>Stock audit engine</h4><p>Reconciled a 264-SKU physical count against the system report and generated a clear variance PDF for management.</p><div class=\"tags\"><span class=\"tag\">Python</span><span class=\"tag\">PDF</span>",
      "<h4>Office network governance</h4><p>DNS-level filtering with logging behind the office router, so distracting sites and games are blocked while business tools like WhatsApp keep working.</p><div class=\"tags\"><span class=\"tag\">DNS</span><span class=\"tag\">Networking</span>",
      "<h4>Trex Software House</h4><p>My own studio. We build CRM, ERP and custom software for businesses, with websites and social media management as add-ons, and move clients to monthly plans.</p><div class=\"tags\"><span class=\"tag\">CRM</span><span class=\"tag\">ERP</span><span class=\"tag\">Custom software</span>",
      "<h4>Digital growth for client brands</h4><p>Took Cleaning 365 Services and G Force Security, both in Canada, from no online presence to a working one with a website, search ranking, Instagram growth and paid ads.</p><div class=\"tags\"><span class=\"tag\">SEO</span><span class=\"tag\">Paid ads</span><span class=\"tag\">Instagram</span>",
      "<h4>Business listing recovery</h4><p>Regained control of a company's Google Business Profile after a former employee had swapped in their own contact number, and locked access down so it cannot repeat.</p><div class=\"tags\"><span class=\"tag\">Google Business</span><span class=\"tag\">Access control</span>"
    ],
    "depth": [
      "<span class=\"mono\">Silent data loss</span><h4>Roles that vanished on their own</h4><p>Users kept losing access and it looked like a breach. The cause was one page that redefined a database enum on every load, which makes MySQL blank any value not in the new list.</p><p><b>Fix:</b> removed the statement, converted the column to a plain string, and made the admin screen detect and repair the old schema.</p>",
      "<span class=\"mono\">Wrong by default</span><h4>Jobs filed to the wrong city</h4><p>A lookup quietly returned the default city whenever a city was missing, so jobs from other provinces landed in the wrong zone for months.</p><p><b>Fix:</b> a province-first, case-insensitive lookup covering 110 cities, applied at all three entry points including the call-centre page that never set a zone.</p>",
      "<span class=\"mono\">Access control</span><h4>Reports that leaked the whole country</h4><p>Older analytics and export pages pre-dated zone scoping, so a regional manager could download company-wide data.</p><p><b>Fix:</b> audited every legacy page and locked scope on the server, overriding anything in the URL.</p>",
      "<span class=\"mono\">Performance</span><h4>From 3 fps to 19 fps</h4><p>A flagship animated page crawled because of fixed backgrounds, live SVG turbulence and animated blend modes.</p><p><b>Fix:</b> moved the effects to GPU-composited transforms. Same look, roughly six times smoother in testing.</p>"
    ],
    "stack": [],
    "beyond": [
      "<h4>Brands built from zero</h4><p>Took four businesses from no digital footprint to a working one: Instagram growth, websites, SEO and paid advertising.</p><div class=\"brands\"><span class=\"tag\">National appliance brand</span><span class=\"tag\">Amaza Homes</span><span class=\"tag\">Cleaning 365 Services · Canada</span><span class=\"tag\">G Force Security · Canada</span>",
      "<h4>Board-level strategy</h4><p>Authored a five-year transformation plan for a national appliance brand covering retail format, mobile experiences and a digital-first platform, and the AI-driven commercial production workflow behind its product films.</p><div class=\"tags\"><span class=\"tag\">Strategy</span><span class=\"tag\">Product film</span><span class=\"tag\">Go-to-market</span>"
    ],
    "ai": [
      "<h4>Finance analyst bot</h4><p>Arranges the monthly P&amp;L, explains what looks wrong in plain language and sends the important updates. Built for a client.</p><div class=\"tags\"><span class=\"tag\">Finance automation</span><span class=\"tag\">Anomaly flags</span>",
      "<h4>Terminal research scraper</h4><p>One command searches the web, follows the contact pages and prints the details it finds with the sources behind each one. Built for a client.</p><div class=\"tags\"><span class=\"tag\">Web scraping</span><span class=\"tag\">CLI</span>",
      "<h4>AI diagnosis in the Service Portal</h4><p>Reads the model, symptoms and history, then suggests the likely fault with a confidence meter and the tools and parts to bring. It also writes the monthly service report.</p><div class=\"tags\"><span class=\"tag\">Claude API</span><span class=\"tag\">Prompt design</span>",
      "<h4>AI summaries for HR</h4><p>One tap turns the day's attendance into a plain-language summary and flags the people and departments that need attention.</p><div class=\"tags\"><span class=\"tag\">LLM summary</span><span class=\"tag\">HR analytics</span>",
      "<h4>Kitchen material visualiser</h4><p>Clients pick a finish and see it in a real kitchen. Built on the Gemini API for a Karachi interiors studio.</p><div class=\"tags\"><span class=\"tag\">Gemini API</span><span class=\"tag\">Image generation</span>",
      "<h4>AI commercial production</h4><p>Product films made with Nano Banana Pro keyframes and Google Flow with Veo 3.1 clips, with a written guide so anyone on the team can repeat it.</p><div class=\"tags\"><span class=\"tag\">Nano Banana Pro</span><span class=\"tag\">Veo 3.1</span><span class=\"tag\">Playbook</span>",
      "<h4>Outreach automation</h4><p>A Google Apps Script system that sends cold outreach for my software house and tracks every follow-up in a sheet, so no lead goes quiet.</p><div class=\"tags\"><span class=\"tag\">Apps Script</span><span class=\"tag\">Sheets</span>",
      "<h4>Custom bots and AI strategy</h4><p>I build complete bots and AI workflows for businesses, and write the plan that decides where AI belongs and where it does not. Ask for a walkthrough.</p><div class=\"tags\"><span class=\"tag\">Bots</span><span class=\"tag\">Workflow design</span><span class=\"tag\">Strategy</span>"
    ]
  }
};
