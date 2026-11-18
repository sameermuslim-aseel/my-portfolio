// All the content shown on the site lives here.
// Edit this file to add a project, a job, a testimonial or a skill. index.html stays the same.
//
// Text is plain text. To add a link inside any text, write [link text](https://example.com).

const SITE_DATA = {
  services: [
    {
      icon: "design",
      title: "UI/UX Design",
      text: "Designing engaging, user-friendly interfaces that elevate digital experiences and keep users at the center."
    },
    {
      icon: "laptop",
      title: "Web Development",
      text: "Building dynamic, responsive, and performance-optimized websites tailored to user needs and business goals."
    },
    {
      icon: "mobile",
      title: "Mobile Apps",
      text: "Creating intuitive and innovative mobile applications with a focus on functionality and seamless user experience."
    },
    {
      icon: "camera",
      title: "Photography",
      text: "Capturing moments with creative and technical expertise to tell compelling visual stories."
    }
  ],
  testimonials: [
    {
      name: "Rod A. McLeod",
      position: "Publisher at SHELLDRAKE PUBLISHING",
      date: "November 8, 2023",
      avatar: "images/Rod.webp",
      text: "He is a very bright young man with excellent credentials. His skill level as a website designer and IT specialist are remarkable. I have worked closely with Sameer over the past year in the development and implementation of complicated web authoring programs and found his skill sets to be excellent."
    },
    {
      name: "Nancy Speidel",
      position: "Founder and CEO iSAW International",
      date: "June 3, 2023",
      avatar: "images/nancy-avatar.webp",
      text: "Sameer Muslim, who worked as a volunteer and freelancer for iSAW International. He is a highly skilled technical developer and designer. He has a vast range of technical capabilities ranging from web development to applications and integration."
    },
    {
      name: "Niyaz M. Khairy",
      position: "Owner of Niyaz.design",
      date: "March 12, 2022",
      avatar: "images/Niyaz-avatar.webp",
      text: "Sameer was hired to create a corporate identity. We were very pleased with the work done. He has a lot of experience and is very concerned about the needs of client."
    },
    {
      name: "Wares Muhammadi",
      position: "CEO Wama Solution Technology",
      date: "Feb 17, 2023",
      avatar: "images/Wares-avatar.webp",
      text: "I had the chance to work with Sameer Muslim during my journey as Tech Recruiter at Wama Solution group. The experience was very positive thanks to his contribution. Sameer was very supportive and always willing to leverage the Frontend recruitment process. He is very commited, flexible and understands the need of other business areas."
    }
  ],
  resume: [
    {
      title: "Certification",
      icon: "certificate",
      items: [
        {
          role: "Visual Elements of User Interface Design",
          at: [
            {
              name: "Coursera",
              url: "https://www.coursera.org/learn/visual-elements-user-interface-design"
            }
          ],
          date: "Dec 2024",
          place: "Online",
          points: [
            "Learned to apply color theory, typography, and visual hierarchy to create clear and engaging interfaces.",
            "Gained skills in designing icons, buttons, and interactive elements for improved user interaction.",
            "Learned to integrate visual elements with functional design for seamless user experience."
          ]
        },
        {
          role: "Principles of UI/UX Design",
          at: [
            {
              name: "Coursera",
              url: "https://www.coursera.org/learn/principles-of-ux-ui-design"
            }
          ],
          date: "Nov 2024",
          place: "Online",
          points: [
            "Gained expertise in user-centered design, focusing on understanding and addressing real user needs and behaviors.",
            "Learned to structure content and create intuitive navigation flows through information architecture best practices.",
            "Developed skills in wireframing and prototyping, building interactive models to validate design ideas.",
            "Applied visual design principles, including typography, color theory, layout, and hierarchy to enhance usability.",
            "Conducted usability testing and iterative design improvements to optimize user satisfaction and engagement."
          ]
        },
        {
          role: "The Complete 2023 Web Development Bootcamp by Angela Yu",
          at: [
            {
              name: "Udemy",
              url: "https://www.udemy.com/course/the-complete-web-development-bootcamp/"
            }
          ],
          date: "2023 - Present",
          place: "Online",
          points: [
            "In-depth training in web development, covering HTML, CSS, JavaScript, Node.js, and MongoDB.",
            "Hands-on experience in building responsive and dynamic web applications.",
            "Familiarity with front-end and back-end development principles.",
            "Developed practical skills through real-world projects and coding exercises.",
            "Acquired proficiency in utilizing industry-standard tools and frameworks."
          ]
        },
        {
          role: "Flutter Development",
          at: [
            {
              name: "Google Developers",
              url: "https://developers.google.com/learn/pathways/intro-to-flutter"
            }
          ],
          date: "September 2020",
          place: "Online",
          points: [
            "Built beautiful and responsive user interfaces for desktop, mobile, and web applications.",
            "Utilized Flutter to natively compile applications from a single codebase, streamlining development processes.",
            "Developed a deep understanding of Flutter's architecture and best practices."
          ]
        },
        {
          role: "Android Development course",
          at: [
            {
              name: "Udacity",
              url: "https://www.udacity.com/course/android-basics-user-input--cd0343"
            }
          ],
          date: "March 2018",
          place: "Online",
          points: [
            "Completed a comprehensive series of four courses covering fundamental Android development skills",
            "User Interface Design, Multi-screen Applications, User Input Handling, Networking in Android",
            "Instructors: Kunal Chawla, Lyla Fujiwara, Katherine Kuan",
            "Acquired hands-on experience in developing Android applications through practical projects and exercises."
          ]
        }
      ]
    },
    {
      title: "Education",
      icon: "education",
      items: [
        {
          role: "English Language",
          at: [
            {
              name: "Cambridge International Organization for Academic English"
            }
          ],
          date: "July 2020",
          place: "Balkh, Afghanistan"
        },
        {
          role: "Bachelor Degree of Computer Science (BCS)",
          at: [
            {
              name: "Aria University"
            }
          ],
          date: "Dec 2018",
          place: "Balkh, Afghanistan"
        },
        {
          role: "High School",
          at: [
            {
              name: "Abomuslim Khorasani High School"
            }
          ],
          date: "Sep 2014",
          place: "Balkh, Afghanistan"
        }
      ]
    },
    {
      title: "Experience",
      icon: "experience",
      items: [
        {
          role: "Product Manager ([Buy Good](https://aseelapp.com/buy-good))",
          at: [
            {
              name: "Aseel Technology Inc.",
              url: "https://aseelapp.com/about"
            }
          ],
          date: "July 2025 – present",
          place: "DC, USA-Remote",
          about: "Lead the end-to-end product development process for the Buy Good marketplace, focusing on user research, strategic product planning, and seamless buyer–seller experiences across the platform.",
          points: [
            "Conducted comprehensive UX and UI audits to improve marketplace usability and conversion.",
            "Led user research and case studies with key sellers and buyers to inform product decisions.",
            "Developed a structured product roadmap aligned with Aseel’s strategic goals.",
            "Improved cross-functional workflows and documentation between design, engineering, and marketing teams.",
            "Drove data-informed product iterations based on analytics and user feedback."
          ]
        },
        {
          role: "UI/UX Designer",
          at: [
            {
              name: "Aseel Technology Inc.",
              url: "https://aseelapp.com/about"
            }
          ],
          date: "Nov 2024 – June 2025",
          place: "DC, USA-Remote",
          about: "Contributed to designing intuitive and engaging web and mobile experiences for Aseel’s global impact-driven platform, empowering artisans and bridging underdeveloped communities to the global digital economy.",
          points: [
            "Redesigned the [Sell Good](https://aseelapp.com/about) platform and the [Seller Landing Page](https://aseelapp.com/about), and implemented improvements for the Aseel website, enhancing usability, engagement, and visual consistency.",
            "Conducted user research, surveys, and usability testing to identify pain points and inform design decisions.",
            "Developed user personas, sitemaps, and user flows for intuitive navigation and interaction.",
            "Created wireframes, interactive prototypes, and high-fidelity designs, iterating based on user feedback.",
            "Maintained design system consistency, accessibility compliance (WCAG), and collaborated with cross-functional teams for seamless execution."
          ]
        },
        {
          role: "Freelance Digital Technology",
          at: [
            {
              name: "iSAW International",
              url: "https://isaw.org/"
            }
          ],
          date: "Feb 2023 – present",
          place: "Arizona, USA",
          about: "International Strategic Accelerator for Woman or iSAW helps enterprises make a dramatic impact for woman in their workplace that contributes to narrowing the gender equality gap globally.",
          points: [
            "Managed organization›s website, overseeing user and content management.",
            "Conducted debugging and implemented new features to enhance website",
            "Evaluated and managed user engagement on the iSAW LIFT platform."
          ]
        },
        {
          role: "Freelancer (Part-Time)",
          date: "Jan 2022 – present",
          place: "Online",
          about: "Dynamic and versatile freelancer with a comprehensive skill set in web development, mobile application development, and graphic design. Successfully completed projects for prominent clients, including ali.com, babor.com, niyaz.design, and more.",
          points: [
            "Developed and optimized responsive portfolio websites [niyaz.desgin](niyaz.design).",
            "Launched a dynamic website for [The Triangle Tranch](https://thetriangletranch.com/) with intuitive sections and seamless booking functionality.",
            "Designed graphics, logos, and marketing materials, contributing significantly to brand identity for various clients.",
            "Applied troubleshooting skills to refine website performance and ensure optimal functionality."
          ]
        },
        {
          role: "UI/UX Designer",
          at: [
            {
              name: "Wama Solution Technology"
            }
          ],
          date: "Mar 2021 – Dec 2022",
          place: "India Remote",
          points: [
            "Designed user interfaces for the company’s website and mobile app, improving user experience and engagement through intuitive layouts and navigation.",
            "Collaborated with cross-functional teams to create visually appealing designs that aligned with brand guidelines and user needs.",
            "Developed various design assets, including icons and graphics, to enhance overall user experience across digital platforms."
          ]
        },
        {
          role: "University Lecturer (Part-Time)",
          at: [
            {
              name: "Balkh University",
              url: "https://ba.edu.af/"
            },
            {
              name: "Sadat Private University"
            }
          ],
          date: "Sep 2020 - Oct 2021",
          place: "Balkh, Afghanistan",
          points: [
            "Taught programming languages, computer fundamentals, and office automation to +750 students over two semesters.",
            "Developed course policies aligning study material with industry needs for the Programming subject.",
            "Created video tutorials and up-to-date materials to keep students informed about the latest trends in programming and office automation."
          ]
        },
        {
          role: "IT Technician",
          at: [
            {
              name: "Network Zone ISP"
            }
          ],
          date: "Jan 2019 - Dec 2020",
          place: "Balkh, Afghanistan",
          about: "Network Zone ISP is a prominent telecommunications company providing internet services across Afghanistan. It boasts a wide clientele, including international and governmental organizations such as American and German camps in Balkh, GIZ Mazar, UNDP Mazar, and various consulates like Tajikistan, Uzbekistan, and Pakistan.",
          points: [
            "Conducted on-site installations and troubleshooting for new internet connections using UBNT and MikroTik devices.",
            "Installed and configured diverse networking systems, including Wireless ViMax, Vsat, and Microwave PtP, using RocketDish M5-.",
            "Collaborated with international and governmental clients, overseeing the establishment of service rooms, CC cameras, and telephone networks.",
            "Provided prompt technical assistance to customers via phone, email, and in-person interactions.",
            "Offered guidance to field engineers in the installation, troubleshooting, and maintenance of internet connections."
          ]
        },
        {
          role: "Intern Developer",
          at: [
            {
              name: "Saawis",
              url: "https://saawis.com/"
            }
          ],
          date: "July 2017 - Nov 2018",
          place: "Balkh, Afghanistan",
          about: "Saawis is a leading software development company in Afghanistan, specializing in delivering customized and reliable software solutions to government entities and international organizations.",
          points: [
            "Acquired hands-on experience with Java, Android, XML, and UI/UX fundamentals.",
            "Developed proficiency in version control tools like Git, GitHub, and Slag.",
            "Strengthened programming skills through practical application in real projects."
          ]
        },
        {
          role: "Co-founder and Editor in chief (Part-Time)",
          at: [
            {
              name: "Zerone E-Magazine",
              url: "https://pubhtml5.com/homepage/vazt/"
            }
          ],
          date: "July 2017 - Sep 2019",
          place: "Afghanistan",
          about: "The first electronic, scientific and technological magazine that aims to strengthen the culture of using technology, and raise the level of public awareness of new technologies.",
          points: [
            "Launched E-magazine in 2017 with Afghan computer science students, creating content to inform about the tech world.",
            "Managed 6 editions, each over 30 pages, accessible on Magziter and PubHTML5 for various audiences.",
            "workshops on design and online safety for +450 attendees, enhancing their professional skills."
          ]
        }
      ]
    },
    {
      title: "Volunteer Work",
      icon: "volunteer",
      items: [
        {
          group: "2019 - 2021"
        },
        {
          role: "Volunteer",
          at: [
            {
              name: "GDG Balkh",
              url: "https://www.facebook.com/gdgbalkh/"
            }
          ],
          place: "Balkh, Afghanistan",
          about: "Google Developers Group Balkh (GDG Balkh) is a chapter of GDG, a global program initiated and sponsored by Google. GDG Balkh was an active developer community for programmers and tech enthusiasm in Afghanistan.",
          points: [
            "Organized 6 events with +300 attendees, 30 international and local speakers.",
            "working in a team of 2 organizers and +8 volunteers. Events had huge impact for local developers.",
            "online events with the help of 3 co-organizers and 5 volunteers, turning GDG Balkh events into the most influenced events for developers in Balkh.",
            "Helped with 5 GDSC (Google Developer Student Clubs) to organize events for universities students."
          ]
        },
        {
          role: "Advisor",
          at: [
            {
              name: "Afghan Women’s Network-Kundoz",
              url: "https://awn-af.org/"
            }
          ],
          place: "Kunduz, Afghanistan",
          points: [
            "Advised and contributed to events for women›s empowerment in Kunduz.",
            "AWN is an umbrella network of 127 women-focused NGOs and 3500 individual members.",
            "Established in 1995, AWN is well-recognized by government and non-government organizations."
          ]
        },
        {
          role: "Organizer and Designer",
          at: [
            {
              name: "Future Leader Summit",
              url: "https://www.facebook.com/futureleaderssummit2019/"
            }
          ],
          place: "Balkh, Afghanistan",
          points: [
            "Contributed to a three-day intercountry platform focusing on UN 2030 (SDG) agenda.",
            "Collaborated with young leaders and activists from Kazakhstan, Uzbekistan, Afghanistan, and Tajikistan.",
            "Engaged in planning, implementation, and evaluation of global issues to strengthen youth participation.",
            "Facilitated awareness on SDGs goals and proposed self-help solutions with over 1,700 participants."
          ]
        },
        {
          group: "2017 - 2019"
        },
        {
          role: "Community Co-Organizer",
          at: [
            {
              name: "GDG Kabul",
              url: "https://www.facebook.com/gdgbalkh/"
            }
          ],
          place: "Kabul, Afghanistan",
          points: [
            "Google Developers Group Kabul is a chapter of GDG, a global program initiated and sponsored by Google.",
            "Led GDG Kabul, organizing DevFest Kabul 2019 with +400 attendees and media coverage.",
            "Headed event branding, ensuring consistency in design across assets."
          ]
        },
        {
          role: "Co-Organizer and Designer",
          at: [
            {
              name: "Kindness Station",
              url: "https://www.facebook.com/Estgahemehrabani1mazaresharif"
            }
          ],
          place: "Balkh, Afghanistan",
          points: [
            "Co-founder of a volunteer-driven initiative aiding innocent people and war-displaced refugees.",
            "Led efforts in providing warm clothes and blood to children with thalassemia.",
            "Assisted over 3000 individuals in various areas of need."
          ]
        }
      ]
    }
  ],
  skills: [
    "UI/UX Design",
    "Product Management",
    "Miro",
    "User Research",
    "Wireframing",
    "Prototyping",
    "User Testing",
    "Interaction Design",
    "Visual Design",
    "Information Architecture",
    "UX Research",
    "Accessibility (WCAG)",
    "Figma",
    "Adobe XD",
    "Photoshop",
    "Illustrator",
    "Design Systems",
    "Case Studies",
    "A/B Testing",
    "Service Design",
    "Customer Journey Mapping",
    "Persona",
    "Mobile App Design",
    "Web App Design",
    "Product Roadmapping",
    "Feature Prioritization",
    "Agile & Scrum"
  ],
  categories: [
    "Product Design",
    "Open Source Project",
    "Application",
    "Web Development"
  ],
  projects: [
    {
      title: "Buy Good & Sell Good · Aseel",
      category: "Product Design",
      tags: [
        "Product Design"
      ],
      url: "https://aseelapp.com/buy-good",
      image: "images/banners/aseel-banner.webp",
      alt: "Buy Good marketplace by Aseel",
      description: "Aseel's marketplace connecting artisans from underserved communities with buyers worldwide. I led the product design and redesign of the seller platform: UX audits, user research, roadmap and high-fidelity UI."
    },
    {
      title: "Tikko",
      category: "Application",
      tags: [
        "Open Source Project"
      ],
      url: "https://github.com/sameermuslim-aseel/Tikko",
      image: "images/banners/tikko-banner.webp",
      alt: "Tikko family task app banner",
      description: "A mobile-first Persian (RTL) PWA for family tasks: a household admin assigns recurring daily tasks and everyone ticks them off, with streaks and stats. Built with Next.js, Supabase and Tailwind."
    },
    {
      title: "Toosha",
      category: "Application",
      tags: [
        "Open Source Project"
      ],
      url: "https://github.com/sameermuslim/Toosha",
      image: "images/banners/Tosha-app.webp",
      alt: "Toosha mobile app banner",
      description: "This application is designed to help Muslims track and manage their daily prayers, providing information, reminders, analytics, and more."
    },
    {
      title: "Niyaz.Design",
      category: "Web Development",
      tags: [
        "Web Development"
      ],
      url: "https://niyaz.design",
      image: "images/banners/neyaz-design.webp",
      alt: "Niyaz.design website banner",
      description: "A dynamic, fully responsive portfolio for a UX/UI designer, with sections for projects, skills and professional background."
    },
    {
      title: "Maamela",
      category: "Application",
      tags: [
        "Open Source Project"
      ],
      url: "https://github.com/sameermuslim/Molkiyat",
      image: "images/banners/mamela-banner.webp",
      alt: "Maamela mobile app banner",
      description: "An Android property-listing app for the Afghan market. Users can search houses, flats and rooms by province, type and price range, and post their own listings."
    },
    {
      title: "MK portfolio",
      category: "Web Development",
      tags: [
        "Web Development"
      ],
      url: "https://sameermuslim.github.io/Sameer-MK-portfolio/",
      image: "images/banners/Screenshot-sameer-mk.webp",
      alt: "MK Sameer website banner",
      description: "A portfolio website showcasing projects and services, and a glimpse into my skills and interests."
    },
    {
      title: "The Triangle T Ranch",
      category: "Web Development",
      tags: [
        "Web Development"
      ],
      url: "https://thetriangletranch.com/",
      image: "images/banners/the-triangle-t.webp",
      alt: "Triangle T website banner",
      description: "One of Arizona's most famous guest ranches became one of America's best-kept secrets during WW2, then a location of choice for several well-known and loved Western movies."
    },
    {
      title: "FAQ App",
      category: "Application",
      tags: [
        "Application"
      ],
      url: "https://github.com/sameermuslim/faq-android-app",
      image: "images/banners/faq-app.webp",
      alt: "FAQ Mobile app banner",
      description: "An Android app built in Java for displaying frequently asked questions. The app utilizes RecyclerView, a horizontal list layout, loaders, and supports multiple screens."
    },
    {
      title: "Sticky Wall",
      category: "Web Development",
      tags: [
        "Open Source Project"
      ],
      url: "https://github.com/sameermuslim/sticky-wall",
      image: "images/banners/screenshot-stikcky-wall.webp",
      alt: "sticky-wall website banner",
      description: "A simple Sticky wall interface design. with a sidebar containing categories and menus, as well as a main panel for displaying sticky notes."
    },
    {
      title: "50 Projects 50 Days",
      category: "Web Development",
      tags: [
        "Open Source Project"
      ],
      url: "https://github.com/sameermuslim/50projects-50days",
      image: "images/banners/50Projects50days.webp",
      alt: "50 Projects 50 Days website banner",
      description: "This repository contains the code for various projects that I built as a part of this challenge."
    },
    {
      title: "Animation CSS",
      category: "Web Development",
      tags: [
        "Open Source Project"
      ],
      url: "https://github.com/sameermuslim/css-animation",
      image: "images/banners/screenshot-animation.webp",
      alt: "Animation website banner",
      description: "This project showcases the capabilities of CSS animations using the popular \"animate.css\" library. With this library, you can effortlessly add stylish animations to elements on your website, enhancing visual appeal and user experience."
    }
  ],
  publications: [
    {
      title: "0-1 Magazine 0th Edition",
      category: "Publish",
      date: "July 17, 2017",
      url: "https://pubhtml5.com/vazt/udhn/",
      image: "images/banners/zerone0.webp",
      alt: "ZerOneAf Magazine Blog banner",
      text: "The first electronic, educational, scientific and technological magazine in Afghanistan aims to strengthen the culture of using technology and raise awareness among the people about new technologies."
    },
    {
      title: "0-1 Magazine 1st Edition",
      category: "Publish",
      date: "Sep 10, 2018",
      url: "https://pubhtml5.com/vazt/zceq/",
      image: "images/banners/zerone1.webp",
      alt: "ZerOneAf Magazine Blog banner",
      text: "The first edition of ZerOneAF magazine has reached you. In this edition, you can read new and good content, such as ZerOne updates, the latest gadgets, the new generation of hard drives is made of DNA, Quantum IQ, internet of things and other beautiful content."
    },
    {
      title: "0-1 Magazine 2nd Edition",
      category: "Publish",
      date: "Feb 1, 2018",
      url: "https://pubhtml5.com/vazt/tjql/",
      image: "images/banners/zerone2.webp",
      alt: "ZerOneAf Magazine Blog banner",
      text: "In the second edition of ZerOneAF magazine, you will read about social network addicts, important tips for designing, introducing and comparing six digital assistants, moving files without headaches, how torrent works, game world news, and other beautiful content."
    },
    {
      title: "0-1 Magazine 3rd Edition",
      category: "Publish",
      date: "Mar 21, 2018",
      url: "https://pubhtml5.com/vazt/qmhy/",
      image: "images/banners/zerone3.webp",
      alt: "ZerOneAf Magazine Blog banner",
      text: "The third version of ZerOneAf includes these contents: Internet springboard, Would it be possible to make a new Internet?, Does a USB drive get heavier as you store more file on it?, What happens to a person's data after they die? and Read other beautiful content."
    },
    {
      title: "0-1 Magazine 4th Edition",
      category: "Publish",
      date: "Jan 5, 2019",
      url: "https://pubhtml5.com/vazt/ejoi/",
      image: "images/banners/zerone4.webp",
      alt: "ZerOneAf Magazine Blog banner",
      text: "In this edition, you will read: Alphabet numbers are an effective way to advertise, new gadgets, My Question.com, the biggest Google conference in Afghanistan, we are hacked and read other beautiful content."
    },
    {
      title: "0-1 Magazine 5th Edition",
      category: "Publish",
      date: "Mar 27, 2019",
      url: "https://pubhtml5.com/vazt/wflr/",
      image: "images/banners/zerone5.webp",
      alt: "ZerOneAf Magazine Blog banner",
      text: "Here in this version you will read: Google Stadia, Facebook will become the central bank of the world, how to increase the unsend time method, animation means creating a new world and read other beautiful content."
    }
  ]
};
