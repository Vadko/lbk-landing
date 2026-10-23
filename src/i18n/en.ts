import type { Messages } from "./uk";

export const en = {
  advertisers: {
    title: "Advertise in LBK Launcher",
    description:
      "Advertise your product in LBK Launcher and reach an active audience of Ukrainian gamers.",
    why: {
      title: "Why advertisers choose us",
      imageAlt: "+35% organic audience growth",
      engagement: {
        title: "An engaged audience",
        description: "Players actively use the launcher every day",
      },
      reach: {
        title: "Predictable reach",
        description: "Consistent daily active users and retention",
      },
      demographics: {
        title: "A gaming audience",
        description: "Your ads appear in a relevant, natural setting",
      },
    },
  },
  authorsPopover: { otherAuthors: "Other creators:" },
  catalogList: {
    found: "Found: <b>{total}</b>",
    errorTitle: "Error",
    errorText: "Failed to load games",
    emptyTitle: "No games found",
    emptyText: "Try changing your search filters",
    prevPage: "Previous page",
    page: "Page {page}",
    nextPage: "Next page",
  },
  catalogPage: {
    metaTitle: "Games with Ukrainian localization — {count}+ translations",
    ogTitle:
      "Games with Ukrainian localization — {count}+ translations | LBK Launcher",
    metaDescription:
      "The most comprehensive collection of Ukrainian game translations. Search by title, genre or creator, follow translation progress and install translations with one click in the launcher.",
    keywords:
      "Ukrainian game catalog,games in Ukrainian,Ukrainian language patches,games with Ukrainian localization,Ukrainian game translations",
    title: "Game catalog",
    lead: "Games with Ukrainian translations, all in one place. Find your favorite game and play in Ukrainian.",
  },
  catalogSearch: {
    placeholder: "Search games...",
    clearSearch: "Clear search",
    allStatuses: "All statuses",
    voice: "Voice acting",
    achievements: "Achievements",
    workshop: "From Steam Workshop",
    filtersCount: "Filters: {count}",
    allAuthors: "All creators",
    authorsCount: "Creators: {count}",
    clearFilter: "Clear filter",
    clearAuthors: "Clear filter ({count})",
    authorSearch: "Search creators...",
    authorNotFound: "No creator found",
    authorsFound: "Found: {count}",
    authorsTotal: "Total: {count}",
    sort: {
      name: "By name",
      created_at: "By date added",
      latest_updated_at: "Most recently updated",
      downloads: "Most popular",
    },
  },
  collaboration: {
    title: "Partner with LBK Launcher",
    description:
      "Information for LBK Launcher partners: platform benefits, adding your translations and getting in touch.",
    botMessage:
      "Hello! I would like to add my translation to the launcher:%0A- [which game?]%0A- [did you use AI for the translation?]%0A- [which language did you translate from?]%0A- [which language does the translation replace?]",
    hero: {
      title: "Add your translation to the launcher",
      description:
        "Modern design, an intuitive interface and everything players need to enjoy games in Ukrainian.",
      cta: "Add a translation",
    },
    adminPanel: {
      title: "An easy-to-use dashboard for sharing fan translations",
      description:
        "Our dedicated partner dashboard helps you manage fan translations, from uploading files to delivering them automatically to players.",
      uploads: "Upload and update translations",
      delivery: "Automatic delivery to players",
      moderation: "Moderation and version control",
      cta: "Open the dashboard",
      imageAlt: "LBK Launcher partner dashboard",
    },
    flow: {
      title: "How does it work?",
      register: "Register on the platform and create a profile",
      verifyProfile: "Have your profile verified",
      addTranslation: "Add your game translation and save it",
      awaitReview: "Wait for your translation to be reviewed",
      done: "That's it! Players can now access your translation",
    },
    cta: {
      title: "Ready to work together?",
      description:
        "Get in touch to discuss adding your translation and our partnership terms.",
      button: "Contact us",
    },
    partnersTitle: "Translation teams already working with us",
    stats: {
      title: "Our platform in numbers",
      creators: {
        title: "Translators and teams",
        description: "Active teams and individual translators",
      },
      downloads: {
        title: "Translation downloads",
        description: "Total downloads since the platform launched",
      },
      supporters: {
        title: "Contributions from users",
        description: "The number of times users have supported translators",
      },
    },
    value: {
      title: "Benefits for partners",
      growth: {
        title: "Reach more players",
        description:
          "Add your translation to a platform that already brings together over 20,000 players.",
      },
      convenience: {
        title: "Easy to share and play",
        description:
          "Your players can easily download and install your translation.",
      },
      community: {
        title: "Community support",
        description:
          "Many of our users actively support community initiatives.",
      },
      curator: {
        title: "LBK Steam Curator",
        description:
          "Get your translation featured in LBK's Steam Curator recommendations.",
      },
      feedback: {
        title: "Feedback without forms",
        description: "Collect player feedback without Google Forms.",
      },
      guideDraft: {
        title: "A ready-to-use guide draft",
        description: "Get a draft for your Steam guide.",
      },
      links: {
        title: "All your links in one place",
        description:
          "A dedicated page with all your links and better visibility in search results.",
      },
    },
    audience: {
      title: "Who the platform is for",
      localizationTeams: "Localization teams",
      fanCommunities: "Fan communities",
      indieStudios: "Indie studios",
    },
  },
  donaters: {
    title: "Top supporters",
    description:
      "Support the project and see your name here. Every hryvnia helps Ukrainian localizations grow.",
    heroCta: "Support us on Donatello",
    stats: {
      collected: {
        title: "Total raised",
        description: "Since the project began",
      },
      donors: {
        title: "Supporters",
        description: "Individual users who have supported us",
      },
    },
    leaderboard: {
      title: "Supporter leaderboard",
      name: "Supporter",
      amount: "Total donated",
      lastDonation: "Latest donation",
      today: "Today, {time}",
      yesterday: "Yesterday, {time}",
      daysAgo: "{count, plural, one {# day} other {# days}} ago",
      weeksAgo: "{count, plural, one {# week} other {# weeks}} ago",
      monthsAgo: "{count, plural, one {# month} other {# months}} ago",
    },
    specialThanks: {
      title: "Special thanks",
      description:
        "These people have made an invaluable contribution to the Ukrainian gaming community.",
      messages: {
        vitaliiB:
          "Thank you for letting us play in our own language. It's priceless.",
        mDanyliuk: "You make the impossible possible! The best launcher!",
        moreManUA: "Supporting Ukrainian content is our responsibility.",
      },
    },
    support: {
      imageAlt: "Support LBK Launcher icon",
      title: "Support LBK Launcher",
      description:
        "Every donation helps us rent servers, pay for licenses and support the people creating Ukrainian translations.",
      donate: "Donate now",
      learnMore: "Learn more",
    },
    subscription: {
      title: "Donatello subscription",
      description:
        "Help the platform grow and receive special status and extra features.",
      benefitsTitle: "What does a subscription include?",
      benefitsDescription:
        "Your Donatello token gives you access to our supporter benefits: a gold frame, priority translation requests and closed tests of new launcher features.",
      becomeDonor: "Become a supporter",
      choose: "Choose",
      perMonth: "/ month",
      tiers: { bronze: "Bronze", silver: "Silver", gold: "Gold" },
      features: {
        goldBadge: "Gold badge",
        chatAccess: "Chat access",
        bronzePlus: "Bronze +",
        priorityRequests: "Priority requests",
        earlyAccess: "Early access",
        silverPlus: "Silver +",
        exclusiveMerch: "Exclusive merchandise",
        nameInCredits: "Your name in the credits",
      },
    },
    specialTranslators: {
      earlyHelper: "Helping LBK Launcher grow since the early days",
      launcherTeam: "Launcher team",
    },
  },
  featuredBadge: {
    persona4Golden: "The community's most anticipated translation of 2026",
    dispatch: "The community's best text translation of 2025",
  },
  footer: {
    tagline: "An easy way to install Ukrainian game translations",
    navigation: "Navigation",
    home: "Home",
    catalog: "Game catalog",
    setup: "Installation",
    donaters: "Top supporters",
    collaboration: "Partnerships",
    guides: "Guides and tools",
    techStack: "Technology stack",
    community: "Community",
    legal: "Legal",
    privacy: "Privacy policy",
    termsPlayers: "Terms for players",
    termsTranslators: "Terms for translators",
    copyright:
      "© 2026 LB Team & GGL Studio. Made with <heart></heart> for the Ukrainian language.",
  },
  fundraising: {
    title: "Fundraiser",
    completed: "Goal reached! Thank you to everyone who contributed!",
  },
  gameBreadcrumbs: {
    home: "Home",
    catalog: "Catalog",
    catalogLower: "catalog",
  },
  gameCard: { imageAlt: "{game} — Ukrainian game translation" },
  gameDetail: {
    bannerAlt: "{game} — Ukrainian translation",
    by: "Translation by <team></team>{hasVersion, select, yes { • Version {version}} other {}}",
    otherTranslations: "Other translations of this game",
    gallery: "Gallery",
    aboutTranslation: "About the translation",
    aboutGame: "About the game",
  },
  gameFaq: {
    title: "Frequently asked questions about the {game} translation",
    freeQuestion: "Is the Ukrainian translation of {game} free?",
    freeAnswer:
      "Yes, the {game} translation by {team} is completely free. {kind, select, workshop {Install it in a few clicks through Steam Workshop.} other {Download LBK Launcher and install the translation in a few clicks.}}",
    installQuestion: "How do I install the Ukrainian translation of {game}?",
    installAnswer:
      "{kind, select, workshop {Open Steam, find {game} in Steam Workshop and click Subscribe. The mod will download and install automatically.} other {Download the free LBK Launcher from lbklauncher.com, find {game} in the catalog and click Install. The translation will download and install automatically.}}",
    licenseQuestion:
      "Do I need a licensed copy of the game to install the translation?",
    licenseQuestionNamed:
      "Do I need a licensed copy of {game} to install the translation?",
    licenseAnswer:
      "Yes, you need the original game, {game}, for the translation to work correctly. The translation works with {source, select, launcher {the game's original launcher} other {versions from {platforms}}}.",
    updateQuestion: "How do I update the translation?",
    updateAnswer:
      "{kind, select, workshop {Steam handles translation updates. When the creator publishes a new version, Steam downloads it automatically.} other {LBK Launcher automatically checks for updates. When a new translation version is available, you will receive a notification and can update it with one click.}}",
    voiceQuestion: "Does {game} have Ukrainian voice acting?",
    voiceAnswer:
      "Yes! The {team} team is working on Ukrainian voice acting. Currently, {progress}% of the game has been voiced.",
    softwareName: "{game} — Ukrainian translation by {team}",
  },
  gameGallery: {
    screenshotAlt: "Game screenshot {number}",
    goToSlide: "Go to slide {number}",
    thumbAlt: "Game screenshot thumbnail {number}",
  },
  gameInstall: {
    title: "How to install the Ukrainian translation of {game}",
    download:
      "{kind, select, workshop {<b>Open Steam</b> — this translation is installed through Steam Workshop} other {<b>Download LBK Launcher</b> — a free app for installing Ukrainian game translations}}",
    find: "<b>Find {game}</b> {kind, select, workshop {in Steam Workshop} other {in the launcher catalog}}",
    install:
      "{kind, select, workshop {<b>Click Subscribe</b> — the mod will download and install automatically} other {<b>Click Install</b> — the translation will download and install automatically}}",
    play: "<b>Launch the game</b> and enjoy playing in Ukrainian!",
  },
  gameMeta: {
    gameNotFound: "Game not found",
    translationNotFound: "Translation not found",
    title: "{game} in Ukrainian | Download in LBK Launcher",
    description:
      "Ukrainian translation of {game} by {team}. Download it for free through LBK Launcher.",
    multiDescription:
      "Ukrainian translations of {game} by {teams}. Choose a translation and download it for free through LBK Launcher.",
    keywords:
      "{game},{game} in Ukrainian,{game} Ukrainian translation,{game} Ukrainian language patch,{game} localization,Ukrainian game patches,LBK Launcher",
    ogTitle: "{game} in Ukrainian | LBK Launcher",
    twitterTitle: "{game} in Ukrainian",
    teamTitle:
      "{game} in Ukrainian — translation by {team} | Download in LBK Launcher",
    teamDescription:
      "Ukrainian translation of {game} by {team}. Translation status: {status, select, completed {100%} inProgress {{progress}%} other {early access}}. Find out how to install the Ukrainian language patch automatically with LBK Launcher and start playing in Ukrainian today.",
    teamKeywords:
      "{game} in Ukrainian,{game} Ukrainian translation,{game} {team},{game} Ukrainian language patch,{game} localization,{game} translation,{game} ua,{game} ukrainian,download {game} in Ukrainian,how to translate {game},Ukrainian game patches,LBK Launcher",
    teamOgTitle: "{game} in Ukrainian by {team} | LBK Launcher",
    teamTwitterTitle: "{game} in Ukrainian by {team}",
  },
  gameProgress: {
    title: "Translation progress",
    text: "Text translation",
    editing: "Editing",
    voice: "Voice acting",
    fonts: "Fonts",
    textures: "Textures",
  },
  gameSelect: {
    subtitle:
      "There are {count} translations available for this game. Choose the team you prefer.",
    cardAlt: "{game} by {team}",
    progress: "Progress",
    updated: "Updated: {date}",
  },
  gameSidebar: {
    installTitle: "Install the translation",
    installText:
      "Download LBK Launcher and install the translation with one click",
    downloadLauncher: "Download launcher",
    openInLauncher: "Open in launcher",
    support: "Support",
    supportButton: "Support the translation",
    achievements: "Includes translated achievements",
    stats: "Statistics",
    downloads: "Downloads",
    downloadsFew: "under 20",
    platforms: "Platforms",
    created: "Created",
    updated: "Updated",
    links: "Links",
    website: "Website",
    stores: {
      steam: "View on Steam",
      gog: "View on GOG Galaxy",
      epic: "View on Epic Games Store",
      xbox: "View on Microsoft Store",
      uplay: "View on Ubisoft Store",
      ea: "View in EA App",
    },
  },
  gameStatus: {
    completed: "Complete",
    "in-progress": "Early access",
    planned: "Planned",
    "tech-improvement": "Technical improvements",
  },
  gameVideo: {
    title: "Video",
    watch: "Watch video",
    trailer: "Ukrainian localization trailer",
  },
  globalError: { title: "Something went wrong", retry: "Try again" },
  guidesTools: {
    title: "Guides and tools",
    description:
      "Tools, guides and dictionaries for anyone who wants to try translating games.",
    sections: {
      guides: "Practical guides",
      programs: "Software",
      dictionaries: "Dictionaries",
    },
    items: {
      basics: "The basics",
      addons: "Add-ons",
      unrealModding: "Modding UE 4–5",
      unityTmpFonts: "Replacing TMP fonts in Unity games",
      unityFontDetection: "Finding and replacing fonts in Unity (.ttf/TMP)",
      gimpTextures: "Working with textures in GIMP",
      unityUnrealTools: "Tools for Unity and Unreal Engine",
      imageHeat: "ImageHeat is a program for viewing encoded textures",
      achievementLocalizer: "Steam Achievement Localizer",
      textureTools: "Nvidia Texture Tools",
      gameTerminology: "Gaming and related terminology",
      englishDictionary1: "English dictionary 1",
      englishDictionary2: "English dictionary 2",
      englishDictionary3: "English dictionary 3",
      ukrainianDictionary1: "Ukrainian dictionary 1",
      ukrainianDictionary2: "Ukrainian dictionary 2",
      profanityDictionary:
        "Ukrainian without taboos: a dictionary of profanity and its equivalents",
      etymologyDictionary: "Etymological dictionary of Ukrainian",
      chineseTranscription: "Chinese transcription",
      interjections: "Ukrainian interjections and onomatopoeia",
      frenchNames: "French names",
      germanNames: "German names",
      spanishNames: "Spanish names",
      italianNames: "Italian names",
      romanceTransliteration: "Romance language transliteration",
      germanTransliteration: "German transliteration",
      japaneseTransliteration: "Japanese transliteration (Kovalenko system)",
      chineseTransliteration:
        "Chinese transliteration (Kirsonov-Tsisar system)",
      koreanTranscription: "Korean transcription",
      koreanSoundsTable:
        "Reference table for transliterating Korean sounds into Ukrainian",
      japaneseSubtitles: "Japanese subtitles",
      japaneseDictionary: "Japanese–Ukrainian dictionary",
      lacki23Dictionaries: "Dictionaries by Lacki23",
    },
  },
  landingCommunity: {
    title: "Join the community",
    cards: {
      addGame: {
        title: "Add your game",
        description:
          "Make the Ukrainian translation of your game available to thousands of users.",
        link: "Contact us",
      },
      community: {
        title: "Community",
        description:
          "Join our Telegram channel for news, suggestions and conversations.",
        link: "Join",
      },
      makeTranslation: {
        title: "Create your own translation",
        description: "Useful resources to help you get started.",
        link: "Get started",
      },
    },
  },
  landingCurator: {
    title: "LBK keeps track of translations",
    description:
      "Your trusted Steam Curator — follow us so you never miss an update.",
    joinGroup: "Join the group",
    followCurator: "Follow the curator",
  },
  landingFaq: {
    title: "Frequently asked questions",
    items: {
      howItWorks: {
        question: "How does it work?",
        answer:
          "Download the launcher and it will automatically find games installed on your device. Choose a game and click Install translation. That's it!",
      },
      games: {
        question: "Which games are supported?",
        answer:
          "We currently support {count}+ games, and the list keeps growing. It includes popular AAA titles, indie games and classics. You can browse the full list in the launcher.",
      },
      safety: {
        question: "Is LBK Launcher safe to use?",
        answer:
          "Yes, the launcher's source code is open for inspection. Before installing a translation, the launcher can back up the original game files so you can restore them later.",
      },
      free: {
        question: "Is the launcher free?",
        answer:
          "Yes, LBK Launcher is completely free and always will be. We make it for the Ukrainian gaming community.",
      },
      platforms: {
        question: "Which platforms is the launcher available for?",
        answer:
          "LBK Launcher is available for Windows, macOS and Linux in Flatpak, AppImage and RPM formats. Steam Deck is fully supported too.",
      },
      addTranslation: {
        question: "How do I add my translation to the launcher?",
        answer:
          "Contact us on Telegram through <bot>@lbk_launcher_bot</bot>. We'll discuss the details and help you add your translation.",
      },
      workshop: {
        question: "Is Steam Workshop supported?",
        answer:
          "For these translations, LBK Launcher displays information and provides a direct link to their Steam page.",
      },
      workshopUpdates: {
        question: "Do Steam Workshop translations update automatically?",
        answer:
          "LBK Launcher tells you that the translation is available. Steam handles installation and updates; the Workshop page's creator is responsible for keeping its information current.",
      },
      sources: {
        question: "Where do the translations come from?",
        answer:
          "We work with leading translation teams and independent creators. You can also add your translation to our catalog through the Telegram bot.",
      },
      techStack: {
        question: "What is the launcher built with?",
        answer:
          "The launcher uses Electron, React and TypeScript, with a local SQLite database synchronized through self-hosted Supabase. <link>Explore the architecture and technology stack</link> of all three projects, their shared backend and infrastructure.",
      },
      uninstall: {
        question:
          "How do I remove a translation and restore the original game?",
        answer:
          "Select the game in the launcher and click Uninstall translation. The launcher will automatically restore the original files from the backup. Backups are stored locally and do not expire.",
      },
      support: {
        question: "What should I do if something goes wrong?",
        answer:
          "Contact support through the Telegram bot <bot>@lbk_launcher_bot</bot>. We'll help you find the cause and a solution.",
      },
    },
  },
  landingGallery: {
    title: "Take a look at the launcher",
    description:
      "Modern design, an intuitive interface and everything you need to enjoy games in Ukrainian.",
    items: {
      main: {
        alt: "LBK Launcher main screen",
        label: "Main screen",
        description:
          "A catalog of games with Ukrainian translations. Search, filter and install localizations with one click.",
      },
      translation: {
        alt: "Game page in LBK Launcher",
        label: "Translation page",
        description:
          "A translation page with a description, screenshots, system requirements and other details.",
      },
      settings: {
        alt: "LBK Launcher settings",
        label: "Settings",
        description:
          "Flexible settings for animations, translation visibility, notifications and automatic updates.",
      },
      notifications: {
        alt: "LBK Launcher notifications",
        label: "Notifications",
        description:
          "Get notified about new translations and updates to the ones you have installed.",
      },
      details: {
        alt: "Game details in LBK Launcher",
        label: "Translation details",
        description:
          "Detailed translation information: progress, team, version and description.",
      },
      download: {
        alt: "Download progress in LBK Launcher",
        label: "Downloading",
        description:
          "Fast downloads and automatic installation directly into the game folder.",
      },
    },
  },
  landingHero: {
    title: "Games in Ukrainian —",
    lead: "Enjoy your favorite games in Ukrainian. <br></br>LBK Launcher is a free, open-source tool that automates finding, installing and updating Ukrainian translations for your game library.",
    browseGames: "Browse all games",
    setupGuide: "Installation guide",
    mainShotAlt: "Game page in LBK Launcher",
    mainShotCaption: "Game page",
    backShotAlt: "LBK Launcher main screen",
    backShotCaption: "Main screen",
    phrases: {
      effortless: "effortlessly!",
      oneClick: "with one click!",
      simple: "it's easy!",
      top: "it's awesome!",
    },
    badge: {
      loading: "Loading...",
      version: "Version {version}, released {date}",
      versionUnknown: "Version ...",
    },
    stats: { games: "<count></count>+ Games", users: "<count></count>+ Users" },
    download: {
      steamDeck: "Install on Steam Deck",
      macos: "Download for macOS",
      linux: "Download for Linux",
      windows: "Download for Windows",
    },
  },
  landingPartners: { trust: "Our trusted partners." },
  landingShowcase: {
    title: "Why download LBK Launcher?",
    description:
      "No more copying files by hand or searching forums for Ukrainian language patches. Everything is in one convenient interface.",
    features: {
      catalog: {
        title: "A huge catalog",
        description:
          "Access <b>{count} Ukrainian language patches</b> for AAA titles, indie games and classics.",
        link: "Browse the catalog",
      },
      autoSearch: {
        title: "Automatic game detection",
        description:
          "The launcher scans your libraries in <b>Steam, Epic Games Store</b> and other services to find installed games.",
      },
      oneClick: {
        title: "One-click installation",
        description:
          "Choose a game, click Install translation and you're ready to play in Ukrainian.",
      },
      backups: {
        title: "Safety and backups",
        description:
          "The launcher automatically backs up original files so you can restore them at any time.",
      },
      autoUpdate: {
        title: "Automatic updates",
        description:
          "The launcher automatically finds new translation versions and notifies you about updates.",
      },
      platforms: {
        title: "Full Linux, macOS and Steam Deck support",
        description:
          "Optimized for a smooth experience on popular operating systems.",
      },
      collaboration: {
        title: "Easy collaboration",
        description:
          "Easily add your translations to the launcher and work with other teams.",
        link: "Partner with us",
      },
      openSource: {
        title: "Open source",
        description:
          "The source code is open: you can inspect it and check the app's security yourself.",
        link: "View the code",
      },
    },
  },
  landingStats: {
    title: "Chosen by thousands",
    downloads: {
      title: "Downloads",
      description: "Translation downloads to date",
    },
    hours: {
      title: "Hours",
      description: "Time spent playing with our launcher",
    },
    creators: {
      title: "Creators",
      description: "Translation creators working with us",
    },
    players: {
      title: "Total players",
      description: "Our entire active player base",
    },
    dau: { title: "DAU", description: "Daily active users" },
  },
  legalLayout: {
    updated: "Updated: {date}",
    backHome: "Back to home",
    emailLabel: "Email:",
    telegramLabel: "Telegram:",
  },
  maintenance: {
    title: "Scheduled maintenance",
    text: "We're carrying out maintenance. Please come back later.",
    status: "Update in progress",
  },
  navbar: {
    home: "Home",
    catalog: "Catalog",
    gallery: "Gallery",
    features: "Features",
    collaboration: "Partnerships",
    donaters: "Top supporters",
  },
  openLauncher: {
    metaTitle: "Open {game} in LBK Launcher",
    metaDescription:
      "Open the Ukrainian translation of {game} by {team} in LBK Launcher and install it with one click.",
    by: "Translation by {team}",
    opening: "Opening LBK Launcher...",
    opened: "Launcher opened!",
    goToGame: "Go to the game page",
    notInstalled: "LBK Launcher is not installed",
    needLauncher: "You need LBK Launcher to play {game} in Ukrainian",
    download: "Download launcher",
    retry: "Try again",
    details: "More about the translation",
    copyLink: "Copy link",
  },
  playerTerms: {
    title: "Terms of use",
    metaDescription:
      "LBK Launcher terms for players. Rules for using the application and installing Ukrainian language patches.",
    lastUpdated: "22 October 2026",
    intro:
      "These Terms govern the use of <site>lbklauncher.com</site> and the <b>LBK Launcher</b> desktop client.",
    parties:
      "<b>Parties:</b> LBK Team (GameGlobe Localization and Little Bit) and the user (“you”) who uses LBK Team's products: the website and desktop client (launcher).",
    definitions: {
      title: "Definitions and key terms",
      country:
        "<b>Country:</b> the country where LBK Team or its owners/founders are based; in this case, Ukraine.",
      service:
        "<b>Service:</b> the LBK Launcher website and application provided by GameGlobe Localization (4 Metalistiv Street, Kyiv, 02000) and Little Bit under these Terms.",
      website:
        "<b>Website:</b> the GameGlobe Localization website available at <link>https://ggloc.org/</link>.",
      you: "<b>You:</b> the individual or legal entity using the Service.",
    },
    licensing: {
      title: "Licensing and intellectual property",
      frontend:
        "<b>Client:</b> the source code of the graphical interface and client is open source and distributed under <b>GNU GPL v3</b>. You may modify and distribute it under the terms of that license.",
      backend:
        "<b>Server and API:</b> server code, databases and API logic are the exclusive intellectual property of <b>LBK Team</b>. Unauthorized access, automated data collection, reverse engineering of server protocols and interference with the infrastructure are <b>strictly prohibited</b>.",
      content:
        "<b>Content (translations):</b> all localizations available in the launcher are provided to end users solely for private, non-commercial use. You may not resell these files or use them in commercial products without the rights holders' permission.",
    },
    liability: {
      title: "Limitation of liability",
      body: "The software is provided “as is”. LBK Team is not liable for conflicts with game protection systems, technical failures or loss of game progress caused by installing translations.",
      warning:
        "YOU USE THE LAUNCHER AT YOUR OWN RISK. WE DO NOT GUARANTEE THAT YOU WILL NOT BE BANNED FROM ONLINE GAMES.",
    },
    contacts: {
      title: "Contact us",
      intro: "If you have any questions, contact us:",
    },
  },
  privacyPolicy: {
    title: "Privacy policy",
    metaDescription:
      "What data the LBK Launcher website and app collect, why they collect it, who receives it and how you can manage it.",
    lastUpdated: "22 October 2026",
    intro: {
      service:
        "LBK Launcher is a service for finding, installing and updating Ukrainian localizations.",
      openSource:
        "The website and app are open source. This policy describes data processed locally, sent to LBK infrastructure or shared with external services.",
    },
    controller: {
      title: "1. Who processes your data",
      body: "<b>LBK Team, comprising GameGlobe Localization and Little Bit</b>, is responsible for data processing.",
      contactsIntro: "For privacy questions, contact us:",
      email: "by email at <email>{address}</email>",
      bot: "or through the <bot>Telegram support bot</bot>",
    },
    categories: {
      title: "2. Categories of data processed",
      intro:
        "LBK distinguishes between data operations needed to run the service and analytics categories.",
      essentialTitle: "Essential LBK functions",
      essentialBody:
        "These operations are needed for the features you use: downloading, installing and updating localizations, protecting the service from abuse and managing translator accounts.",
      includesThem: "These include:",
      includesIt: "This includes:",
      essentialItems: {
        archive: "providing the required localization archive;",
        install: "installing, updating and locally removing a localization;",
        subscription: "storing your localization subscription;",
        abuse:
          "protecting the service from abuse and enforcing technical download limits;",
        account: "accounts for translators, teams and moderators.",
      },
      improveTitle: "Helping improve LBK",
      improveBody:
        "Product analytics help us understand how you use the app and how easy it is to find and install localizations.",
      improveItems: {
        session: "starting and ending an app session;",
        firstRun:
          "whether you installed a localization during your first app session;",
        mixpanel: "Mixpanel product analytics;",
        banners: "views and clicks on informational banners in the app.",
      },
      developTitle: "Helping Ukrainian localizations grow",
      developBody:
        "Analytics about localization demand and usage help us understand which translations players want and how they use existing localizations.",
      developItems: {
        support: "clicks on the Support button;",
        failedSearch:
          "searches with no results, to identify translations players are looking for;",
        removal: "localization uninstall events, to help assess usage;",
        playtime:
          "time spent in games with installed localizations, for promotional materials on the website (“Time spent playing with our launcher”) and in the community.",
      },
      diagnosticsTitle: "Diagnostics and error reports",
      diagnosticsBody:
        "Automatic reports help us find and fix app errors and crashes. Feedback, screenshots and logs are sent separately by an explicit user action.",
      optOut:
        "Product analytics, localization development analytics and automatic diagnostics are not required to install or update localizations. You can disable each category separately in the app settings. Doing so does not restrict the launcher's core features.",
      publicTitle: "Public and partner use of statistics",
      publicBody:
        "Aggregated figures may be used in public statistics, promotional materials and partner presentations without MachineID or other identifiers of individual installations.",
      noTracking:
        "The app and website do not use advertising networks, tracking pixels, session recording or device/browser fingerprinting. We do not sell personal data or share it with data brokers.",
    },
    localOnly: {
      title: "3. Data processed only on your device",
      intro:
        "Some features work on your device without sending their contents to LBK servers.",
      items: {
        installedGames:
          "<b>Finding installed games.</b> The app reads service files from Steam, Epic Games, GOG, EA, Xbox, Ubisoft Connect, Rockstar, Heroic and Lutris to identify installed games and their locations. On Windows, the app may also detect these platforms through their system registry entries.",
        accounts:
          "<b>Gaming platform account data.</b> From your Steam profile data, the app reads only the numeric identifier needed to match your game library with the localization catalog. It does not read your login, nickname, friends list, purchase history, payment details or messages, even if they are in the same file. From other gaming platforms' service files, the app reads only the data needed to find installed games and their locations on disk.",
        steamLibrary:
          "<b>Steam library changes.</b> While open, the app monitors changes to Steam service files to update the local game list. It does not read the contents of the file listing your licenses; it only monitors changes to its size.",
        database:
          "<b>Local database.</b> The translation catalog, installation history, favorites and settings are stored in a database file on your computer. You can delete all this local data in the app settings.",
        backups:
          "<b>Backups.</b> Before installing a localization, original game files may be copied locally so they can be restored later.",
        search:
          "<b>Search, filters and collections.</b> These are built from the local database. We do not create a server-side profile of your preferences or tailor the catalog to your device.",
        sync: "<b>Synchronization with a third-party app.</b> You initiate this action, and information about installed localizations is transferred locally.",
        playtime:
          "<b>Reading Steam playtime locally.</b> This happens only for games with installed localizations, to calculate changes in time played.",
      },
      closing:
        "The app does not take screenshots, read the clipboard or separately collect your computer name or operating system account name. To find games, it reads only files in game and gaming platform folders. Your account name may appear in file paths in diagnostic logs you send manually (see section 7).",
    },
    network: {
      title: "4. Essential network operations",
      downloadTitle: "Downloading a localization",
      downloadIntro:
        "To provide the correct file, the app sends at least the following to the server:",
      downloadItems: {
        gameId: "game ID;",
        archivePath: "archive path/identifier;",
        archiveType: "archive type;",
        machineId:
          "MachineID, a technical identifier the service uses to distinguish devices.",
      },
      downloadBody:
        "These fields identify the required file, fulfill the download request, enforce download limits and count unique downloads. In a single request, the server provides the file, checks the limit and records the download in the statistics.",
      workshopTitle: "Opening Steam Workshop",
      workshopBody:
        "Some localizations are installed by subscribing in Steam Workshop. Opening one of these localizations counts toward the overall download statistics. For this, the app sends the localization ID and MachineID. Only the first visit from your device is counted for each localization.",
      subscriptionTitle: "Subscribing to a localization",
      subscriptionBody:
        "Subscribing to a translation lets you receive notifications about new versions. The app generates these notifications on your device. Separately, the LBK server stores the localization ID and MachineID so the translation team can see how many users are waiting for updates. This server record is not needed to generate notifications. You can unsubscribe in the app at any time, and the server record will be deleted immediately.",
    },
    productAnalytics: {
      title: "5. Product analytics",
      intro: "For product analytics, the app sends:",
      items: {
        session:
          "<b>Session start and end</b> — app version, session time/duration, MachineID and whether this is the first launch. These data help count unique launches and identify which app versions are in use;",
        firstSession:
          "<b>Whether this is the first session</b> — sent with the download request to help determine whether users install a localization during their first app session;",
        mixpanel:
          "<b>Mixpanel interface events</b> — opening sections, interacting with controls, and installing, updating or removing localizations. The game title, app version and MachineID are sent with these events;",
        banners:
          "<b>Banner views and clicks</b> — campaign ID, event type and MachineID.",
      },
    },
    localizationAnalytics: {
      title: "6. Analytics supporting Ukrainian localizations",
      intro: "For localization development analytics, the app sends:",
      items: {
        support:
          "<b>Support button clicks</b> — game/localization ID and MachineID, so teams can see how many people wanted to support them;",
        failedSearch:
          "<b>Searches with no results</b> — search text, request source and MachineID;",
        removal: "<b>Localization removal</b> — localization ID and MachineID;",
        playtime:
          "<b>Time played</b> — only for games with an installed localization: game ID, additional time played in minutes and MachineID.",
      },
    },
    feedback: {
      title: "7. Feedback, screenshots and logs",
      intro: "These data are sent only after an explicit user action.",
      reviewTitle: "Localization feedback",
      reviewIntro: "When you submit feedback, the following may be sent:",
      reviewItems: {
        gameId: "game ID;",
        type: "request type;",
        message: "message text;",
        appVersion: "app version;",
        platform: "operating system/platform and architecture;",
        machineId:
          "MachineID, used to deliver the reply to your specific request.",
      },
      screenshotsTitle: "Screenshots",
      screenshotsBody:
        "Screenshots are attached only when you explicitly select them. Before uploading, you can see which file will be sent. A screenshot may accidentally include personal information; LBK Team is not responsible for its contents. Screenshots are sent unchanged: the app does not compress or resize them, or remove metadata (additional information stored in the file). You can attach up to five screenshots to a request.",
      logsTitle: "Diagnostic logs",
      logsBody:
        "A log may contain technical messages, file paths (which may include your operating system account name), installed game titles, numeric platform identifiers and error messages. The app does not remove individual log lines before sending because they may be needed to diagnose the problem. Logs are not sent automatically; transmission requires your explicit confirmation.",
    },
    crashReports: {
      title: "8. Automatic crash diagnostics",
      body: "When an error occurs, the app may send its description, the sequence of calls leading to it (stack trace), the app version and other technical information needed for diagnosis, including the operating system version and recent actions in the app before the error.",
      optIn:
        "Crash reports are sent only when the corresponding option is enabled in the app settings.",
      glitchtip: "Reports use <b>GlitchTip</b>, hosted on LBK infrastructure.",
    },
    website: {
      title: "9. Data collected by the website",
      publicTitle: "Public website",
      zaraz:
        "The public website uses <b>Cloudflare Zaraz</b> to analyze page views and certain events, including opening the catalog, viewing a localization page and using search.",
      failedSearch:
        "Searches with no results on the website store the query text with a random identifier generated in browser storage. This identifier is not linked to your device or identity.",
      videoTitle: "Embedded video",
      videoBody:
        "Localization pages may include embedded YouTube videos. When the player loads, your browser connects to Google/YouTube services and sends technical connection data.",
      releasesTitle: "Downloading releases",
      releasesBody:
        "Release files may be downloaded from GitHub. During a download, GitHub receives standard technical network request data.",
    },
    accounts: {
      title: "10. Translator, team and moderator accounts",
      intro:
        "You do not need an account to install localizations. Translators, teams and moderators use accounts in the dashboard at https://admin.lbklauncher.com/",
      dataIntro:
        "When creating and using an account, the following may be processed:",
      items: {
        name: "name;",
        email: "email address;",
        google: "Google profile data if you choose to sign in with Google;",
        service: "service data needed for authentication and access roles.",
      },
      analytics:
        "The dashboard uses Google Analytics, which collects information about dashboard page views and uses its own cookies. When you copy promotional text for Steam, the dashboard sends this event and the game title to Google Analytics. Your email address and account ID are not sent. You can disable these analytics in the dashboard settings.",
    },
    legalBasis: {
      title: "11. Purposes and legal bases for processing",
      columns: {
        purpose: "Purpose",
        category: "Category",
        basis: "Legal basis",
      },
      purposes: {
        delivery: "Providing and installing a localization",
        subscription: "Storing subscription status",
        abuse:
          "Preventing abuse, enforcing technical limits and counting unique downloads",
        improve:
          "App sessions, interface interactions, banner views and clicks, and first-session information",
        develop:
          "Support clicks, unsuccessful searches, localization removals and time played",
        diagnostics: "Automatic diagnostics",
        feedback: "Feedback, screenshots and logs",
        account: "Account operation",
      },
      categories: {
        essential: "Essential LBK functions",
        improve: "“Help improve LBK”",
        develop: "“Help Ukrainian localizations grow”",
        diagnostics: "“Diagnostics and error reports”",
        userAction: "Explicit user action",
        account: "Essential account functions",
      },
      bases: {
        requestOrTerms: "Fulfilling a user request / Terms of use",
        request: "Fulfilling a user request",
        stability:
          "Legitimate interest in keeping the service stable and public statistics accurate",
        legitimateInterest: "Legitimate interest",
        consent: "User consent at the time of submission",
      },
      objection:
        "You can object to processing based on legitimate interest. Section 16 explains how.",
    },
    retention: {
      title: "12. Retention periods",
      intro:
        "We retain data for as long as necessary for the purposes described in this policy.",
      body: "Subscription records are retained until you unsubscribe and are deleted immediately afterward. Account data are retained while the account exists. When an account is deleted, its data and uploaded files are deleted immediately.",
    },
    recipients: {
      title: "13. Recipients and infrastructure",
      infraTitle: "LBK infrastructure",
      supabase:
        "<b>Supabase-based backend</b> — LBK's database, file storage and service functions, hosted on our own servers. These store server-side download and subscription records, feedback, screenshots, diagnostic logs and statistics collected on LBK infrastructure. External services are described separately below.",
      glitchtip:
        "<b>GlitchTip</b> — error and crash reports. The service runs on LBK's own servers, where these reports are stored.",
      coolify: "Coolify is used to manage service deployments.",
      externalTitle: "External services",
      external: {
        mixpanel: "<b>Mixpanel</b> — app product analytics;",
        zaraz: "<b>Cloudflare Zaraz</b> — public website analytics;",
        googleAnalytics: "<b>Google Analytics</b> — dashboard analytics;",
        resend: "<b>Resend</b> — account emails and service notifications;",
        youtube: "<b>YouTube / Google</b> — embedded videos;",
        steam: "<b>Steam</b> — data needed for Steam integration;",
        github: "<b>GitHub</b> — release distribution and update checks;",
        notifications:
          "<b>Internal team notification channels</b> — alerts about new requests so LBK Team can review and respond promptly.",
      },
      partners:
        "The localization catalog is synchronized with a partner service daily. No player data are shared during synchronization. Before publication, archives uploaded by translators are scanned for viruses using the external Metadefender service. No player data are sent for this scan.",
    },
    steamFallback: {
      title: "14. Steam: local library detection and server fallback",
      body: "The app usually identifies your Steam library from data on your device. If those data are insufficient, the LBK server requests the game list through the Steam Web API, using your numeric Steam profile ID and LBK's access key. The LBK server sends the request to Steam.",
      notStored: "The returned game list is not stored on the server.",
    },
    dataLocation: {
      title: "15. Where data are processed",
      servers: "LBK's own servers are located in <b>Germany</b>.",
      external:
        "Some external services may process data in other countries, including the United States. These include Mixpanel, Resend, Google/YouTube, GitHub and Steam.",
    },
    rights: {
      title: "16. Your rights and consent management",
      intro: "You can:",
      items: {
        access:
          "ask LBK Team what data are associated with you and request a copy;",
        rectify: "correct inaccurate data;",
        erase:
          "request deletion when data are no longer needed or must be deleted;",
        object: "object to processing based on legitimate interest.",
      },
      requests:
        "Send requests to <email>{address}</email> or through the <bot>Telegram support bot</bot>. We will respond within 30 days.",
      identification:
        "If you have an account, records can be located using account details. Without an account, your MachineID may be needed to locate de-identified events.",
    },
    security: {
      title: "17. Data protection",
      items: {
        roles:
          "Access to server tables and storage is restricted by role. The access key included in the app and website cannot read feedback, logs or statistics. These data are accessible only through the server with the appropriate permissions.",
        storage:
          "Feedback, logs and screenshots are kept in private storage; temporary access links are generated only for LBK Team.",
        passwords:
          "The authentication platform stores passwords as hashes, the results of a one-way transformation. LBK code does not have access to plaintext passwords.",
        tokens:
          "Automatic publishing tokens are stored only as hashes, from which the original token cannot be recovered.",
        secrets: "Tokens and secrets are not sent to analytics services.",
        encryption: "Website and app network connections use encryption.",
      },
    },
    notDone: {
      title: "18. What LBK does not do",
      items: {
        sell: "does not sell users' personal data;",
        account:
          "does not require an account for normal localization installation;",
        screenshots: "does not take screenshots without user action;",
        clipboard: "does not read the clipboard;",
        machineId:
          "does not include MachineID in public or aggregated statistics;",
        ads: "does not show behavior-based advertising;",
        fingerprint:
          "does not use browser fingerprinting or record on-screen activity.",
      },
    },
    changes: {
      title: "19. Changes to this policy",
      body: "If data categories, purposes, recipients or legal bases for processing change, this policy and its update date must be revised before or at the same time as the corresponding functionality changes.",
    },
    contactsTitle: "20. Contact",
  },
  scrollToTop: { title: "Back to top" },
  setup: {
    meta: {
      title: "Install LBK Launcher — Windows, macOS and Linux guide",
      description:
        "Step-by-step instructions for installing LBK Launcher on Windows, macOS, Linux and Steam Deck.",
      keywordInstall: "install LBK Launcher",
      keywordGuide: "installation guide",
      keywordUkrainizer: "install Ukrainian game language patches",
      ogTitle: "Install LBK Launcher | Guide",
      ogDescription:
        "Step-by-step instructions for installing LBK Launcher on your platform.",
    },
    backHome: "Home",
    title: "Install LBK Launcher",
    subtitle: "Step-by-step installation instructions for your platform",
    downloadOptions: "Download options",
    installSteps: "Installation steps",
    copyCommand: "Copy command",
    notes: {
      title: "General information",
      autoUpdates: "Automatic updates work on all platforms",
      offline: "The launcher works offline after its first launch",
      sync: "Localization data are synchronized automatically",
    },
    downloadCta: "Download LBK Launcher",
    windows: {
      title: "Install on Windows",
      setupFile: "— installer",
      portableFile: "— portable version (no installation required)",
      stepDownload: "Download the installer or portable version",
      stepRun: "Run the downloaded file",
      stepFollow: "Follow the on-screen instructions",
    },
    macos: {
      title: "Install on macOS",
      armFile: "— for Apple Silicon",
      intelFile: "— for Intel",
      stepDownload:
        "Download the appropriate DMG file (Apple Silicon or Intel)",
      stepOpen: "Open the DMG file",
      stepDrag: "Drag the app to the Applications folder",
    },
    linux: {
      title: "Install on Linux",
      flatpakFile:
        "<b>Flatpak</b> — recommended for Steam Deck and distributions with Flatpak support",
      appImageFile: "— universal format",
      rpmFile: "— for Fedora/RHEL",
      flatpakTitle: "Install with Flatpak (recommended)",
      flatpakIntro:
        "The easiest way to install the launcher. Open the <link>flatpakref link</link> and your system will prompt you to install the app automatically.",
      viaTerminal: "Or use the terminal:",
      appImageTitle: "Install an AppImage",
      appImageDownload: "Download the AppImage file",
      appImageExecutable:
        "Make the file executable (right-click → Properties → Permissions → Allow execution)",
      appImageRun: "Double-click to launch, or run it in the terminal",
      rpmTitle: "Install an RPM",
      rpmDownload: "Download the RPM package",
      rpmInstall: "Install it using your package manager:",
    },
    steamDeck: {
      title: "Install on Steam Deck",
      flatpakTitle: "Method 1: Flatpak (recommended)",
      flatpakIntro:
        "The easiest way is to install with Flatpak. Open <link>this link</link> in a browser on your Steam Deck, and your system will prompt you to install the app automatically.",
      desktopMode:
        "<b>Switch to Desktop Mode:</b> hold the power button and select “Switch to Desktop”",
      openFirefox:
        "<b>Open Firefox:</b> it integrates more closely with the system than Chrome",
      openLink:
        "<b>Open the link:</b> in Firefox, follow the <link>flatpakref link</link>. The system will open Discover and offer to install LBK Launcher.",
      install: "<b>Install:</b> click “Install” in Discover",
      note: "<b>Note:</b> if the browser offers to download a file instead of opening Discover, install the app using the Konsole terminal:",
      appImageTitle: "Method 2: AppImage",
      appImageDownload:
        "<b>Download:</b> open a browser and download <code>LBK-Launcher-linux.AppImage</code>",
      permissions: "Set permissions:",
      openDolphin: "Open the Dolphin file manager",
      openDownloads: "Go to your Downloads folder",
      openProperties: "Right-click the AppImage → Properties → Permissions",
      allowExecution: "Enable “Executable: Allow executing file as program”",
      addToSteam: "Add to Steam (optional):",
      launchSteam: "Launch Steam",
      addNonSteamGame: "Select “Add a Game” → “Add a Non-Steam Game”",
      pickAppImage: "Go to Downloads and select the AppImage",
      confirmAdd: "Confirm to add it",
      libraryMedia:
        "You can also download artwork for your library: <link>Steam media.zip</link>",
      gamepadTip:
        "The launcher automatically enables gamepad navigation when you press any controller button.",
    },
    releaseFiles: {
      title: "Release files",
      allReleases: "All releases on GitHub",
      loading: "Loading...",
      files: {
        windowsSetup: "Installer — recommended for most users",
        windowsPortable:
          "Portable version — no installation needed; run it from any location",
        macosArm: "Apple Silicon",
        macosX64: "Intel Mac",
        linuxAppImage: "Universal format — works on most distributions",
        linuxRpm: "RPM package for Fedora / RHEL",
      },
    },
  },
  shareGame: {
    text: "You can easily install the Ukrainian localization of {game} by {team} using LBK Launcher",
    nativeTitle: "Open in LBK Launcher",
    button: "Share",
    close: "Close",
    title: "Share",
    shareIn: "Share on:",
    copyHint: "Or copy the link or text:",
    copyText: "Copy text",
    copied: "Copied!",
  },
  siteMeta: {
    title:
      "LBK Launcher — Games in Ukrainian: automatic language patch installer and translation catalog",
    description:
      "Download LBK Launcher to install Ukrainian localizations quickly. Over {count} language patches, automatic updates and Steam Deck support. Enjoy your favorite games in Ukrainian with ease.",
    keywords:
      "Ukrainian language patch,Ukrainian game localization,play in Ukrainian,games in Ukrainian,Ukrainian game translation,LBK,LBK launcher,LBK Launcher,game localization,translate games into Ukrainian,Ukrainian language in games",
    brandTitle: "LBK Launcher — Games in Ukrainian",
    twitterTitle: "LBK Launcher — Games in Ukrainian",
  },
  statusPage: {
    home: "Home",
    catalog: "Game catalog",
    notFound: {
      title: "Page not found",
      text: "This page may not exist or may have moved.",
    },
    gone: {
      title: "Translation removed",
      text: "This translation page has been permanently removed.",
    },
  },
  storePlatform: {
    steam: "Steam",
    epic: "Epic Games Store",
    gog: "GOG",
    rockstar: "Rockstar Games Launcher",
    xbox: "Xbox app",
    uplay: "Ubisoft Connect",
    ea: "EA App",
    emulator: "Emulator",
    other: "Other",
  },
  techStack: {
    title: "Technology stack",
    description:
      "The architecture and technology stack of the LBK Launcher ecosystem: three projects, a shared backend and infrastructure.",
    heroDescription:
      "The architecture and technologies behind the LBK Launcher ecosystem",
    sharedTitle: "Shared technologies",
    auxTitle: "Supporting repositories",
    supabaseDescription: "A shared backend for all three projects",
    labels: {
      framework: "Framework",
      styles: "Styles",
      data: "Data",
      cache: "Cache",
      search: "Search",
      seo: "SEO",
      ui: "UI",
      analytics: "Analytics",
      errors: "Errors",
      deploy: "Deployment",
      realtime: "Real-time updates",
      forms: "Forms",
      email: "Email",
      tests: "Tests",
      api: "API",
      integrations: "Integrations",
      packages: "Packages",
      workers: "Background services",
      archiveScan: "Archive scanning",
      state: "State",
      localDb: "Local database",
      sync: "Synchronization",
      archives: "Archives",
      workshop: "workshop",
      build: "Build",
      distribution: "Distribution",
      updates: "Updates",
      e2e: "E2E",
      database: "Database",
      auth: "Authentication",
      storage: "Storage",
      edgeFunctions: "Edge Functions",
      extensions: "Extensions",
      usage: "Usage",
      environment: "Environment",
      upload: "Upload",
      validation: "Validation",
      source: "Source",
      package: "Package",
      repository: "Repository",
      delivery: "Delivery",
      feature: "Feature",
    },
    landing: {
      description: "Public website with a game catalog and guides",
      stack: {
        framework: "Next.js 16 (App Router), React 19",
        styles: "Tailwind CSS 4, PostCSS",
        data: "TanStack Query v5, Supabase",
        cache: "Redis (ioredis)",
        search: "Postgres FTS + fuzzy RPC (pg_trgm)",
        seo: "JSON-LD, OpenGraph, dynamic Sitemap",
        ui: "FontAwesome, Lightbox, morphicons",
        analytics: "Cloudflare Zaraz",
        errors: "Sentry SDK → self-hosted GlitchTip",
        deploy: "Coolify (Railpack, next start)",
      },
    },
    admin: {
      description: "Dashboard for managing translations, games and users",
      stack: {
        framework: "Next.js 16 (App Router), React 19",
        styles: "Tailwind CSS 4, PostCSS",
        data: "TanStack Query v5, Supabase",
        realtime: "Supabase Broadcast for notifications",
        forms: "React Hook Form + Zod",
        email: "Resend (@lbk/email)",
        ui: "Recharts, PhotoSwipe, Lucide, morphicons",
        tests: "Vitest, Testing Library",
        analytics: "Google Analytics 4",
        api: "lbk_ tokens, OpenAPI 3.1 with Scalar",
        integrations: "lbk-deploy-translation (GitHub Action)",
        packages: "@lbk/db-types, email, notify, scan-core, steam-workshop",
        workers:
          "Media, Scan, Steam Guides, Steam Curator, Steam Updates, Steam Apps, Telegram, Fundraising",
        archiveScan: "MetaDefender Cloud (OPSWAT) + filescan.io",
        errors: "Sentry SDK → self-hosted GlitchTip",
        deploy: "Coolify (Railpack, next start)",
      },
    },
    launcher: {
      description: "Desktop app for installing Ukrainian translations",
      stack: {
        framework: "Electron 44, React 19, Vite 7",
        styles: "Tailwind CSS 4, Framer Motion",
        state: "Zustand, TanStack Query v5",
        localDb: "SQLite (better-sqlite3, worker threads, spellfix1)",
        sync: "Supabase REST + Realtime WebSocket",
        archives: "node-7z + 7zip-bin (zip)",
        workshop: "Steam Workshop",
        analytics: "Mixpanel",
        errors: "Sentry SDK (Electron) → GlitchTip",
        build: "electron-builder — NSIS, portable, dmg, zip, AppImage, rpm",
        distribution: "GitHub Releases, AUR, Flatpak",
        updates: "electron-updater (GitHub Releases)",
        e2e: "Playwright",
      },
    },
    supabase: {
      stack: {
        database: "PostgreSQL",
        auth: "Email + Google OAuth",
        storage: "game-images, game-archives, banner-images",
        realtime: "WebSocket subscriptions for launcher synchronization",
        edgeFunctions:
          "10 Deno functions — Telegram bot, downloads and feedback",
        extensions: "pg_cron, pg_net, pg_trgm, http",
      },
    },
    deployTranslation: {
      description:
        "A GitHub Action that lets translation teams upload archives directly from their CI",
      stack: {
        usage: "Vadko/lbk-deploy-translation@v1",
        environment:
          "Node 20, @vercel/ncc bundle in the committed dist directory",
        upload: "tus-js-client — resumable uploads to Supabase Storage",
        validation: "Zod, p-map for parallel archive processing",
        tests: "Vitest, Biome, versioning with release-please",
      },
    },
    flatpak: {
      description:
        "Flatpak packaging for the Linux launcher — a dedicated signed repository",
      stack: {
        source: "AppImage from lbk-launcher releases",
        package: "com.lbk.launcher, runtime org.freedesktop.Platform 25.08",
        repository: "GPG-signed OSTree",
        delivery: "ghcr.io + nginx:alpine → flatpak.lbklauncher.com",
        feature: "i386 stack for umu/Proton in the sandbox",
      },
    },
    diagram: {
      deployAction: "GitHub Action",
      flatpak: "Flatpak repository",
      coolify: "Hosting for our services",
      sentry: "Error Monitoring",
      github: "CI/CD & Releases",
      workers: "8 background services",
    },
  },
  translationType: {
    manual: "Human translation",
    ai: "AI translation",
    ai_edited: "AI + human editing",
  },
  translatorTerms: {
    title: "Terms of use for translators",
    description:
      "Terms for publishing translations in LBK Launcher. Rules for teams and creators of Ukrainian game language patches.",
    lastUpdated: "22 October 2026",
    intro:
      "Welcome to the community! This document governs the relationship between you (the translator) and the <b>GameGlobe Localization</b> and <b>Little Bit</b> teams (collectively, <b>LBK Team</b>). Our goal is to provide players with quality content and support transparency in localization development.",
    rights: {
      title: "1. Content rights and additions",
      lead: "By adding your translation to <link>https://lbklauncher.com/</link>, you agree to the following:",
      extension:
        "<b>Product additions: </b> LBK Team may supplement your translation with achievements, textures, voice-over or other content to provide a cohesive gaming experience, but only with prior written approval from all translation authors. No additions will be made without that permission.",
      distribution:
        "<b>Distribution: </b> We may share links to your work on affiliated resources (such as <b>pcgamingwiki</b>) to promote Ukrainian localization.",
      authorship:
        "<b>Credit and links: </b> The interface will display your team name or author name and the social media links you provided in the dashboard.",
      statuses:
        "<b>Translator status: </b> After registering, you receive “Translator” status. Following a sustained and successful collaboration, the administration may grant “Verified translator” status: your work can then be published and updated without prior moderation.",
      statusRequest:
        "Translators must request this status themselves through the support bot.",
      statusRevoke:
        "The administration may revoke this status for violations of the collaboration rules below or other misuse that harms LBK's reputation.",
    },
    quality: {
      title: "2. Content quality and AI use",
      original:
        "<b>Source language: </b> We only accept translations made from the original language that replace any in-game language other than Russian. Our position is:",
      originalOnly:
        "a quality product requires translating from the original language, rather than translating a translation.",
      noRuReplacement:
        "replacing Russian negatively affects Ukrainian localization statistics on Steam and other services.",
      gameAuthorship:
        "<b>Game origins: </b> We do not add games whose actual developers or publishers are companies from the Russian Federation, such as Mouthwash, Graveyard Keeper and others.",
      aiLabel:
        "<b>AI labeling: </b> Translations created using artificial intelligence are automatically labeled accordingly in the app and on the website. The following restrictions also apply:",
      aiNoRecommendations: "they are excluded from the recommendation system.",
      aiEarlyAccess:
        "they may be published in early access only when at least 50% complete. Exceptions are possible for very large games if the author explains why earlier publication is necessary, as in the case of AC: Odyssey.",
      aiNoPlanned: "the “Planned” status is not available for AI translations.",
      aiLowEffort:
        "if moderators find only superficial editing or a translation generated with a single prompt, publication may be refused or an already published translation may be hidden.",
      aiReplacement:
        "<b>Replacing AI translations: </b> We aim to offer users the best translations, so your translation may move down the list when a higher-quality alternative becomes available. Low-quality AI translations may also be removed entirely.",
      negativeFeedback:
        "<b>Negative feedback: </b> If we receive numerous substantiated complaints about translation quality, LBK Team will contact you to agree on corrections. If these are not made within the agreed time, the translation may be removed.",
      intentionalHarm:
        "<b>Intentional harm: </b> Content intended to cause technical or reputational harm to players or the platform will not be published.",
      ownTech:
        "<b>Custom technical solutions: </b> If you use .exe files that interfere with other translations or the app, your localizations will be removed and your access to the platform will be blocked.",
    },
    fundraising: {
      title: "3. Progress monitoring and fundraising",
      lead: "The following rules help maintain players' trust and prevent dishonest fundraising:",
      promises:
        "<b>Keeping promises: </b> If there are signs of misuse of fundraising features or failure to meet commitments made as part of a fundraiser, LBK Team will contact you to verify actual work progress and the state of the fundraiser.",
      suspension:
        "<b>Suspending publication: </b> If a review reveals that players are being misled or that no real progress is being made on the translation, the project will be hidden from the platform to prevent further improper fundraising.",
      freeAccess:
        "<b>Non-commercial access: </b> Regardless of any option to support the author voluntarily, translation files on the platform must remain free for all users.",
    },
    liability: {
      title: "4. Liability and removal",
      disclaimer:
        "<b>Disclaimer: </b> LBK Team is not responsible for technical errors, failures or game crashes caused by an author's translation files.",
      removal:
        "<b>Removal on request: </b> We can remove your work entirely at your request through the bot <bot>{botUrl}</bot>.",
    },
    privacy: {
      title: "5. Privacy Policy",
      account:
        "<b>Account data: </b> We store your email address and name to operate your account. Only your team name or author pseudonym is displayed publicly on the website.",
      notifications:
        "<b>Notifications: </b> Emails about the status of your translations and new feedback are delivered by an external email service.",
      fullList:
        "<b>Full details: </b> The <link>Privacy Policy</link> describes exactly what data the website and app collect, why, with whom they are shared and how long they are retained. It takes precedence over this section.",
    },
    contacts: {
      title: "Contact",
      lead: "If you have any questions, please contact us:",
    },
  },
} as const satisfies Messages;
