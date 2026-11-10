---
route: /cloud-dma-for-bodycam/
seoTitle: 'Cloud DMA for Bodycam Cheats | Hyper-V One-PC Setup'
metaDescription: 'Cloud DMA for Bodycam explains the required Hyper-V single-PC stack, $50 lifetime license, GREENWARD/AWS add-ons, and Windows prerequisites.'
schemaTypes:
  - WebPage
  - Article
  - BreadcrumbList
layout: article
articlePublished: '2026-03-01'
showAdditionalCostsCallout: true
checkout: cloud-dma
endCtaLabel: Explore Cloud DMA
endCtaHref: /go/cloud-dma/
figures:
  - alt: Bodycam tactical operators with body-worn camera HUD logo and REC indicator
    src: /images/bodycam/bodycam-hero.webp
---

# Cloud DMA for Bodycam

Cloud DMA is an important part of the published Bodycam configuration. It is specified as required for full functionality on supported builds, and its setup is based around a virtualized environment on a single gaming PC.

The underlying architecture is particularly interesting because it uses Hyper-V rather than relying on a second physical computer or an external DMA box. Understanding how this arrangement works and what the system requires is useful when reviewing the overall Bodycam setup.

This guide explains the Cloud DMA concept, its single-PC configuration, the main Windows requirements and the additional components listed for the setup.

## Hyper-V on one PC and why it is required

Cloud DMA is the virtualized infrastructure layer Bodycam lists for supported builds—not an unrelated upsell. The published design provisions a Hyper-V guest on the same Windows machine you game on, then completes activation through an encrypted service connection. That differs from a second tower, a PCIe DMA card, or a USB bridge, and it is why virtualization must be available before the cheat client pairs.

Because the stack shares the host, edition and firmware checks matter as much as the $50 lifetime license line item.

## Requirements, add-ons, and how it fits the Bodycam package

Windows 10 or 11 (64-bit) with Intel VT-x or AMD-V enabled in firmware is mandatory. Windows Pro, Enterprise, or Education is recommended so Hyper-V can install. Budget 8 GB RAM minimum (16 GB recommended), reliable broadband for activation, and the same HVCI, Core Isolation, TPM, and Secure Boot posture required for the base cheat package.

GREENWARD, a static server subscription, and AWS usage are separate purchases called out in vendor documentation—none of them are bundled into the Cloud DMA checkout. Once the guest is healthy, the main Bodycam client consumes the same ESP, aimbot, and weapon categories documented on the [Bodycam cheats homepage](/), with day-to-day hardware checks summarized on the [Bodycam Windows hardware checklist](/bodycam-requirements/).
