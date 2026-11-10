import type { IconName } from '../components/icons/types';
import { bodycamPageFaqsByRoute } from './bodycamPageFaqs';
import { checkoutPath, PRIMARY_CHECKOUT_PATH } from '../config/checkout';
import { SITE_DOMAIN } from '../config/site';
import { normalizeInternalPath, productPath, ROUTES } from '../utils/path';

export type FaqTopic =
  | 'all'
  | 'plans'
  | 'esp'
  | 'scripts'
  | 'safety'
  | 'products'
  | 'blog'
  | 'setup';

export interface SiteFaqItem {
  id: string;
  topic: FaqTopic;
  icon: IconName;
  q: string;
  a: string;
  aHtml?: string;
  scopes?: string[];
}

function a(text: string): string {
  return text;
}

function link(text: string, href: string): string {
  return `<a href="${normalizeInternalPath(href)}">${text}</a>`;
}

const cloudDmaPage = link('Cloud DMA for Bodycam', '/cloud-dma-for-bodycam/');
const requirementsGuide = link('Bodycam system requirements guide', '/bodycam-requirements/');
const pricingPage = link('Bodycam cheats price page', '/bodycam-cheats-price/');
const setupGuide = link('Hyper-V Cloud DMA setup walkthrough', '/guides/cloud-dma-setup/');
const checkout = link('secure checkout', PRIMARY_CHECKOUT_PATH);
const faqPage = link('full FAQ topic list', ROUTES.faq);

const elite = link('Dota 2 Elite', productPath('elite'));
const lite = link('Lite tier (map hack & ESP)', ROUTES.products);
const pro = link('Pro tier (scripts included)', ROUTES.products);
const productsHub = link('Dota 2 products', ROUTES.products);
const hwid = link('HWID Spoofer', productPath('hwid-spoofer'));
const ugc = link('UGC', productPath('ugc'));
const skin = link('Skin Changer', productPath('unlock-all'));
const blog = link('blog guides', ROUTES.blog);

export const siteFaqs: SiteFaqItem[] = [
  {
    id: 'features',
    topic: 'esp',
    icon: 'faqWhatIsEsp',
    q: 'What features are included with Bodycam cheats?',
    a: `Aimbot, ESP, chams, movement, and weapon modules are broken down on the homepage and on the dedicated ${link('Bodycam aimbot guide', '/bodycam-aimbot/')} and ${link('Bodycam ESP guide', '/bodycam-esp/')}—this FAQ stays high level so we do not repeat the full feature matrix here.`,
  },
  {
    id: 'after-buy',
    topic: 'setup',
    icon: 'faqAfterBuy',
    q: 'What happens after I buy?',
    a: `Checkout runs through our secure partner. After purchase, follow delivery instructions from your order email and review the ${link('Bodycam post-purchase Cloud DMA steps', '/guides/cloud-dma-setup/')} before launching the game.`,
  },
  {
    id: 'ban-risk',
    topic: 'safety',
    icon: 'faqBanRisk',
    q: 'Can I get banned using third-party cheat software?',
    a: a(
      'Yes—any modification carries risk. Anti-cheat and publisher enforcement evolve. Read setup guides, accept the risk, and use conservative settings.',
    ),
  },
  {
    id: 'platforms',
    topic: 'setup',
    icon: 'faqPlatforms',
    q: 'Which platforms are supported?',
    a: a(
      'Bodycam cheats list Windows 10 and Windows 11 with a dedicated GPU. macOS and Linux are not supported.',
    ),
  },
  {
    id: 'license-move',
    topic: 'setup',
    icon: 'faqLicenseMove',
    q: 'Can I move my license to a new PC?',
    a: a(
      'Contact support with your order email and new hardware details. Device or HWID limits depend on your plan and checkout provider.',
    ),
  },
  {
    id: 'pricing-plans',
    topic: 'plans',
    icon: 'faqComparePlans',
    q: 'Can I choose between monthly and lifetime access?',
    a: `Yes. Compare monthly and lifetime Bodycam plans on the ${pricingPage}.`,
  },
  {
    id: 'plan-prices',
    topic: 'plans',
    icon: 'faqRankTiers',
    q: 'How much do Bodycam cheat plans cost?',
    a: `Monthly and lifetime prices are listed on the ${link('cheat plan pricing table', '/bodycam-cheats-price/')}. Cloud DMA is a separate lifetime license on the ${link('$50 Cloud DMA license page', '/cloud-dma-for-bodycam/')}.`,
  },
  {
    id: 'cloud-dma',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'Is Cloud DMA included in the setup?',
    a: `Cloud DMA is required on supported builds. Review the ${cloudDmaPage} and the ${setupGuide} for Hyper-V, RAM, and add-on services such as GREENWARD or AWS.`,
  },
  {
    id: 'cloud-dma-cost',
    topic: 'products',
    icon: 'faqUgcWhat',
    q: 'What does Cloud DMA cost beyond the cheat license?',
    a: `The Cloud DMA lifetime license is listed on the ${link('Cloud DMA pricing overview', '/cloud-dma-for-bodycam/')}. GREENWARD, static server hosting, and AWS resources are purchased separately.`,
  },
  {
    id: 'hwid-spoofer',
    topic: 'products',
    icon: 'faqProductsPage',
    q: 'What does the HWID Spoofer change?',
    a: `It targets common hardware identifiers used in ban workflows. Read the ${link('HWID Spoofer product page', '/hwid-spoofer/')} for scope, limits, and setup before checkout.`,
  },
  {
    id: 'windows-req',
    topic: 'setup',
    icon: 'faqDiscordHelp',
    q: 'What Windows version do I need?',
    a: `Windows 10 or 11 with virtualization enabled for Cloud DMA. See the ${requirementsGuide} for RAM, CPU, and client compatibility.`,
  },
  {
    id: 'soft-aim',
    topic: 'scripts',
    icon: 'faqWhichTierScripts',
    q: 'What is soft aim?',
    a: a(
      'Soft aim provides configurable aiming assistance. Tune FOV and strength in the product configuration to match your combat style.',
    ),
  },
  {
    id: 'esp-loot',
    topic: 'esp',
    icon: 'faqEspVsScripts',
    q: 'What is the difference between enemy ESP and loot ESP?',
    a: a(
      'Enemy ESP highlights hostile positions and awareness cues. Loot ESP draws attention to valuable drops so you spend less time searching the environment.',
    ),
  },
  {
    id: 'stream-proof',
    topic: 'esp',
    icon: 'faqStreamProof',
    q: 'Is the overlay stream-proof?',
    a: a(
      'A stream-proof overlay mode is included. Test your capture setup locally before broadcasting.',
    ),
  },
  {
    id: 'undetected',
    topic: 'safety',
    icon: 'faqUndetected',
    q: 'Are undetected cheats guaranteed?',
    a: a(
      'No. Status can change with game or anti-cheat updates. Stop using the software if delivery or support indicates an outage or mismatch after a patch.',
    ),
  },
  {
    id: 'checkout-help',
    topic: 'setup',
    icon: 'faqExternalLoader',
    q: 'How do I get install help?',
    a: `Use the ${checkout} flow for purchase questions, then contact support@${SITE_DOMAIN} with your order email, Windows version, and any loader error text.`,
  },
  {
    id: 'publisher',
    topic: 'safety',
    icon: 'faqPrivateCheats',
    q: 'Are you affiliated with Reissad Studio or Bodycam publishers?',
    a: a(
      'No. Bodycam Cheats is independent and uses the game name only to describe supported software.',
    ),
  },
  {
    id: 'faq-more',
    topic: 'all',
    icon: 'faqMore',
    q: 'Where is the full FAQ?',
    a: `This page collects plan, feature, Cloud DMA, and setup answers. Start on the ${link('main product homepage', '/')}, then read the ${faqPage} filters for every topic.`,
  },
];

export function getLandingFaqs(): SiteFaqItem[] {
  return bodycamPageFaqsByRoute['/'] ?? [];
}

export function getContentPageFaqs(route: string): SiteFaqItem[] | null {
  const bodycam = bodycamPageFaqsByRoute[route];
  if (bodycam?.length) return bodycam;
  return null;
}

export function getAllFaqs(): SiteFaqItem[] {
  return siteFaqs.filter((f) => f.topic !== 'all');
}

/** Shared FAQ block copy + filters (home, /faq/, products, blog). */
export const SITE_FAQ_SECTION_COPY = {
  eyebrow: 'All topics',
  title: 'Browse FAQ by category',
  subtitle: 'Filter FAQ entries on plans, features, Cloud DMA, setup, and safety.',
} as const;

export const SITE_FAQ_FILTER_TOPICS: FaqTopic[] = [
  'all',
  'plans',
  'esp',
  'scripts',
  'safety',
  'products',
  'setup',
];

export const HOME_LANDING_FAQ_SECTION_COPY = {
  eyebrow: 'Bodycam FAQ',
  title: 'Frequently asked questions',
  subtitle:
    'Pricing, Windows requirements, Cloud DMA and checkout—open the full FAQ for every topic.',
} as const;

/** Section copy when FAQ list is scoped to the current page (not /faq/). */
export const CONTEXTUAL_FAQ_SECTION_COPY = {
  eyebrow: 'FAQ',
  title: 'Questions about this page',
  subtitle: 'Answers tied to what you are reading—visit the FAQ page for every topic.',
} as const;

export function faqFilterTopicsForItems(items: SiteFaqItem[]): FaqTopic[] {
  const present = new Set(items.map((item) => item.topic));
  const topics: FaqTopic[] = ['all'];
  for (const topic of SITE_FAQ_FILTER_TOPICS) {
    if (topic !== 'all' && present.has(topic)) topics.push(topic);
  }
  return topics;
}

export function getProductFaqs(slug: string, kind: 'tier' | 'utility'): SiteFaqItem[] {
  const general = siteFaqs.filter(
    (f) =>
      !f.scopes &&
      ['setup', 'safety', 'plans', 'esp', 'scripts'].includes(f.topic),
  );
  const scoped = siteFaqs.filter((f) => f.scopes?.includes(slug));
  const tierCompare = siteFaqs.filter((f) =>
    ['rank-lite-vs-pro', 'compare-plans', 'undetected', 'vac-update'].includes(f.id),
  );

  const combined =
    kind === 'tier'
      ? [...scoped, ...tierCompare, ...general.slice(0, 8)]
      : [...scoped, ...general.slice(0, 6)];

  const seen = new Set<string>();
  return combined.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });
}

const blogTopicFaqs: Record<string, SiteFaqItem[]> = {
  Guides: [
    {
      id: 'blog-guide-start',
      topic: 'blog',
      icon: 'faqBlogGuideStart',
      q: 'Should I use console cheat codes in ranked?',
      a: a('No. Valve lobby cheat codes only work in custom games with cheats enabled. Ranked requires separate dota cheats from dotacheats.com tiers.'),
    },
    {
      id: 'blog-guide-tier',
      topic: 'blog',
      icon: 'faqBlogGuideTier',
      q: 'Which tier matches this guide?',
      a: `Awareness guides → ${lite}. Script and combo guides → ${pro}. Bot and kill-steal topics → ${elite}.`,
    },
    {
      id: 'blog-guide-status',
      topic: 'blog',
      icon: 'faqBlogGuideStatus',
      q: 'Is this guide still valid after a patch?',
      a: a('Check the article date and the live status banner. Patch-day articles note when modules change—Discord #status has the latest build notes.'),
    },
  ],
  Setup: [
    {
      id: 'blog-setup-loader',
      topic: 'blog',
      icon: 'faqBlogSetupLoader',
      q: 'Where do I download the loader?',
      a: a('Only from your operator portal after checkout—not from third-party links in comments or DMs.'),
    },
    {
      id: 'blog-setup-lobby',
      topic: 'blog',
      icon: 'faqBlogSetupLobby',
      q: 'Should I test in a lobby first?',
      a: a('Yes. Load conservative presets in a lobby or Turbo before ranked. Tune script delay and ESP distance caps over several sessions.'),
    },
  ],
  Security: [
    {
      id: 'blog-sec-vac',
      topic: 'blog',
      icon: 'faqBlogSecVac',
      q: 'Does this article guarantee undetected status?',
      a: a('No article replaces the live status banner. Undetected is a point-in-time label—stop if status shows updating or detected.'),
    },
  ],
};

const defaultBlogFaqs: SiteFaqItem[] = [
  {
    id: 'blog-default-1',
    topic: 'blog',
    icon: 'faqBlogDefault1',
    q: 'Are blog guides official product documentation?',
    a: `Articles explain workflows and link to ${lite}, ${pro}, ${elite} and ${productsHub}. Feature lists on product pages are authoritative for checkout.`,
  },
  {
    id: 'blog-default-2',
    topic: 'blog',
    icon: 'faqBlogDefault2',
    q: 'Need help applying this guide?',
    a: a('Open Discord with your order email and the article slug. Staff reference the same portal presets mentioned in guides.'),
  },
  {
    id: 'blog-default-3',
    topic: 'blog',
    icon: 'faqBlogDefault3',
    q: 'Will settings in this article work next patch?',
    a: a('Re-check status after every Dota 2 update. Portal presets update with patch notes—reload configs instead of copying old sliders.'),
  },
];

export function getBlogFaqs(tag: string, slug: string): SiteFaqItem[] {
  const topicFaqs = blogTopicFaqs[tag] ?? [];
  const slugHints: SiteFaqItem[] = [];

  if (slug.includes('map-hack') || slug.includes('esp') || slug.includes('ward')) {
    slugHints.push({
      id: 'blog-slug-esp',
      topic: 'esp',
      icon: 'faqBlogSlugEsp',
      q: 'Which tier covers map hack from this article?',
      a: `${lite} includes hero ESP, ward locator and rune timers. ${pro} adds combat scripts on the same overlay stack.`,
    });
  }
  if (slug.includes('script') || slug.includes('combo') || slug.includes('auto-combo')) {
    slugHints.push({
      id: 'blog-slug-scripts',
      topic: 'scripts',
      icon: 'faqBlogSlugScripts',
      q: 'Which tier includes the scripts in this article?',
      a: `${pro} and ${elite} ship Auto Combo and related modules. ${lite} is map hack only.`,
    });
  }
  if (slug.includes('hwid') || slug.includes('ban') || slug.includes('vac')) {
    slugHints.push({
      id: 'blog-slug-hwid',
      topic: 'products',
      icon: 'faqBlogSlugHwid',
      q: 'Does this article replace HWID or UGC products?',
      a: `Recovery guides complement ${hwid} and ${ugc}—read product pages for workflow scope and realistic outcomes.`,
    });
  }

  return [...slugHints, ...topicFaqs, ...defaultBlogFaqs].slice(0, 8);
}

export const compareRows = [
  { feature: 'Player ESP & hero boxes', icon: 'comparePlayerEsp' as const, lite: true, pro: true, elite: true },
  { feature: 'Ward & sentry locator', icon: 'compareWardLocator' as const, lite: true, pro: true, elite: true },
  { feature: 'Rune spawn timers', icon: 'compareRuneTimer' as const, lite: true, pro: true, elite: true },
  { feature: 'Zoom hack', icon: 'compareZoomHack' as const, lite: true, pro: true, elite: true },
  { feature: 'Streamproof overlay', icon: 'compareStreamproof' as const, lite: true, pro: true, elite: true },
  { feature: 'Minimap hack overlay', icon: 'compareMinimapHack' as const, lite: true, pro: true, elite: true },
  { feature: 'Auto Combo scripts', icon: 'compareAutoCombo' as const, lite: false, pro: true, elite: true },
  { feature: 'Orbwalker & Smart Cast', icon: 'compareOrbwalker' as const, lite: false, pro: true, elite: true },
  { feature: 'Target Selector', icon: 'compareTargetSelector' as const, lite: false, pro: true, elite: true },
  { feature: 'Activator (BKB/Hex/Orchid)', icon: 'compareActivator' as const, lite: false, pro: true, elite: true },
  { feature: 'Ability radius drawing', icon: 'compareAbilityRadius' as const, lite: false, pro: true, elite: true },
  { feature: 'Smoke alert integration', icon: 'compareSmokeAlert' as const, lite: false, pro: true, elite: true },
  { feature: 'Auto Farm Bot', icon: 'compareAutoFarm' as const, lite: false, pro: false, elite: true },
  { feature: 'Auto Kill Steal', icon: 'compareAutoKillSteal' as const, lite: false, pro: false, elite: true },
  { feature: 'Auto Dagon', icon: 'compareAutoDagon' as const, lite: false, pro: false, elite: true },
  { feature: 'Full map hack suite', icon: 'compareFullMapHack' as const, lite: false, pro: false, elite: true },
  { feature: 'Skin Changer (Unlock All)', icon: 'compareSkinChanger' as const, lite: false, pro: false, elite: true },
  { feature: 'Priority patch queue', icon: 'comparePriorityPatch' as const, lite: false, pro: false, elite: true },
  { feature: 'Direct dev Discord support', icon: 'compareDevSupport' as const, lite: false, pro: false, elite: true },
  { feature: 'Cloud config backup', icon: 'compareCloudBackup' as const, lite: true, pro: true, elite: true },
];
