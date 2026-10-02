import { IMAGES } from '@/lib/images';

export type ContentKind = 'short' | 'long' | 'lines' | 'image';

export interface ContentField {
  key: string;
  label: string;
  kind: ContentKind;
  defaultValue: string;
  help?: string;
}

export interface ContentSection {
  id: string;
  title: string;
  fields: ContentField[];
}

export interface ContentPageDef {
  id: string;
  title: string;
  path: string;
  sections: ContentSection[];
}

const field = (
  key: string,
  label: string,
  kind: ContentKind,
  defaultValue: string,
  help?: string,
): ContentField => ({ key, label, kind, defaultValue, help });

export const DESTINATION_IDS = [
  'okavango',
  'kruger',
  'masai-mara',
  'namibia',
  'rwanda',
  'tanzania',
  'uganda',
  'zimbabwe',
  'zambia',
  'mozambique',
] as const;

const destinationDefaults: {
  id: (typeof DESTINATION_IDS)[number];
  country: string;
  image: string;
  description: string;
}[] = [
  {
    id: 'okavango',
    country: 'Botswana',
    image: IMAGES.okavango,
    description: `Botswana offers one of Africa’s most exclusive and untouched luxury safari experiences — an extraordinary destination designed for discerning travellers and high-level corporate incentives.

With its vast open landscapes, exceptional wildlife encounters and luxury safari camps, Botswana delivers a rare sense of privacy, prestige and authentic African wilderness.

From the pristine waterways of the Okavango Delta to the dramatic elephant-rich plains of Chobe National Park and the remote beauty of the Makgadikgadi Pans, every experience is curated to inspire connection, reward excellence and create unforgettable shared moments.

Guests can enjoy world-renowned luxury camps such as Mombo Camp, Jao Camp, Vumbura Plains and Jack's Camp — combining exceptional service, sophisticated design and immersive safari experiences in some of Africa’s most spectacular wilderness areas.

Whether gliding silently through the Delta on a mokoro, enjoying sunset game drives with Africa’s iconic wildlife, or dining beneath endless starlit skies, Botswana offers a truly elevated incentive experience that leaves a lasting impression on top-performing teams, executives and valued stakeholders.`,
  },
  {
    id: 'kruger',
    country: 'South Africa',
    image: IMAGES.sa,
    description: `South Africa offers a world-class blend of luxury safari experiences, vibrant cities, breathtaking landscapes and exceptional hospitality — making it one of Africa’s most versatile and rewarding destinations for high-end corporate incentives. From the iconic wildlife encounters of the Greater Kruger National Park to the scenic beauty of Cape Town and the renowned vineyards of the Cape Winelands, South Africa delivers extraordinary experiences tailored for discerning travellers and executive teams.

Guests can enjoy award-winning luxury lodges and camps such as Singita Boulders Lodge, Royal Malewane, Londolozi Private Granite Suites and RockFig Safari Lodge  -  each offering exceptional service, sophisticated accommodation and unforgettable wildlife encounters in spectacular natural settings.

Whether enjoying private game drives, exclusive wine tastings, helicopter flights over the peninsula or elegant bush dinners beneath the African stars, South Africa creates inspiring shared experiences that reward excellence, strengthen relationships and leave a lasting impression on key stakeholders and top-performing teams.`,
  },
  {
    id: 'masai-mara',
    country: 'Kenya',
    image: IMAGES.kenya,
    description: `Kenya delivers one of Africa’s most iconic luxury safari experiences — where untamed wilderness, refined hospitality and unforgettable wildlife encounters come together to reward and inspire top-performing teams and key stakeholders. From the sweeping plains of the world-renowned Maasai Mara to the elephant-rich landscapes beneath the vistas of Mount Kilimanjaro in Amboseli National Park, Kenya offers an incentive destination designed to leave a lasting impression.

Guests can indulge in exceptional luxury camps and lodges such as Angama Mara, Mahali Mzuri and Mara Plains Camp — each combining world-class service, elegant accommodation and immersive safari experiences in breathtaking settings.

Whether it’s witnessing the Great Migration, enjoying private bush dinners under the African stars, hot air balloon safaris at sunrise, or meaningful cultural interactions with the Maasai people, Kenya creates powerful shared experiences that strengthen relationships, inspire performance and reward excellence at the highest level.`,
  },
  {
    id: 'namibia',
    country: 'Namibia',
    image: IMAGES.namibia,
    description: `Namibia offers a safari experience unlike anywhere else in Africa — where dramatic desert landscapes, remote luxury lodges and extraordinary wildlife encounters combine to create an unforgettable incentive destination for discerning travellers and executive teams. With its vast open spaces, striking scenery and sense of exclusivity, Namibia delivers inspiring journeys designed to reward achievement and strengthen meaningful business relationships.

From the towering red dunes of Sossusvlei and the rugged wilderness of Damaraland to the wildlife-rich plains of Etosha National Park and the remote beauty of the Skeleton Coast, Namibia offers a unique blend of adventure, luxury and untouched natural beauty.

Guests can experience exceptional luxury camps and lodges such as &Beyond Sossusvlei Desert Lodge, Hoanib Skeleton Coast Camp, Little Kulala and Onguma The Fort — each offering world-class hospitality, refined comfort and immersive experiences in some of Africa’s most breathtaking settings.

Whether soaring above the desert by hot air balloon, tracking desert-adapted elephants through ancient valleys, enjoying private stargazing experiences beneath Namibia’s crystal-clear skies or indulging in elegant bush dining in remote wilderness locations, Namibia creates extraordinary shared experiences that inspire connection, reward excellence and leave a lasting impression long after the journey ends.`,
  },
  {
    id: 'rwanda',
    country: 'Rwanda',
    image: IMAGES.rwanda,
    description: `Rwanda offers one of Africa’s most exclusive and transformative luxury travel experiences — where extraordinary wildlife encounters, breathtaking landscapes and refined hospitality come together to create an unforgettable incentive destination.

Known as the “Land of a Thousand Hills”, Rwanda provides a rare opportunity to reward top-performing teams and key stakeholders with a journey that is both deeply meaningful and truly exceptional.

At the heart of Rwanda’s appeal is the iconic Volcanoes National Park, home to the endangered mountain gorillas and one of the world’s most sought-after wildlife experiences. Combined with the savannah landscapes of Akagera National Park and the ancient rainforest of Nyungwe Forest National Park, Rwanda offers a luxurious safari experience unlike any other.

Guests can stay in exceptional luxury lodges such as Singita Kwitonda Lodge, Bisate Lodge, One&Only Gorilla’s Nest and Magashi Camp — each offering world-class service, elegant design and immersive nature experiences in remarkable settings.

Whether trekking through mist-covered forests to encounter mountain gorillas, enjoying private helicopter transfers over Rwanda’s dramatic hills or sharing intimate fireside dinners in luxurious lodges, Rwanda creates powerful shared experiences that inspire connection, reward excellence and leave a lasting impression long after the journey ends.`,
  },
  {
    id: 'tanzania',
    country: 'Tanzania',
    image: IMAGES.tanzania,
    description: `Tanzania offers a safari experience of extraordinary scale, beauty and exclusivity - where vast wilderness, iconic wildlife and world-class luxury combine to create unforgettable incentive journeys for top-performing teams and valued stakeholders. From the endless plains of the legendary Serengeti National Park to the breathtaking natural wonder of the Ngorongoro Crater and the remote wilderness of Ruaha National Park and Nyerere National Park (formerly known as Selous Game Reserve), Tanzania delivers authentic African experiences in remarkable style.

Guests can experience exceptional luxury safari camps and lodges such as Singita Sasakwa Lodge, Four Seasons Safari Lodge Serengeti, &Beyond Ngorongoro Crater Lodge and Jabali Ridge — each offering refined comfort, exceptional service and immersive wildlife encounters in some of Africa’s most spectacular landscapes.

Whether witnessing the Great Migration, enjoying private bush dining experiences, soaring above the Serengeti in a hot air balloon or ending a safari adventure on the idyllic beaches of Zanzibar, Tanzania creates meaningful, once-in-a-lifetime moments that inspire connection, reward excellence and leave a lasting impression.`,
  },
  {
    id: 'uganda',
    country: 'Uganda',
    image: IMAGES.uganda,
    description: `Uganda offers a truly unique and exclusive African incentive experience — combining breathtaking natural beauty, rare wildlife encounters and intimate luxury lodges in one of the continent’s most captivating destinations.

Known as the “Pearl of Africa”, Uganda delivers extraordinary journeys designed to inspire, reward and leave a lasting impression on key stakeholders and executive teams.

From the mist-covered forests of Bwindi Impenetrable National Park, home to the iconic mountain gorillas, to the wildlife-rich savannahs of Queen Elizabeth National Park and the dramatic landscapes surrounding Murchison Falls National Park, Uganda offers an exceptional combination of adventure, exclusivity and authentic African luxury.

Guests can unwind in remarkable luxury lodges such as Bwindi Lodge, Kyambura Gorge Lodge, Baker’s Lodge and Clouds Mountain Gorilla Lodge — where refined comfort, personalised service and immersive wilderness experiences come together seamlessly.

Whether trekking through ancient forests to encounter endangered gorillas, cruising along the Nile River at sunset, or enjoying private fireside dining beneath the stars, Uganda creates meaningful shared experiences that foster connection, reward achievement and deliver unforgettable moments for top-performing teams and valued clients.`,
  },
  {
    id: 'zimbabwe',
    country: 'Zimbabwe',
    image: IMAGES.zimbabwe,
    description: `Zimbabwe offers a sophisticated blend of untamed wilderness, the iconic Victoria Falls and exceptional safari experiences - making it an outstanding destination for luxury corporate incentives and executive retreats. With its renowned guiding and authentic African hospitality, Zimbabwe delivers meaningful journeys designed to reward achievement and inspire lasting connections among key stakeholders and top-performing teams.

From the majestic beauty of Victoria Falls to the elephant-rich landscapes of Hwange National Park and the pristine waterways of Mana Pools National Park, Zimbabwe offers an extraordinary combination of adventure, exclusivity and world-class safari experiences.

Guests can stay at exceptional luxury camps and lodges such as Singita Pamushana Lodge, Somalisa Camp, Nyamatusi Camp and Matetsi Victoria Falls — each offering refined luxury, personalised service and immersive wildlife encounters in breathtaking settings.

Experience private game drives, tiger fishing, canoeing along the Zambezi River, or walking safaris led by some of Africa’s finest guides. Zimbabwe creates unforgettable shared experiences that strengthen relationships, celebrate success and leave a lasting impression long after the journey ends.`,
  },
  {
    id: 'zambia',
    country: 'Zambia',
    image: IMAGES.zambia,
    description: `Zambia offers an authentic and exclusive safari experience for discerning travellers seeking luxury, adventure and meaningful connection in Africa’s untamed wilderness. Renowned for its exceptional guiding, remote luxury camps and raw natural beauty, Zambia provides the perfect setting for unforgettable corporate incentives that reward excellence and inspire top-performing teams and valued stakeholders.

From the wildlife-rich plains of South Luangwa National Park — regarded as one of Africa’s premier safari destinations — to the breathtaking waterways of Lower Zambezi National Park and the awe-inspiring power of Victoria Falls, Zambia delivers immersive safari experiences in some of the continent’s most spectacular landscapes.

Guests can enjoy world-class luxury camps and lodges such as Time + Tide Chinzombo, Shumba Camp, Royal Chundu and Sausage Tree Camp — each offering refined comfort, personalised service and extraordinary wildlife encounters in remote and intimate settings.

Whether enjoying walking safaris led by expert guides, sunset cruises along the Zambezi River, helicopter flights over Victoria Falls or elegant bush dining under the stars, Zambia creates unforgettable shared experiences that strengthen relationships, reward achievement and leave a lasting impression long after the journey ends.`,
  },
  {
    id: 'mozambique',
    country: 'Mozambique',
    image: IMAGES.mozambique,
    description: `Mozambique offers an exceptional blend of barefoot luxury on pristine tropical islands - creating the perfect destination for high-end corporate incentives and unforgettable executive escapes.

With its untouched Indian Ocean coastline, crystal-clear waters and remote luxury lodges, Mozambique delivers a unique combination of relaxation, adventure and refined hospitality designed to reward and inspire top-performing teams and valued stakeholders.

From the idyllic beaches and vibrant marine life of the Bazaruto Archipelago and Quirimbas Archipelago, Mozambique offers an extraordinary marine safari in one remarkable destination.

Guests can indulge in world-class luxury lodges and island retreats such as Azura Benguerra Island, &Beyond Benguerra Island and Santorini Mozambique — each offering personalised service, elegant accommodation and exclusive experiences in breathtaking coastal settings.

Whether enjoying private dhow cruises at sunset, world-class diving and snorkelling, helicopter island transfers, beachfront dining beneath the stars or combining a luxury safari with an Indian Ocean escape, Mozambique creates inspiring shared experiences that strengthen relationships, reward excellence and leaves a lasting impression long after the journey ends.`,
  },
];

const paragraphHelp = 'Leave a blank line between paragraphs. The page layout stays the same.';
const linesHelp = 'One line per item. The list style on the page stays the same.';

export const CONTENT_PAGES: ContentPageDef[] = [
  {
    id: 'home',
    title: 'Home',
    path: '/',
    sections: [
      {
        id: 'hero',
        title: 'Top banner',
        fields: [
          field('home.hero.image', 'Background photo', 'image', IMAGES.hero),
          field('home.hero.eyebrow', 'Small heading', 'short', 'Corporate Safari Incentives'),
          field('home.hero.headline', 'Main headline', 'short', 'Where performance meets luxury'),
          field('home.hero.headlineItalic', 'Headline ending (shown in italic)', 'short', '- in the wilderness'),
          field(
            'home.hero.body',
            'Intro paragraph',
            'long',
            "Boardroom Safaris designs and delivers premium African safari incentive programmes for the world's most ambitious organisations.",
          ),
          field('home.hero.button', 'Button label', 'short', 'Discuss Your Programme'),
        ],
      },
      {
        id: 'positioning',
        title: 'Introduction',
        fields: [
          field('home.positioning.eyebrow', 'Small heading', 'short', 'A Different Approach'),
          field('home.positioning.heading', 'Heading', 'short', 'We are not just a travel company.'),
          field('home.positioning.subheading', 'Second line of heading', 'short', 'We are a strategic incentive partner.'),
          field(
            'home.positioning.body',
            'Paragraph',
            'long',
            "Boardroom Safaris sits at the intersection of corporate strategy, executive incentives, and African wilderness experiences. We design programmes that drive measurable business outcomes — delivered through Africa's most transformative environments.",
          ),
        ],
      },
      {
        id: 'programmes',
        title: 'Two programmes',
        fields: [
          field('home.programmes.eyebrow', 'Small heading', 'short', 'Our Programmes'),
          field('home.programmes.heading', 'Heading', 'short', 'Two Pillars of Incentive Excellence'),
          field('home.programme1.label', 'First programme label', 'short', 'Programme One'),
          field('home.programme1.title', 'First programme title', 'short', 'Talent & Leadership Incentives'),
          field(
            'home.programme1.body',
            'First programme text',
            'long',
            'Reward and retain your most valuable people. Intimate, high-touch safari experiences designed for executive teams, senior leadership, and high-potential talent.',
          ),
          field('home.programme1.image', 'First programme photo', 'image', IMAGES.home_1),
          field('home.programme2.label', 'Second programme label', 'short', 'Programme Two'),
          field('home.programme2.title', 'Second programme title', 'short', 'Sales & Growth Incentives'),
          field(
            'home.programme2.body',
            'Second programme text',
            'long',
            'Drive revenue performance with aspirational rewards. Scalable safari programmes designed to motivate sales teams, channel partners, and top performers.',
          ),
          field('home.programme2.image', 'Second programme photo', 'image', IMAGES.home_2),
        ],
      },
      {
        id: 'cta',
        title: 'Closing banner',
        fields: [
          field('home.cta.image', 'Background photo', 'image', IMAGES.elephant),
          field('home.cta.eyebrow', 'Small heading', 'short', 'Begin the Conversation'),
          field(
            'home.cta.heading',
            'Heading',
            'short',
            'Transform your incentive programme into something extraordinary',
          ),
          field(
            'home.cta.body',
            'Paragraph',
            'long',
            "Every great programme begins with a conversation. Tell us about your objectives, and we'll show you what's possible.",
          ),
          field('home.cta.button', 'Button label', 'short', 'Start an Enquiry'),
        ],
      },
    ],
  },
  {
    id: 'about',
    title: 'About',
    path: '/about',
    sections: [
      {
        id: 'hero',
        title: 'Top banner',
        fields: [
          field('about.hero.image', 'Background photo', 'image', IMAGES.boardroom),
          field('about.hero.eyebrow', 'Small heading', 'short', 'About Us'),
          field('about.hero.heading', 'Headline', 'short', 'Beyond the Boardroom'),
        ],
      },
      {
        id: 'story',
        title: 'Story',
        fields: [
          field(
            'about.story.body',
            'Story text',
            'long',
            `With over 30 years of combined luxury safari experience, our partnership network brings deep industry insight and a clear understanding of what it takes to deliver seamless, high-value travel for discerning clients.

Our strength is built on long-standing relationships with leading lodges, travel specialists, and destination management companies across all major African safari regions. These trusted partnerships ensure privileged access, meticulous planning, and flawless execution at every stage of the journey.

At Boardroom Safaris, we don't simply plan trips — we deliver strategic incentive experiences that leave a lasting impression.`,
            paragraphHelp,
          ),
          field('about.story.image', 'Photo beside the story', 'image', IMAGES.lodge),
        ],
      },
      {
        id: 'philosophy',
        title: 'Philosophy',
        fields: [
          field(
            'about.philosophy.heading',
            'Heading',
            'short',
            'Where performance meets luxury in the African wilderness.',
          ),
          field('about.philosophy.1.title', 'Card 1 title', 'short', 'Discretion'),
          field(
            'about.philosophy.1.body',
            'Card 1 text',
            'long',
            'We understand the sensitivities of corporate incentive spend. Every engagement is handled with the utmost confidentiality and professionalism.',
          ),
          field('about.philosophy.2.title', 'Card 2 title', 'short', 'Intentionality'),
          field(
            'about.philosophy.2.body',
            'Card 2 text',
            'long',
            'Nothing is left to chance. Every element of your programme — from the lodge selection to the dining experience — is designed with purpose.',
          ),
          field('about.philosophy.3.title', 'Card 3 title', 'short', 'Authenticity'),
          field(
            'about.philosophy.3.body',
            'Card 3 text',
            'long',
            'We believe in genuine African experiences, not manufactured tourism. Our programmes connect your people with the real power of the wilderness.',
          ),
          field('about.philosophy.4.title', 'Card 4 title', 'short', 'Impact'),
          field(
            'about.philosophy.4.body',
            'Card 4 text',
            'long',
            'We measure success not by the beauty of the destination, but by the business outcomes your programme achieves.',
          ),
        ],
      },
      {
        id: 'expertise',
        title: 'Expertise banner',
        fields: [
          field('about.expertise.image', 'Background photo', 'image', IMAGES.lion),
          field('about.expertise.eyebrow', 'Small heading', 'short', 'Our Expertise'),
          field('about.expertise.heading', 'Heading', 'short', 'Deep Africa knowledge. Corporate-grade delivery.'),
          field(
            'about.expertise.body',
            'Text',
            'long',
            `Our team combines decades of experience across corporate incentive strategy, luxury hospitality, and African safari operations. We know the lodges, the landscapes, and the logistics — because we've been there, repeatedly.

More importantly, we understand the corporate context. We know what a CFO needs to see to approve the investment. We know what an HR Director needs to feel confident the programme will deliver. And we know what your top performers need to experience to feel genuinely valued.`,
            paragraphHelp,
          ),
          field('about.expertise.button', 'Button label', 'short', 'Start a Conversation'),
        ],
      },
    ],
  },
  {
    id: 'incentives',
    title: 'Incentives',
    path: '/incentives',
    sections: [
      {
        id: 'hero',
        title: 'Top banner',
        fields: [
          field('incentives.hero.image', 'Background photo', 'image', IMAGES.privateDining),
          field('incentives.hero.eyebrow', 'Small heading', 'short', 'Incentives'),
          field(
            'incentives.hero.heading',
            'Headline',
            'short',
            'Curated Safari Experiences for Corporate Excellence',
          ),
        ],
      },
      {
        id: 'intro',
        title: 'Introduction',
        fields: [
          field('incentives.intro.heading', 'Heading', 'short', 'Two distinct programme types. One shared objective.'),
          field(
            'incentives.intro.body',
            'Paragraph',
            'long',
            "Whether you're rewarding a select group of senior leaders or motivating an entire sales organisation, we design programmes that deliver measurable business impact through Africa's most transformative environments.",
          ),
        ],
      },
      {
        id: 'executive',
        title: 'Talent & leadership',
        fields: [
          field('incentives.executive.image', 'Photo', 'image', IMAGES.tentInterior2),
          field('incentives.executive.label', 'Small label', 'short', 'Executive Programme'),
          field('incentives.executive.heading', 'Heading', 'short', 'Talent & Leadership Incentives'),
          field(
            'incentives.executive.body',
            'Main paragraph',
            'long',
            'Intimate, high-touch safari experiences designed for your most valuable people. These programmes reward exceptional individual contribution, strengthen leadership bonds, and create the kind of shared experiences that are priceless.',
          ),
          field(
            'incentives.executive.ideal',
            'Ideal for line',
            'long',
            'Ideal for: C-suite retreats, board experiences, senior leadership rewards, high-potential talent recognition, VIP client entertainment, partner appreciation.',
          ),
          field(
            'incentives.executive.features',
            'Bullet points',
            'lines',
            'Bespoke itineraries\nPersonalised welcome and in-lodge experiences\nExecutive-level transfers and logistics',
            linesHelp,
          ),
        ],
      },
      {
        id: 'growth',
        title: 'Sales & growth',
        fields: [
          field(
            'incentives.growth.image',
            'Photo',
            'image',
            'https://darkred-bat-620545.hostingersite.com/wp-content/uploads/2026/06/Sales-Growth-incentives-.png',
          ),
          field('incentives.growth.label', 'Small label', 'short', 'Growth Programme'),
          field('incentives.growth.heading', 'Heading', 'short', 'Sales & Growth Incentives'),
          field(
            'incentives.growth.body',
            'Main paragraph',
            'long',
            'Aspirational, scalable safari programmes designed to drive revenue performance. These programmes create a powerful motivational currency — the kind that transforms sales targets from obligations into ambitions.',
          ),
          field(
            'incentives.growth.ideal',
            'Ideal for line',
            'long',
            'Ideal for: Sales team rewards, channel partner incentives, dealer/distributor programmes, annual performance recognition, customer loyalty rewards.',
          ),
          field(
            'incentives.growth.features',
            'Bullet points',
            'lines',
            'Bespoke itineraries\nPersonalised welcome and in-lodge experiences\nExecutive-level transfers and logistics',
            linesHelp,
          ),
        ],
      },
      {
        id: 'faq',
        title: 'Questions',
        fields: [
          field('incentives.faq.eyebrow', 'Small heading', 'short', 'Common Questions'),
          field('incentives.faq.heading', 'Heading', 'short', 'Frequently Asked Questions'),
          field(
            'incentives.faq.1.q',
            'Question 1',
            'long',
            'How far in advance should we plan an incentive programme?',
          ),
          field(
            'incentives.faq.1.a',
            'Answer 1',
            'long',
            'We recommend a minimum of 6–9 months for executive programmes and 9–12 months for larger group incentives. This allows adequate time for lodge availability, logistics planning, and participant communications.',
          ),
          field(
            'incentives.faq.2.q',
            'Question 2',
            'long',
            'What is the typical investment for a safari incentive programme?',
          ),
          field(
            'incentives.faq.2.a',
            'Answer 2',
            'long',
            'Investment varies significantly based on group size, duration, destination, and level of exclusivity. We work with each client to design a programme that delivers maximum impact within their budget parameters. We are happy to discuss indicative pricing during an initial consultation.',
          ),
          field(
            'incentives.faq.3.q',
            'Question 3',
            'long',
            'Can you accommodate dietary requirements and accessibility needs?',
          ),
          field(
            'incentives.faq.3.a',
            'Answer 3',
            'long',
            'Absolutely. Every programme is fully customised to accommodate all participant requirements, including dietary needs, mobility considerations, and any other special requirements.',
          ),
          field('incentives.faq.4.q', 'Question 4', 'long', 'Do you handle all travel logistics?'),
          field(
            'incentives.faq.4.a',
            'Answer 4',
            'long',
            'Yes. From international flights to inter-camp transfers, ground transport, and all in-destination logistics — we manage every detail end-to-end.',
          ),
          field('incentives.faq.button', 'Button label', 'short', 'Start A Conversation'),
        ],
      },
    ],
  },
  {
    id: 'destinations',
    title: 'Destinations',
    path: '/destinations',
    sections: [
      {
        id: 'hero',
        title: 'Top banner',
        fields: [
          field('destinations.hero.image', 'Background photo', 'image', IMAGES.masaiMara),
          field('destinations.hero.eyebrow', 'Small heading', 'short', 'Destinations'),
          field('destinations.hero.heading', 'Headline', 'short', "Africa's Finest Safari Destinations"),
        ],
      },
      {
        id: 'intro',
        title: 'Introduction',
        fields: [
          field(
            'destinations.intro.body',
            'Paragraph',
            'long',
            "We work with a carefully curated selection of Africa's most exceptional safari destinations. Each region has been chosen for its ability to deliver transformative experiences that align with the expectations of discerning corporate audiences.",
          ),
        ],
      },
      ...destinationDefaults.map((dest) => ({
        id: dest.id,
        title: dest.country,
        fields: [
          field(`destinations.${dest.id}.country`, 'Name on the card', 'short', dest.country),
          field(`destinations.${dest.id}.image`, 'Photo', 'image', dest.image),
          field(`destinations.${dest.id}.description`, 'Description', 'long', dest.description, paragraphHelp),
        ],
      })),
      {
        id: 'cta',
        title: 'Closing section',
        fields: [
          field('destinations.cta.heading', 'Heading', 'short', 'Not sure which destination is right?'),
          field(
            'destinations.cta.body',
            'Paragraph',
            'long',
            'Our team will recommend the perfect destination based on your programme objectives, group profile, and timing requirements.',
          ),
          field('destinations.cta.button', 'Button label', 'short', 'Discuss Destinations'),
        ],
      },
    ],
  },
  {
    id: 'why-us',
    title: 'Why us',
    path: '/why-us',
    sections: [
      {
        id: 'hero',
        title: 'Top banner',
        fields: [
          field('why.hero.image', 'Background photo', 'image', IMAGES.tentInterior),
          field('why.hero.eyebrow', 'Small heading', 'short', 'Why Us'),
          field('why.hero.heading', 'Headline', 'short', 'The Boardroom Safaris Difference'),
        ],
      },
      {
        id: 'value',
        title: 'Difference',
        fields: [
          field(
            'why.value.heading',
            'Heading',
            'short',
            "We don't sell safaris. We design strategic incentive experiences.",
          ),
          field(
            'why.value.body',
            'Paragraph',
            'long',
            'The difference between a safari holiday and a Boardroom Safaris programme is the difference between a gift and an investment. Every element is designed to deliver measurable business value.',
          ),
          field('why.card.1.title', 'Card 1 title', 'short', 'Strategic Alignment'),
          field(
            'why.card.1.body',
            'Card 1 text',
            'long',
            'Every programme is anchored to your business objectives. We design incentives that drive the behaviours and outcomes you need.',
          ),
          field('why.card.2.title', 'Card 2 title', 'short', 'Uncompromising Quality'),
          field(
            'why.card.2.body',
            'Card 2 text',
            'long',
            "We work exclusively with Africa's finest private lodges and operators. No compromises, no shortcuts, no generic experiences.",
          ),
          field('why.card.3.title', 'Card 3 title', 'short', 'Complete Discretion'),
          field(
            'why.card.3.body',
            'Card 3 text',
            'long',
            'We understand the sensitivities of corporate incentive spend. Every engagement is handled with absolute confidentiality.',
          ),
          field('why.card.4.title', 'Card 4 title', 'short', 'Boutique Service'),
          field(
            'why.card.4.body',
            'Card 4 text',
            'long',
            'We deliberately limit the number of programmes we manage, ensuring each client receives our full attention and expertise.',
          ),
        ],
      },
      {
        id: 'outcomes',
        title: 'Business outcomes',
        fields: [
          field('why.outcomes.eyebrow', 'Small heading', 'short', 'Business Outcomes'),
          field(
            'why.outcomes.heading',
            'Heading',
            'long',
            'We believe that organisations using experiential incentives can achieve measurable gains in performance, retention, and brand advocacy.',
          ),
          field(
            'why.outcomes.1',
            'Point 1',
            'long',
            'Organisations using experiential incentives report higher retention among top performers.',
          ),
          field('why.outcomes.2', 'Point 2', 'long', 'Well-designed incentive programmes can increase sales productivity.'),
          field(
            'why.outcomes.3',
            'Point 3',
            'long',
            'Shared wilderness experiences create bonds that translate directly into improved executive team performance.',
          ),
          field(
            'why.outcomes.4',
            'Point 4',
            'long',
            'Participants become powerful brand ambassadors, sharing their experiences across professional networks.',
          ),
          field('why.outcomes.image', 'Photo', 'image', IMAGES.dining),
        ],
      },
      {
        id: 'cta',
        title: 'Closing banner',
        fields: [
          field('why.cta.image', 'Background photo', 'image', IMAGES.okavango),
          field('why.cta.heading', 'Heading', 'short', 'Experience the Boardroom Safaris difference'),
          field(
            'why.cta.body',
            'Paragraph',
            'long',
            "Let's discuss how a strategically designed safari incentive programme can deliver real business value for your organisation.",
          ),
          field('why.cta.button', 'Button label', 'short', 'Discuss Your Programme'),
        ],
      },
    ],
  },
  {
    id: 'contact',
    title: 'Contact',
    path: '/contact',
    sections: [
      {
        id: 'hero',
        title: 'Top banner',
        fields: [
          field('contact.hero.image', 'Background photo', 'image', IMAGES.giraffes),
          field('contact.hero.eyebrow', 'Small heading', 'short', 'Contact'),
          field('contact.hero.heading', 'Headline', 'short', 'Start a Conversation'),
        ],
      },
      {
        id: 'intro',
        title: 'Introduction',
        fields: [
          field('contact.intro.heading', 'Heading', 'short', 'Start Your Incentive Programme'),
          field(
            'contact.intro.body',
            'Text',
            'long',
            `At Boardroom Safaris, every engagement begins with a clear understanding of your business objectives and the stakeholders you want to recognise.

Whether you are planning a discreet executive reward or a large-scale corporate incentive programme, we approach each enquiry with precision, discretion, and strategic intent.`,
            paragraphHelp,
          ),
          field('contact.form.heading', 'Form heading', 'short', 'Enquiry Form'),
          field(
            'contact.form.intro',
            'Form introduction',
            'long',
            'Complete the form below and a member of our team will respond within 24 hours.',
          ),
        ],
      },
      {
        id: 'details',
        title: 'Contact details',
        fields: [
          field('contact.details.heading', 'Box heading', 'short', 'Direct Contact'),
          field('contact.email', 'Email', 'short', 'enquiries@boardroomsafaris.com'),
          field('contact.phone', 'Phone', 'short', '+27 82 927 5408'),
          field('contact.office', 'Office', 'short', 'Cape Town, South Africa'),
          field('contact.response', 'Response time', 'short', 'Within 24 hours'),
          field('contact.confidential.heading', 'Confidentiality heading', 'short', 'Confidentiality'),
          field(
            'contact.confidential.body',
            'Confidentiality text',
            'long',
            'All enquiries are treated with complete confidentiality. We understand the sensitivities of corporate incentive planning and handle every conversation with discretion.',
          ),
        ],
      },
      {
        id: 'thanks',
        title: 'Thank-you message',
        fields: [
          field('contact.thanks.heading', 'Heading', 'short', 'Thank You'),
          field(
            'contact.thanks.body',
            'Message',
            'long',
            'Your enquiry has been received. A member of our team will be in touch within 24 hours to discuss your incentive programme requirements.',
          ),
        ],
      },
      {
        id: 'footer',
        title: 'Footer (shown on every page)',
        fields: [
          field(
            'footer.blurb',
            'Short description under the logo',
            'long',
            "Transforming business performance into meaningful, unforgettable experiences in Africa's most powerful environments.",
          ),
        ],
      },
    ],
  },
];

export const DEFAULT_CONTENT: Record<string, string> = Object.fromEntries(
  CONTENT_PAGES.flatMap((page) =>
    page.sections.flatMap((section) => section.fields.map((item) => [item.key, item.defaultValue])),
  ),
);

export function contentLines(value: string): string[] {
  return value
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean);
}

export function contentParagraphs(value: string): string[] {
  return value
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);
}
