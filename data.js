/**
 * SITE DATA
 * ---------
 * This is the only file you should need to touch to add new topics,
 * new websites, or new PDF excerpts later.
 *
 * To add a resource to an existing topic: add an object to that topic's
 * `resources` array (see the shapes below).
 *
 * To add a whole new topic: copy one of the topic objects, give it a
 * unique `id`, the next `number`, a `title`, and set `status: "active"`.
 * Until you do, topics with `status: "locked"` show as "coming soon"
 * on the home page and can't be opened.
 *
 * Resource shape (type: "link"):
 *   { type: "link", title, description, url }
 *
 * Resource shape (type: "pdf"):
 *   { type: "pdf", title, description, url, sourceLabel }
 *   - url should point to a PDF file inside the /pdfs folder.
 *   - sourceLabel is a short citation, e.g. "Media Reframed, p. 293".
 *   - IMPORTANT: after adding a new PDF to /pdfs, run
 *     `python3 build-pdf-data.py` to re-embed it (see that file for why).
 *
 * Note on shared PDF pages: several topics cite the same textbook pages
 * (e.g. p.290 covers both the Regulation topic and the Data Privacy
 * topic). Rather than duplicating the same page as multiple files, those
 * topics simply point their resource's `url` at the same file in /pdfs.
 */

const SITE = {
  unitLabel: "Unit 2 · Outcome 3",
  title: "Media and Change",

  /**
   * General classroom resources shown on the home page, separate from the
   * topic research (these aren't tied to one topic). Two types supported:
   *
   *  - type: "slides"       -> a click-through slideshow. Point
   *    `slideFolder` at a folder of images named slide-01.jpg, slide-02.jpg
   *    etc (any zero-padded numbering works) and set `slideCount`.
   *
   *  - type: "report-guide" -> an accordion of headings, each opening to
   *    an intro line plus a bullet list. Add/edit sections in the
   *    `sections` array below.
   */
  classroomResources: [
    {
      id: "slides",
      type: "slides",
      title: "Media and Change — Unit 2, Outcome 3",
      description: "Class slide deck, 32 slides. Click through like a presentation.",
      slideFolder: "images/slides",
      slidePrefix: "slide-",
      slideCount: 32,
      slideDigits: 2,
      slideExt: "jpg",
    },
    {
      id: "report-guide",
      type: "report-guide",
      title: "Report Writing Guide",
      description: "The 7 sections your SAC report needs to cover, with what to consider under each.",
      sections: [
        {
          heading: "1. Nature & Form",
          intro:
            "Introduce and explain what your chosen new media technology or trend is, how it works and the media forms it uses.",
          bullets: [
            "What is the technology/trend?",
            "What are its key characteristics?",
            "How does it operate?",
            "What media forms does it use?",
            "How has technological development enabled it?",
            "How does it differ from traditional media?",
          ],
          note: {
            label: "Key media terminology",
            items: [
              { term: "Nature", def: "what it is and how it works." },
              { term: "Form", def: "how the media is presented, produced, distributed or experienced." },
            ],
          },
        },
        {
          heading: "2. Audience Impact",
          intro:
            "Explain and analyse how your chosen technology or trend has changed audiences and their interaction with media.",
          bullets: [
            "How audiences consume media",
            "Audience engagement and interaction",
            "Active and passive audiences",
            "Audience agency",
            "Participatory culture",
            "Algorithms and personalised content",
            "Changes to audience behaviour",
            "Changes to the relationship between producers and audiences",
          ],
        },
        {
          heading: "3. Social Change",
          intro:
            "Explain how your chosen technology or trend has contributed to changes in individuals, communities or society.",
          bullets: [
            "Changes in communication",
            "Changes in social behaviour",
            "Changes in relationships",
            "Changes in access to information",
            "Changes in cultural practices",
            "Changes in how people participate in society",
            "Positive and negative consequences",
            "Use specific examples or evidence to support your discussion.",
          ],
        },
        {
          heading: "4. Ethical Challenges",
          intro: "Identify and analyse the ethical issues associated with your chosen technology or trend.",
          bullets: [
            "What ethical questions or concerns have emerged?",
            "Who is responsible for addressing these issues?",
            "How might individuals, audiences or media organisations be affected?",
            "What are the potential consequences of these issues?",
            "Where possible, support your discussion with a case study or evidence.",
          ],
        },
        {
          heading: "5. Legal Implications",
          intro:
            "Explain the legal issues and regulatory challenges associated with your chosen technology or trend.",
          bullets: [
            "What laws or regulations apply?",
            "Why might existing laws need to change?",
            "How are governments or media institutions responding?",
            "What responsibilities do media platforms have?",
            "How might regulation affect audiences and media industries?",
            "Use a specific example of regulation, legislation or a legal issue where possible.",
          ],
        },
        {
          heading: "6. Industry Impact",
          intro: "Analyse how your chosen technology or trend has affected media industries and media institutions.",
          bullets: [
            "Changes to media production",
            "Changes to distribution",
            "Changes to media consumption",
            "Changes to business models",
            "Changes to employment or media roles",
            "Changes to traditional media industries",
            "Changes to the relationship between media industries and audiences",
            "How traditional media has adapted to new media technologies",
          ],
        },
        {
          heading: "7. Summary / Conclusion",
          intro: "",
          bullets: [
            "What is the overall impact of your chosen technology or trend?",
            "Has it had a positive, negative or mixed impact? Explain why.",
            "How has it changed the way individuals and audiences use or experience media?",
            "Has it increased audience agency, or has it increased the control of media platforms and institutions?",
            "How has the shift from traditional media to new media changed the balance of power between audiences, producers and institutions?",
            "Make a final statement about how your chosen technology or trend is likely to continue influencing media and society.",
          ],
        },
      ],
    },
  ],

  topics: [
    {
      id: "regulation",
      number: 1,
      title: "Regulation & the Social Media Ban",
      summary:
        "Government responses to platform harms — the social media age ban, statutory guidelines, and the rights and enforcement questions they raise.",
      status: "active",
      resources: [
        {
          type: "link",
          title: "eSafety Commissioner — Industry Regulation Hub",
          description:
            "Monitor developments, strict guidelines, and platform updates regarding the Online Safety Amendment (Social Media Minimum Age) Act.",
          url: "https://www.esafety.gov.au/industry",
        },
        {
          type: "link",
          title: "Australian Human Rights Commission — Explainer",
          description:
            "Serious considerations regarding civil liberties, age-verification bypass mechanisms, and child rights.",
          url: "https://humanrights.gov.au/about-us/news/proposed-social-media-ban-under-16s-australia",
        },
        {
          type: "link",
          title: "Dept. of Infrastructure, Transport, Regional Development, Communications and the Arts",
          description:
            "Dynamic updates on statutory guidelines and global enforcement powers, via a ministerial radio transcript.",
          url: "https://minister.infrastructure.gov.au/wells/transcript/radio-national-breakfast-melissa-clarke",
        },
        {
          type: "link",
          title: "ABC News Daily — \u201CSix months in, is the social media ban failing?\u201D",
          description:
            "Podcast episode examining the early outcomes and enforcement of the ban, six months on.",
          url: "https://www.abc.net.au/listen/programs/abc-news-daily/six-months-in-is-the-social-media-ban-failing/106805068?utm_content=link&utm_medium=content_shared",
        },
        {
          type: "pdf",
          title: "TGA warning: TikTok \u201Cnasal tanning spray\u201D",
          description:
            "The Therapeutic Goods Administration's warning against a nasal tanning spray promoted by TikTok influencers, plus a note on the loose laws around undisclosed sponsored content.",
          url: "pdfs/mr-p293.pdf",
          sourceLabel: "Media Reframed, p. 293",
        },
        {
          type: "pdf",
          title: "Pureprofile — Australia's Under-16s Social Media Ban Report 2026 (Wave 2)",
          description:
            "Survey research tracking attitudes to the ban among parents, teachers and adolescents across two waves (Oct 2025 and Apr 2026) \u2014 includes methodology, sample breakdown and wave-on-wave attitude shifts.",
          url: "pdfs/pureprofile-under-16s-ban-report-2026-wave2.pdf",
          sourceLabel: "Pureprofile, Social Media Ban Report 2026, Wave 2",
        },
      ],
    },

    {
      id: "ai-deepfakes",
      number: 2,
      title: "AI, Deepfakes & Misinformation",
      summary:
        "Synthetic media, generative AI and the spread of misinformation across platforms — and the frameworks trying to keep pace with it.",
      status: "active",
      resources: [
        {
          type: "link",
          title: "eSafety Commissioner — Deepfakes Position Statement",
          description:
            "eSafety's position on synthetic media manipulation and the tech trends and challenges it presents.",
          url: "https://www.esafety.gov.au/industry/tech-trends-and-challenges/deepfakes",
        },
        {
          type: "link",
          title: "ACMA & DIGI — Australian Code of Practice on Disinformation and Misinformation",
          description:
            "Voluntary frameworks, transparency reports, and legislative codes that digital platforms have committed to around disinformation.",
          url: "https://www.acma.gov.au/online-disinformation-and-misinformation",
        },
        {
          type: "link",
          title: "Australian Strategic Policy Institute (ASPI)",
          description:
            "Deep-dive research tracking data manipulation, disinformation and international technological risks.",
          url: "https://www.aspi.org.au/",
        },
        {
          type: "pdf",
          title: "What is artificial intelligence? / Surveillance Capitalism",
          description:
            "A sidebar defining AI, plus the introduction of Shoshana Zuboff's concept of \u201CSurveillance Capitalism\u201D.",
          url: "pdfs/mr-p289.pdf",
          sourceLabel: "Media Reframed, p. 289",
        },
        {
          type: "pdf",
          title: "TikTok and conspiracy theories / Activity 6.20",
          description:
            "How misinformation spread on TikTok around COVID-19, climate change and the 2022 Ukraine invasion, including a NewsGuard statistic that 19.5% of TikTok news videos were misleading \u2014 plus Activity 6.20's reflection task on how AI began reshaping the media landscape.",
          url: "pdfs/mr-p294-296.pdf",
          sourceLabel: "Media Reframed, pp. 294\u2013296",
        },
      ],
    },

    {
      id: "mental-health",
      number: 3,
      title: "Social Media & Mental Health",
      summary:
        "How algorithmic design, outrage and FOMO shape wellbeing — and what the research says about the link between platforms and youth mental health.",
      status: "active",
      resources: [
        {
          type: "link",
          title: "Black Dog Institute — Research",
          description:
            "Research on youth mental health, device habits and the link (and non-link) between social media use and wellbeing.",
          url: "https://www.blackdoginstitute.org.au/",
        },
        {
          type: "link",
          title: "Orygen Digital",
          description:
            "Research and digital tools exploring technology's role in youth mental health care.",
          url: "https://orygen.org.au/Our-Research/Research-Areas/E-Health",
        },
        {
          type: "link",
          title: "eSafety Commissioner — Research",
          description:
            "Annual statistics and research on young people's online behaviour and experiences.",
          url: "https://www.esafety.gov.au/research/digital-lives-aussie-teens",
        },
        {
          type: "link",
          title: "Australian Psychological Society (APS)",
          description:
            "Formal guidance and commentary on the psychological impacts of social media and screen use, especially at a young age.",
          url: "https://psychology.org.au/insights/the-impacts-of-social-media-at-a-young-age",
        },
        {
          type: "pdf",
          title: "FOMO, mental health & Activities 6.18\u20136.19",
          description:
            "Defines FOMO, covers an ABC documentary on TikTok's algorithm leading teens toward eating-disorder content, and effects on mood, wellbeing and self-esteem \u2014 plus reflection activities on outrage algorithms, FOMO, and the impact on vulnerable users.",
          url: "pdfs/mr-p294-295.pdf",
          sourceLabel: "Media Reframed, pp. 294\u2013295",
        },
        {
          type: "pdf",
          title: "Outrage algorithms and the Facebook Papers",
          description:
            "How content that makes people angry is used to keep them online longer, as revealed in the Facebook Papers.",
          url: "pdfs/mr-p291-292.pdf",
          sourceLabel: "Media Reframed, p. 292",
        },
      ],
    },

    {
      id: "influencer-culture",
      number: 4,
      title: "Influencer Culture",
      summary:
        "The business of influence — parasocial relationships, sponsored content, and the regulatory grey areas around disclosure.",
      status: "active",
      resources: [
        {
          type: "link",
          title: "ACCC — Advertising & Influencer Disclosure",
          description:
            "Formal compliance updates on native advertising sweeps and mandatory disclosure obligations for influencers.",
          url: "https://www.accc.gov.au/media-release/scrutiny-of-influencers-and-businesses-for-misleading-advertising-and-online-reviews-continues",
        },
        {
          type: "pdf",
          title: "Continuum: \u201CInfluencer as individual and trader\u201D (Annabell et al., 2026)",
          description:
            "Open-access journal article exploring discrimination in influencer marketing through the 2023 \u2018Tarte F1 Drama\u2019 case study, combining a feminist/intersectional lens with legal analysis of influencers\u2019 status as traders.",
          url: "pdfs/continuum-influencer-trader.pdf",
          sourceLabel: "Continuum: Journal of Media & Cultural Studies, 40(2), 222\u2013237",
        },
        {
          type: "link",
          title: "The eSafety Guide",
          description:
            "Curated safety guidance covering common platforms and services used by content creators and influencers.",
          url: "https://www.esafety.gov.au/report/how-to-report-serious-online-abuse-illegal-restricted-content",
        },
        {
          type: "pdf",
          title: "Case Study 6.13 — Emma Chamberlain",
          description:
            "The rise of YouTube content creator Emma Chamberlain, and her path to internet celebrity.",
          url: "pdfs/mr-p280.pdf",
          sourceLabel: "Media Reframed, p. 280",
        },
        {
          type: "pdf",
          title: "Parasocial relationships and the Belle Gibson case",
          description:
            "Parasocial relationships between audiences and influencers/celebrities, including the fraudulent Belle Gibson cancer case and a Doja Cat fan example.",
          url: "pdfs/mr-p283-284.pdf",
          sourceLabel: "Media Reframed, pp. 283\u2013284",
        },
        {
          type: "pdf",
          title: "Khaby Lame and TikTok influencer disclosure",
          description:
            "Khaby Lame as the most-viewed TikTok star, the influence of TikTok creators, a Charli D'Amelio sponsorship example, and the TGA nasal spray warning tied to influencer promotion.",
          url: "pdfs/mr-p293.pdf",
          sourceLabel: "Media Reframed, p. 293",
        },
        {
          type: "pdf",
          title: "Activity 6.16 — sponsored content disclosure",
          description:
            "A homework task on how (and whether) influencers disclose sponsored content.",
          url: "pdfs/mr-p294-295.pdf",
          sourceLabel: "Media Reframed, p. 294",
        },
      ],
    },

    {
      id: "data-privacy",
      number: 5,
      title: "Data Privacy & Surveillance",
      summary:
        "How platforms collect, use and profit from personal data — algorithms, filter bubbles, and the fight for stronger privacy protections.",
      status: "active",
      resources: [
        {
          type: "link",
          title: "OAIC — Privacy Act & Determinations",
          description:
            "Legal shifts and regulatory determinations under Australia's Privacy Act.",
          url: "https://www.oaic.gov.au/privacy/privacy-registers/public-interest-determinations-register",
        },
        {
          type: "link",
          title: "CHOICE — Consumers and Data",
          description:
            "Investigations into data brokers and hidden consumer tracking practices.",
          url: "https://www.choice.com.au/consumers-and-data",
        },
        {
          type: "link",
          title: "Digital Rights Watch Australia",
          description:
            "Campaigns and advocacy tracking user consent, data tracking architectures, and digital rights.",
          url: "https://www.digitalrightswatch.org.au/",
        },
        {
          type: "pdf",
          title: "\u201CThe audience as the product\u201D",
          description:
            "How TikTok, Facebook, YouTube and Google harvest audience data as part of their business model.",
          url: "pdfs/mr-p288.pdf",
          sourceLabel: "Media Reframed, p. 288",
        },
        {
          type: "pdf",
          title: "Surveillance Capitalism, \u201CAge My Face\u201D and Cambridge Analytica",
          description:
            "AI and machine learning, Zuboff's \u201CSurveillance Capitalism\u201D, and Case Study 6.18 covering the \u201CAge My Face\u201D app and the Cambridge Analytica/2016 US election scandal.",
          url: "pdfs/mr-p289.pdf",
          sourceLabel: "Media Reframed, p. 289",
        },
        {
          type: "pdf",
          title: "Pok\u00e9mon GO and behavioural tracking",
          description:
            "Case Study 6.19 on Pok\u00e9mon GO's use of behavioural data tracking, plus Activity 6.15's privacy debate.",
          url: "pdfs/mr-p290.pdf",
          sourceLabel: "Media Reframed, p. 290",
        },
        {
          type: "pdf",
          title: "Filter bubbles and outrage algorithms",
          description:
            "Personalised algorithms, Eli Pariser's concept of \u201Cfilter bubbles\u201D, and outrage algorithms.",
          url: "pdfs/mr-p291-292.pdf",
          sourceLabel: "Media Reframed, pp. 291\u2013292",
        },
        {
          type: "pdf",
          title: "TikTok's biometric data collection",
          description:
            "TikTok's collection of biometric data, including \u201Cfaceprints\u201D and \u201Cvoiceprints\u201D.",
          url: "pdfs/mr-p294-295.pdf",
          sourceLabel: "Media Reframed, p. 294",
        },
      ],
    },

    {
      id: "citizen-journalism",
      number: 6,
      title: "Citizen Journalism",
      summary:
        "Ordinary people taking on the role of the journalist — trust, legal liability, and the changing shape of who gets to report the news.",
      status: "active",
      resources: [
        {
          type: "link",
          title: "The Walkley Foundation",
          description:
            "Research and standards around Australian journalism, and the changing shape of the profession.",
          url: "https://www.walkleys.com/",
        },
        {
          type: "link",
          title: "MEAA — Media Section",
          description:
            "The union and industry advocate for Australian journalists, covering standards and industry trends.",
          url: "https://www.meaa.org/meaa-media/",
        },
        {
          type: "link",
          title: "ACMA — Media Research",
          description:
            "Analytical datasets and reports on Australians' changing news consumption habits.",
          url: "https://www.acma.gov.au/research",
        },
        {
          type: "pdf",
          title: "Digital News Report: Australia 2026 \u2014 Executive Summary & Key Findings",
          description:
            "Key findings from the University of Canberra's News & Media Research Centre on how Australians access, trust and pay for news in 2026.",
          url: "pdfs/dnr-executive-summary-key-findings-p10-15.pdf",
          sourceLabel: "Digital News Report: Australia 2026, pp. 10\u201315",
        },
        {
          type: "link",
          title: "International Federation of Journalists (IFJ)",
          description:
            "Cross-border legal liabilities and press freedom issues facing journalists worldwide.",
          url: "https://www.ifj.org/",
        },
        {
          type: "link",
          title: "LawRight — Defamation Resources",
          description:
            "Domestic legal frameworks and fact sheets on defamation law in Australia.",
          url: "https://lawright.org.au/legal-information/defamation/",
        },
        {
          type: "pdf",
          title: "Citizen journalism, the UC study & \u201CChannel 6 News\u201D",
          description:
            "Defines citizen journalism, covers a 2021 University of Canberra study on Australian news consumption habits, the FriendlyJordies and \u201CPR Guy\u201D examples, and a case study on teenage self-publishing journalist Leo Puglisi plus Activity 6.14's research task.",
          url: "pdfs/mr-p285-286.pdf",
          sourceLabel: "Media Reframed, pp. 285\u2013286",
        },
      ],
    },
  ],
};
