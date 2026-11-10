---
route: /cloud-dma-for-bodycam/
seoTitle: Cloud DMA for Bodycam | Setup & Requirements
metaDescription: Learn how Cloud DMA for Bodycam works, what a single-PC Hyper-V setup needs, and which additional components are required.
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
  - alt: Bodycam tactical hero — infrastructure pairs with Windows Hyper-V setup
    src: /images/bodycam/bodycam-hero.webp
---

# Cloud DMA for Bodycam

Cloud DMA is an important part of the published Bodycam configuration. It is specified as required for full functionality on supported builds, and its setup is based around a virtualized environment on a single gaming PC.

The underlying architecture is particularly interesting because it uses Hyper-V rather than relying on a second physical computer or an external DMA box. Understanding how this arrangement works and what the system requires is useful when reviewing the overall Bodycam setup.

This guide explains the Cloud DMA concept, its single-PC configuration, the main Windows requirements and the additional components listed for the setup.

## What Is Cloud DMA for Bodycam?

Cloud DMA is the infrastructure layer described for the supported Bodycam feature environment. Its purpose is to provide the underlying virtualized setup used by the wider software configuration.

The published architecture uses a Hyper-V-based virtual environment provisioned on the same Windows PC used for gaming. Activation is completed through an encrypted service connection.

This is different from a conventional arrangement that relies on an additional physical computer, a PCIe DMA card or an external USB DMA bridge. The described approach is built around one PC and its virtualized environment.

For Bodycam users, the important detail is that Cloud DMA is listed as required for full functionality on supported builds.

## Why Cloud DMA Is Listed as a Requirement

The Bodycam feature information specifies Cloud DMA as part of the supported configuration. It is not simply an unrelated optional accessory mentioned alongside the main feature list.

The Cloud DMA infrastructure provides the virtualized environment used by the supported delivery setup. Its Hyper-V-based architecture is designed to run on the same machine, with activation and service connectivity handled through its associated connection.

Understanding this requirement is useful when comparing the Bodycam feature collection with the technical specifications of your PC. It also makes the Windows edition and virtualization requirements especially important to check before getting started.

## Understanding the Single-PC Hyper-V Setup

One of the most distinctive aspects of the Cloud DMA configuration is its single-PC design. The described installation provisions a Hyper-V-based virtual environment directly on the gaming computer.

Hyper-V is Microsoft's virtualization technology. It allows supported Windows systems to create and operate virtual environments using the computer's hardware resources.

The Cloud DMA requirements therefore include CPU virtualization support in the system firmware. Intel VT-x and AMD-V are the two virtualization technologies identified in the setup information.

The described configuration does not use a separate physical tower or an external DMA box. Instead, the arrangement is built around the main PC, its Windows environment and the Hyper-V virtualization layer.

## Cloud DMA Compatibility and System Requirements

The Cloud DMA configuration has several requirements that should be reviewed before setup.

The specified operating systems are Windows 10 and Windows 11 in 64-bit versions. CPU virtualization must be available and enabled in firmware, and the Windows installation must be able to enable the Hyper-V role during the guided setup.

Windows Pro, Enterprise and Education editions are recommended in the published requirements. Individual edition compatibility should be checked against the accompanying installer notes.

Memory requirements are 8 GB minimum, with 16 GB recommended. Stable broadband internet is also required for activation and ongoing service connectivity.

The configuration additionally lists HVCI, Core Isolation, TPM and Secure Boot as enabled requirements.

- Windows 10 / 11 (64-bit)
- Intel VT-x or AMD-V enabled
- Hyper-V role available
- Windows Pro, Enterprise or Education recommended
- 8 GB RAM minimum
- 16 GB RAM recommended
- Stable broadband internet
- HVCI enabled
- Core Isolation enabled
- TPM enabled
- Secure Boot enabled

## Additional Components Required for the Cloud DMA Setup

The Cloud DMA configuration also has associated components that should be understood when reviewing the complete setup.

The published requirements list GREENWARD, Static Server and AWS as separate purchases. Static Server and AWS are distinct components, and both are listed as required.

These components are not included in the Cloud DMA checkout itself, so it is important to account for them when reviewing the complete configuration and its associated costs.

Looking at the full requirements together provides a more complete picture of the intended setup than considering the Cloud DMA component on its own.

## Cloud DMA and the Complete Bodycam Feature Collection

Cloud DMA is connected to the wider Bodycam feature environment. The main package includes separate categories for aiming, ESP, visual indicators, weapon settings, movement and miscellaneous options.

The aimbot category includes head and chest targeting, FOV Circle, Aim Line, Silent Aim and other listed functions. The ESP category includes player indicators, Box ESP, skeletons, snaplines, chams, health bars and distance displays.

Reviewing these feature groups alongside the Cloud DMA requirements helps connect the technical setup with the wider collection of available Bodycam options.

The [main Bodycam page](/) provides an overview of the full feature list, while the [system requirements page](/bodycam-requirements/) brings together the Windows and hardware specifications.
