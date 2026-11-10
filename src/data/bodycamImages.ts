/** Bodycam product screenshots and menu captures — single source for paths and alt text. */

export const BODYCAM_IMAGES = {
  hero: {
    src: '/images/bodycam/bodycam-hero.webp',
    alt: 'Bodycam tactical operators with body-worn camera HUD logo and REC indicator',
  },
  menuVisuals: {
    src: '/images/bodycam/bodycam-menu-visuals.webp',
    alt: 'Bodycam cheat menu Visuals tab showing Player ESP, skeleton, radar and distance toggles',
  },
  menuAimbot: {
    src: '/images/bodycam/bodycam-menu-aimbot.webp',
    alt: 'Bodycam aimbot menu showing FOV, smoothness, bone selection and recoil control sliders',
  },
  espWarehouse: {
    src: '/images/bodycam/bodycam-esp-warehouse.webp',
    alt: 'Bodycam gameplay screenshot showing green ESP box and distance readout in a warehouse',
  },
  espWallhackIcons: {
    src: '/images/bodycam/bodycam-esp-wallhack-icons.webp',
    alt: 'Bodycam ESP wallhack-style enemy markers visible through wooden walls',
  },
  aimbotFovSnapline: {
    src: '/images/bodycam/bodycam-aimbot-fov-snapline.webp',
    alt: 'Bodycam aimbot FOV circle with snapline and red target box in outdoor combat',
  },
  povHallway: {
    src: '/images/bodycam/bodycam-pov-hallway.webp',
    alt: 'Bodycam first-person hallway view with tactical flashlight and weapon silhouette',
  },
  espScope: {
    src: '/images/bodycam/bodycam-esp-scope.webp',
    alt: 'Bodycam scoped view with red ESP boxes, snaplines and radar minimap',
  },
  espIndoorCyan: {
    src: '/images/bodycam/bodycam-esp-indoor-cyan.webp',
    alt: 'Bodycam ESP with cyan player boxes, skeletons and FOV circle in indoor map',
  },
  espForestCyan: {
    src: '/images/bodycam/bodycam-esp-forest-cyan.webp',
    alt: 'Bodycam player ESP cyan skeletons and snaplines in charred forest map',
  },
  espForestBoxes: {
    src: '/images/bodycam/bodycam-esp-forest-boxes.webp',
    alt: 'Bodycam ESP red bounding boxes and teal skeletons through trees',
  },
} as const;

export type BodycamImageKey = keyof typeof BODYCAM_IMAGES;
