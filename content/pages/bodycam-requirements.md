---
route: /bodycam-requirements/
seoTitle: 'Bodycam Cheat Requirements | Windows 10 & 11 PC Guide'
metaDescription: 'Bodycam cheat requirements for Windows 10/11: RAM, GPU, HVCI, virtualization for Cloud DMA, and security settings to verify before install.'
schemaTypes:
  - WebPage
  - Article
  - BreadcrumbList
layout: article
articlePublished: '2026-03-01'
checkout: main-product
endCtaLabel: Explore Bodycam Features
endCtaHref: /go/bodycam/
figures:
  - alt: Bodycam first-person hallway view with tactical flashlight and weapon silhouette
    src: /images/bodycam/bodycam-pov-hallway.webp
  - alt: Bodycam scoped view with red ESP boxes, snaplines and radar minimap
    src: /images/bodycam/bodycam-esp-scope.webp
---

# Bodycam Cheat Requirements for Windows 10 and 11

Before exploring the full Bodycam feature collection, it is worth checking that your PC matches the listed system requirements. The intended configuration includes Windows compatibility, a dedicated graphics card, minimum memory and several Windows security settings.

The good news is that the published specifications are laid out clearly. This guide brings them together in one place, explains the important Windows settings and covers the additional Cloud DMA requirements associated with supported builds.

## Windows, hardware, and security settings

The supported operating systems are Windows 10 and Windows 11 (64-bit). Hardware minimums are 8 GB RAM and a dedicated GPU. HVCI (Hypervisor-Protected Code Integrity), Core Isolation, TPM, and Secure Boot must be enabled in Windows and firmware where applicable—these are named explicitly in the vendor checklist rather than optional tuning.

- Windows 10 or Windows 11
- Minimum 8 GB RAM
- Dedicated GPU
- HVCI enabled
- Core Isolation enabled
- TPM enabled
- Secure Boot enabled
- Cloud DMA required for full functionality on supported builds

## Cloud DMA, virtualization, and pre-install checks

Cloud DMA is mandatory on supported Bodycam builds and runs as a single-PC Hyper-V stack. CPU virtualization (Intel VT-x or AMD-V) must be on in BIOS, and Windows Pro, Enterprise, or Education is recommended so the Hyper-V role can install. Plan for 8 GB RAM minimum with 16 GB recommended, stable broadband for activation, plus the same HVCI/Core Isolation/TPM/Secure Boot posture listed above. GREENWARD, a static server tier, and AWS resources are billed separately from the cheat license—the [Cloud DMA license and add-ons guide](/cloud-dma-for-bodycam/) covers those costs.

Before you load the client, confirm OS edition, RAM, GPU, the four security toggles, firmware virtualization, and Hyper-V readiness in one pass. If anything fails, fix it before purchase rather than treating hardware, Windows, and Cloud DMA as unrelated checklists.
