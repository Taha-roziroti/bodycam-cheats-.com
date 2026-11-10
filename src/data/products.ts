import { t } from '../i18n';
import { checkoutForSlug, checkoutPath } from '../config/checkout';
import type { IconName } from '../components/icons/types';

export interface ProductSlide {
  src: string;
  alt: string;
  caption: string;
  captionDesc: string;
}

export interface ProductOverview {
  title: string;
  paragraphs: string[];
}

export interface AcquisitionStep {
  num: string;
  title: string;
  desc: string;
}

export interface ProductAcquisition {
  title: string;
  steps: AcquisitionStep[];
}

export interface SystemRequirement {
  icon: IconName;
  text: string;
}

export interface ProductPage {
  slug: string;
  kind: 'tier' | 'utility';
  badge: string;
  category?: string;
  tier?: string;
  name: string;
  title: string;
  subtitle: string;
  desc: string;
  features: string[];
  more: number;
  variant?: 'essential' | 'popular' | 'limited';
  buyUrl: string;
  images: ProductSlide[];
  overview: ProductOverview;
  acquisition: ProductAcquisition;
  goodToKnow: string;
  limitations: string;
  fullFeatures: string[];
  systemRequirements: SystemRequirement[];
  about?: { type: 'h2' | 'p'; text: string }[];
  body: { type: 'h2' | 'p'; text: string }[];
  relatedBlogSlugs: string[];
}

/** Guides paired with each product detail page */
export const productRelatedBlogSlugs: Record<string, string[]> = {
  lite: ['placeholder-article'],
  pro: ['placeholder-article'],
  elite: ['placeholder-article'],
  'hwid-spoofer': ['placeholder-article'],
  ugc: ['placeholder-article'],
  'unlock-all': ['placeholder-article'],
};

const productBase = '/products/dota-2-cheats/';

const defaultAcquisitionSteps: AcquisitionStep[] = [
  {
    num: '01',
    title: 'Review current status',
    desc: 'Check the live banner on dotacheats.com and Discord #status before purchase—especially after a Dota 2 or VAC update.',
  },
  {
    num: '02',
    title: 'Choose your access tier',
    desc: 'Select Example product tiers or the utility that matches your goal. Review the feature list before checkout via our secure checkout.',
  },
  {
    num: '03',
    title: 'Contact the team',
    desc: 'Open Discord and confirm availability, Steam platform, and payment details with your order email ready.',
  },
  {
    num: '04',
    title: 'Follow guided setup',
    desc: 'Use only the operator portal, patch loader, and setup guide. Test in a lobby, load presets, then queue ranked or Turbo.',
  },
];

function acquisitionFor(productName: string): ProductAcquisition {
  return {
    title: `How to get ${productName}`,
    steps: defaultAcquisitionSteps,
  };
}

const sharedGoodToKnow =
  'Dota 2 and VAC receive frequent updates. Confirm module availability on the live status panel at dotacheats.com before you purchase or launch. Overlay behavior may differ in lobbies, replays and spectator mode after patches.';

const sharedLimitations =
  'Third-party software in Dota 2 can violate Valve Terms of Use and lead to VAC bans or account action. You use this software at your own risk. Compatibility and availability can change after game, VAC, or Windows updates without notice.';

const dotaSystemRequirements: SystemRequirement[] = [
  { icon: 'reqWindows', text: 'Supported 64-bit edition of Windows 10 or Windows 11.' },
  { icon: 'reqSteam', text: 'Current Dota 2 client via Steam with latest patches applied.' },
  { icon: 'reqSettings', text: 'Administrator access for loader installation and patch updates.' },
  { icon: 'reqWifi', text: 'Stable internet connection for portal access and patch delivery.' },
  { icon: 'reqCpu', text: 'A system that meets Dota 2 published hardware requirements.' },
];

type GalleryKey = keyof typeof galleryRaw;

const gameplay = '/images/gameplay';

const galleryRaw = {
  gpMapHack: {
    src: `${gameplay}/dota-2-map-hack.png`,
    alt: 'Dota 2 map hack showing enemy hero positions and ward locations',
    caption: 'Map hack awareness',
    captionDesc: 'Enemy position tracking, ward ESP and rune timers during a ranked mid push.',
  },
  gpScripts: {
    src: `${gameplay}/dota-2-scripts-combo.png`,
    alt: 'Dota 2 Auto Combo script landing Invoker combo sequence',
    caption: 'Auto Combo scripts',
    captionDesc: 'Invoker Tornado → EMP → Meteor chain with Smart Cast prediction active.',
  },
  gpZoomHack: {
    src: `${gameplay}/dota-2-zoom-hack.png`,
    alt: 'Dota 2 zoom hack extended camera view of entire lane',
    caption: 'Extended camera zoom',
    captionDesc: 'Zoom hack showing full lane vision for safer positioning and gank avoidance.',
  },
  gpSkinChanger: {
    src: `${gameplay}/dota-2-skin-changer.png`,
    alt: 'Dota 2 Skin Changer previewing arcana cosmetic on hero',
    caption: 'Skin Changer preview',
    captionDesc: 'Local arcana and immortal preview via Unlock All—client-side only.',
  },
  gpAutoKill: {
    src: `${gameplay}/dota-2-auto-kill-steal.png`,
    alt: 'Dota 2 Auto Kill Steal finishing low HP enemy with Zeus ultimate',
    caption: 'Auto Kill Steal',
    captionDesc: 'Lethal threshold detection activating Finger of Death at perfect timing.',
  },
  gpFarmBot: {
    src: `${gameplay}/dota-2-farm-bot.png`,
    alt: 'Dota 2 Auto Farm Bot clearing jungle camps efficiently',
    caption: 'Auto Farm Bot',
    captionDesc: 'Jungle pathing with stack timer and courier manager for max GPM.',
  },
  gpHeroEsp: {
    src: `${gameplay}/dota-2-hero-esp.png`,
    alt: 'Dota 2 hero ESP with name tags and distance readouts',
    caption: 'Hero ESP overlay',
    captionDesc: 'Hero name tags, team colors and distance markers through fog of war.',
  },
};

function slide(...keys: GalleryKey[]): ProductSlide[] {
  return keys.map((k) => {
    const item = galleryRaw[k];
    return {
      src: item.src,
      alt: item.alt,
      caption: item.caption,
      captionDesc: item.captionDesc,
    };
  });
}

function slugFromHref(href: string): string {
  const segment = href.replace(productBase, '').replace(/^\//, '').replace(/\/$/, '');
  return segment || 'dota-2-cheats';
}

const tierAbout: Record<string, ProductPage['about']> = {
  lite: [
    {
      type: 'p',
      text: 'Dota 2 Lite is built for players who want map awareness first. In ranked, knowing enemy positions, ward placements and rune timings wins more fights than raw mechanics—Lite gives you that edge without script automation.',
    },
    { type: 'h2', text: 'Ranked-safe by design' },
    {
      type: 'p',
      text: 'Lite skips Auto Combo and bot modules entirely. Your gameplay looks natural while map hack, zoom hack and rune timers keep you informed. Stream-proof mode hides overlays from OBS capture for content creators.',
    },
  ],
  pro: [
    {
      type: 'p',
      text: 'Dota 2 Pro is the sweet spot for ranked grinders. Auto Combo, Orbwalker and Smart Cast help you win teamfights without obvious bot patterns—when you tune Delay Setting using our portal presets.',
    },
    { type: 'h2', text: 'Scripts + awareness combined' },
    {
      type: 'p',
      text: 'Pro inherits every Lite module and adds Auto Combo, Target Selector, Activator and ability radius drawing. You see the fight before it starts and win it with scripts that stay human at default settings.',
    },
  ],
  elite: [
    {
      type: 'p',
      text: 'Dota 2 Elite is the private build for players who want everything—Auto Farm Bot, Auto Kill Steal, Auto Dagon, Skin Changer, full map hack and direct developer support. Limited slots keep the build maintainable and patch cycles fast.',
    },
    { type: 'h2', text: 'Use Elite responsibly' },
    {
      type: 'p',
      text: 'Elite power demands disciplined profiles. Test in lobbies, start with portal conservative presets, and scale up over days—not minutes. Staff in Discord help Elite users tune before their first ranked queue.',
    },
  ],
};

const tierBodies: Record<string, ProductPage['body']> = {
  lite: [
    { type: 'h2', text: 'Included modules' },
    {
      type: 'p',
      text: 'Hero ESP with distance and name tags, ward and sentry locator, rune spawn timers, zoom hack, and stream-safe overlay hiding. Config presets for ranked and Turbo ship in the portal—load before your first queue.',
    },
    { type: 'h2', text: 'Upgrade path' },
    {
      type: 'p',
      text: 'Lite license holders can upgrade to Pro or Elite through the portal without losing config backups. Compare tiers on the main product page before checkout via our secure checkout.',
    },
  ],
  pro: [
    { type: 'h2', text: 'Scripts and automation' },
    {
      type: 'p',
      text: 'Auto Combo, Orbwalker, Smart Cast with Prediction, Target Selector and Activator for BKB, Hex and Orchid. Delay Setting tunes cast timing so scripts stay natural in ranked. Start with portal presets, not max sliders.',
    },
    { type: 'h2', text: 'Recommended pairing' },
    {
      type: 'p',
      text: 'Pro is the most popular tier at dotacheats.com—enough firepower for high-MMR lobbies without Elite slot limits. Pair with our scripts guide in the blog before your first ranked session.',
    },
  ],
  elite: [
    { type: 'h2', text: 'Full bot and finish suite' },
    {
      type: 'p',
      text: 'Auto Farm Bot, Lane Control AI, Auto Kill Steal, Auto Dagon, Skin Changer and full map hack with smoke alerts. Use lobby testing before ranked—Elite power requires disciplined profiles, not rage settings.',
    },
    { type: 'h2', text: 'Availability' },
    {
      type: 'p',
      text: 'Elite shows as limited slots on the status banner. Open a Discord ticket if checkout is gated—staff confirm slot availability before purchase.',
    },
  ],
};

const utilityBodies: Record<string, ProductPage['body']> = {
  'hwid-spoofer': [
    { type: 'h2', text: 'When you need it' },
    {
      type: 'p',
      text: 'Use when fresh Steam accounts fail instantly on one PC but work elsewhere—classic HWID enforcement. Do not use for account-only VAC cases; see [UGC](/products/dota-2-cheats/ugc/) instead.',
    },
    { type: 'h2', text: 'Full workflow' },
    {
      type: 'p',
      text: 'Restore point, driver cleanup, spoof application, cold reboot, identifier verification, then conservative cheat profile before ranked. Full checklist ships in the portal and in our HWID blog guide.',
    },
  ],
  'ugc': [
    { type: 'h2', text: 'What UGC covers' },
    {
      type: 'p',
      text: 'UGC (Unban & Governance Control) is an appeal workspace for Steam restrictions, VAC bans, trade holds and security flags. Build custom workflows, automate dispute steps and track case status from one dashboard—not a guaranteed unban service.',
    },
    { type: 'h2', text: 'Realistic expectations' },
    {
      type: 'p',
      text: 'Some VAC bans cannot be reversed. UGC organizes evidence and follow-ups for Valve review. Pair with [HWID Spoofer](/products/dota-2-cheats/hwid-spoofer/) when hardware is flagged, or a new account when reputation is burned.',
    },
  ],
  'unlock-all': [
    { type: 'h2', text: 'Local preview only' },
    {
      type: 'p',
      text: 'Cosmetics display on your client for testing and content creation. Other players in your lobby see your actual inventory, not preview skins.',
    },
    { type: 'h2', text: 'Included with Elite' },
    {
      type: 'p',
      text: 'Skin Changer ships inside the Elite tier. Buy standalone here if you want cosmetic preview without full combat modules.',
    },
  ],
};

const productContent: Record<
  string,
  Pick<ProductPage, 'overview' | 'images' | 'fullFeatures' | 'goodToKnow' | 'limitations' | 'systemRequirements'>
> = {
  lite: {
    images: slide('gpHeroEsp', 'gpMapHack', 'gpZoomHack'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: dotaSystemRequirements,
    fullFeatures: [
      'Player ESP & hero boxes',
      'Ward & sentry locator',
      'Jungle camp awareness',
      'Ability cooldown tracking',
      'Minimap hack overlay',
      'Streamproof overlay mode',
      'Distance readouts',
      'Team color filter',
      'Rune spawn timers',
      'Zoom hack',
      'Turbo preset config',
      'Ranked preset config',
      'Cloud config backup',
      'Patch auto-updater',
    ],
    overview: {
      title: 'Built around a clear Dota 2 awareness workflow',
      paragraphs: [
        'Dota 2 Lite focuses on hero ESP, ward locator, rune timers and zoom hack—everything you need to track ganks and map control without script automation. Modules are grouped in the portal so you can tune distance, colors, and stream-proof mode before your first queue.',
        'Lite is the entry path for ranked and Turbo players who want map awareness with minimal report risk. No Auto Combo, no bots—just readable overlays maintained every patch at dotacheats.com.',
      ],
    },
  },
  pro: {
    images: slide('gpScripts', 'gpMapHack', 'gpHeroEsp'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: dotaSystemRequirements,
    fullFeatures: [
      'All Lite ESP & map hack modules',
      'Auto Combo scripts',
      'Orbwalker',
      'Smart Cast & Prediction',
      'Target Selector',
      'Activator (BKB/Hex/Orchid)',
      'Auto Heal',
      'Ability radius drawing',
      'Delay Setting tuning',
      'Hero-specific script profiles',
      'Smoke alert integration',
      'Ranked-safe default presets',
      'Lobby test profile',
      'Cloud config backup',
      'Patch auto-updater',
      'Discord operator support',
    ],
    overview: {
      title: 'Built around a clear Dota 2 scripts workflow',
      paragraphs: [
        'Dota 2 Pro adds Auto Combo, Orbwalker, Smart Cast and Activator on top of every Lite module. Hero profiles, delay tuning and activation keys live in one scripts tab—tuned for ranked lobbies when you start with portal presets, not max sliders.',
        'Pro is the most popular tier: enough firepower for ranked and Turbo without Elite slot limits. Target Selector and Activator keep you efficient mid-fight while scripts stay human at default settings.',
      ],
    },
  },
  elite: {
    images: slide('gpAutoKill', 'gpFarmBot', 'gpSkinChanger'),
    goodToKnow: sharedGoodToKnow,
    limitations: sharedLimitations,
    systemRequirements: dotaSystemRequirements,
    fullFeatures: [
      'All Lite + Pro modules',
      'Auto Farm Bot',
      'Lane Control AI',
      'Stack timer',
      'Auto Courier Manager',
      'Auto Kill Steal',
      'Auto Dagon',
      'Full map hack suite',
      'Smoke alert system',
      'Vision detector',
      'Skin Changer (Unlock All)',
      'Priority patch queue',
      'Direct dev Discord support',
      'Elite conservative presets',
      'Cloud config backup',
      'Patch auto-updater',
      'Private slot access',
    ],
    overview: {
      title: 'Built around a full Dota 2 operator workflow',
      paragraphs: [
        'Dota 2 Elite is the private build with Auto Farm Bot, Auto Kill Steal, Auto Dagon, Skin Changer, full map hack and priority patch delivery. Every Lite and Pro module is included—no caps, no upsells inside the loader.',
        'Elite slots are limited so patch cycles stay fast and builds stay maintainable. Direct dev support in Discord helps you tune conservative profiles before ranked. Check the status banner on dotacheats.com before purchase.',
      ],
    },
  },
  'hwid-spoofer': {
    images: slide('gpMapHack', 'gpHeroEsp', 'gpZoomHack'),
    goodToKnow:
      'Run the compatibility scan in the portal before spoofing. Create a Windows restore point first. Verify identifiers changed after a cold reboot before launching Dota 2.',
    limitations:
      'Spoofing does not help account-only VAC cases. Never stack two spoof tools. Shared or work PCs may not be suitable. You accept all risk from driver-level changes.',
    systemRequirements: [
      { icon: 'reqWindows', text: 'Windows 10 or 11 64-bit with administrator access.' },
      { icon: 'reqRestorePoint', text: 'Ability to create a system restore point before running.' },
      { icon: 'reqShieldGuide', text: 'Follow the portal setup guide before launching Dota 2 after spoofing.' },
      { icon: 'reqWifi', text: 'Stable connection for portal verification tools.' },
    ],
    fullFeatures: [
      'Disk serial profile tools',
      'MAC address rotation',
      'Restore point checklist',
      'Compatibility scan',
      'Driver conflict detection',
      'Post-spoof verification',
      'Identifier diff report',
      'Cold reboot guide',
      'Portal step-by-step workflow',
      'Discord recovery support',
    ],
    overview: {
      title: 'Built around a clear hardware recovery workflow',
      paragraphs: [
        'The HWID Spoofer helps Dota 2 players recover when VAC flags PC hardware but the Steam account is still clean. Disk and MAC profile tools ship with a restore-point checklist, compatibility scan, and post-spoof verification steps.',
        'Use this path when fresh accounts fail instantly on one machine but work elsewhere—not for account-only VAC cases. After spoof, load a conservative cheat profile from dotacheats.com before queuing ranked.',
      ],
    },
  },
  ugc: {
    images: slide('gpMapHack', 'gpHeroEsp', 'gpZoomHack'),
    goodToKnow:
      'Gather order email, platform account details and restriction screenshots before opening a ticket. UGC structures appeals—it does not bypass platform review.',
    limitations:
      'UGC does not guarantee account restoration. Results vary by case type. Permanent VAC bans may require a new account path instead of appeal.',
    systemRequirements: [
      { icon: 'reqMailOrder', text: 'Order email used at checkout on dotacheats.com or at checkout on dotacheats.com.' },
      { icon: 'reqShieldAccount', text: 'Account details and ban or restriction notification if available.' },
      { icon: 'reqWifiPortal', text: 'Internet access for Discord support and case dashboard.' },
    ],
    fullFeatures: [
      'Custom appeal workflows',
      'Restriction dispute automation',
      'Case documentation templates',
      'Status tracking dashboard',
      'Identity verification guide',
      'Evidence upload structure',
      'Timeline tracker',
      'Follow-up response templates',
      'Multi-platform support',
    ],
    overview: {
      title: 'Built around account recovery and appeal workflows',
      paragraphs: [
        'UGC (Unban & Governance Control) helps you recover restricted gaming, social and marketplace accounts with structured appeal workflows and automation—not instant unban guarantees.',
        'Build custom dispute paths, track case status and rebuild your presence with smart restriction-management tools. Support walks you through each step via Discord when you need hands-on help.',
      ],
    },
  },
  'unlock-all': {
    images: slide('gpSkinChanger', 'gpHeroEsp', 'gpMapHack'),
    goodToKnow:
      'Unlock All previews cosmetics locally on your client. Other players in your lobby see your real inventory—not preview skins. Included with Elite tier.',
    limitations:
      'Local preview only—does not modify Steam inventory or store state. Other players cannot see previewed arcanas or sets.',
    systemRequirements: dotaSystemRequirements,
    fullFeatures: [
      'Hero skin swap',
      'Arcana & immortal preview',
      'Weapon & effect customizer',
      'Loading screen editor',
      'Cursor & HUD theme',
      'Ward & courier replacer',
      'Favorites list',
      'Loadout export',
    ],
    overview: {
      title: 'Built around a local cosmetic preview workflow',
      paragraphs: [
        'Unlock All lets you browse hero arcanas, immortals and exclusive sets locally in Dota 2—searchable catalog, favorites, and loadout export without modifying live Steam purchases.',
        'Cosmetics display on your client for testing and content creation. Other players see your actual inventory, not preview skins. Included free with Elite; available standalone for cosmetic preview without combat modules.',
      ],
    },
  },
};

function buildTierPages(): ProductPage[] {
  return t.cheats.items.map((cheat) => {
    const slug = slugFromHref(cheat.href);
    const content = productContent[slug];
    const displayName = cheat.name === 'Lite' ? 'Dota 2 Lite' : cheat.name === 'Pro' ? 'Dota 2 Pro' : 'Dota 2 Elite';
    return {
      slug,
      kind: 'tier',
      badge: cheat.badge,
      tier: cheat.tier,
      name: cheat.name,
      title: cheat.title,
      subtitle: cheat.desc,
      desc: cheat.desc,
      features: cheat.features,
      more: cheat.more,
      variant: cheat.variant,
      buyUrl: checkoutForSlug(slug),
      images: content.images,
      overview: content.overview,
      acquisition: acquisitionFor(displayName),
      goodToKnow: content.goodToKnow,
      limitations: content.limitations,
      fullFeatures: content.fullFeatures,
      systemRequirements: content.systemRequirements,
      about: tierAbout[slug],
      body: tierBodies[slug] ?? [],
      relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
    };
  });
}

function buildUtilityPages(): ProductPage[] {
  return t.products.items
    .filter((p) => p.href !== productBase)
    .map((product) => {
      const slug = slugFromHref(product.href);
      const content = productContent[slug];
      return {
        slug,
        kind: 'utility',
        badge: product.badge,
        category: product.category,
        name: product.title,
        title: product.title,
        subtitle: product.subtitle,
        desc: product.desc,
        features: product.features,
        more: product.more,
        buyUrl: checkoutForSlug(slug),
        images: content.images,
        overview: content.overview,
        acquisition: acquisitionFor(product.title),
        goodToKnow: content.goodToKnow,
        limitations: content.limitations,
        fullFeatures: content.fullFeatures,
        systemRequirements: content.systemRequirements,
        body: utilityBodies[slug] ?? [],
        relatedBlogSlugs: productRelatedBlogSlugs[slug] ?? [],
      };
    });
}

export const productPages: ProductPage[] = [...buildTierPages(), ...buildUtilityPages()];

export const cheatPages = productPages.filter((p) => p.kind === 'tier');

export function getProductPage(slug: string) {
  return productPages.find((p) => p.slug === slug);
}

export function getCheatPage(slug: string) {
  return cheatPages.find((p) => p.slug === slug);
}

export function getAllProductSlugs() {
  return productPages.map((p) => p.slug);
}

export function getAllCheatSlugs() {
  return cheatPages.map((p) => p.slug);
}

const cheatsHubSlides = slide('gpScripts', 'gpAutoKill', 'gpFarmBot');

export const heroSlides = slide(
  'gpMapHack',
  'gpScripts',
  'gpZoomHack',
  'gpSkinChanger',
  'gpAutoKill',
  'gpFarmBot',
  'gpHeroEsp',
);

export const productHub = {
  path: productBase,
  title: t.products.title,
  subtitle: t.products.subtitle,
  description: 'Example product tiers, HWID spoofer, UGC recovery, and cosmetic utilities for Dota 2 on PC.',
  buyUrl: checkoutPath('dota2'),
};
