---
route: /guides/cloud-dma-setup/
seoTitle: 'Cloud DMA Setup for Bodycam | Hyper-V Guide Steps'
metaDescription: 'Hyper-V setup for Bodycam Cloud DMA on one PC: enable virtualization, allocate RAM, finish activation, and verify before loading the client.'
schemaTypes:
  - Article
  - WebPage
  - BreadcrumbList
layout: article
articlePublished: '2026-01-01'
checkout: cloud-dma
showAdditionalCostsCallout: true
endCtaHref: /go/cloud-dma/
figures:
  - alt: Bodycam first-person hallway view with tactical flashlight and weapon silhouette
    src: /images/bodycam/bodycam-pov-hallway.webp
---

# Cloud DMA setup for Bodycam

Cloud DMA is required on supported Bodycam builds. This walkthrough covers the single-PC Hyper-V path advertised in the product docs: one Windows gaming machine hosts the virtualized service instead of a second physical rig.

## Before you start

Confirm Windows 10 or 11 Pro/Enterprise with virtualization enabled in BIOS (Intel VT-x / AMD-V), read the [Bodycam RAM, GPU, and HVCI checklist](/bodycam-requirements/) before enabling Hyper-V, and purchase the Cloud DMA lifetime license on the [$50 Cloud DMA license page](/cloud-dma-for-bodycam/) if you have not already.

## Hyper-V setup and activation

### Step 1 — Enable Hyper-V

1. Open **Turn Windows features on or off**.
2. Check **Hyper-V** and **Windows Hypervisor Platform**; reboot when prompted.
3. Confirm **Hyper-V Manager** launches without errors.

### Step 2 — Reserve RAM for the guest

Allocate enough memory for both Windows and the Cloud DMA guest. Published Bodycam material references **at least 32 GB system RAM** with a dedicated partition for the virtual environment. Leave headroom for the game client on the host.

### Step 3 — Activate the Cloud DMA service

Follow the encrypted activation flow from your order email or portal login. Finish pairing before installing the Bodycam loader so the virtual NIC and certificates are online.

### Step 4 — Verify security settings

Disable or tune **Hypervisor-protected Code Integrity (HVCI)** only if the published guide requires it for your build. Keep **Secure Boot** enabled unless support instructs otherwise, and note any BIOS virtualization changes for future troubleshooting.

### Step 5 — Install Bodycam on the host

After Cloud DMA reports healthy, install the Bodycam client on the host OS using the delivery steps from checkout. Run an offline test launch before joining multiplayer.

When the stack is stable, compare monthly vs lifetime cheat access on the [$35 vs $150 plan breakdown](/bodycam-cheats-price/) or browse [pre-purchase FAQ on plans and delivery](/faq/) before checkout.
