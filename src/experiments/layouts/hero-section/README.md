# Hero section

**Intent:** A page-hero pattern to evaluate: a mocked top nav (text logo + links) above a
full-bleed hero image, with hero text placed below the image for now — final placement is
still open, so it's kept simple until a design direction is picked.

The hero image is a swappable placeholder (three gradient swatches) since the real
photography hasn't been uploaded yet — `HeroImage.tsx` is where a real `<img>` would replace
the swatch once an asset exists. Nav link text and order, and the headline / subheading, are
all live controls (`controls/HeroControls.tsx`).

**Browser note:** no risky CSS here (flex layout, gradients, standard focus-visible outlines)
— expect this to render identically in current Chrome, Firefox, and Safari.

When promoting: decide where the final hero text should live (overlaid on the image is the
more common pattern) before baking in a layout. Move `HeroSection.tsx`, `NavBar.tsx`,
`NavLink.tsx`, `HeroImage.tsx`, `HeroText.tsx`, and `hero-data.ts` (minus the placeholder
swatches) into `src/dev-ready/layouts/`, and turn the nav links, image, and text into props.
