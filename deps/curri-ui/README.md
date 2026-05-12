# Curri UI

Storybook Page: https://teamcurri.github.io/curri/
## Usage

```tsx
import { Colors } from '@curri/ui'
```

## Features (Roadmap to V1)

- [x] Storybook with solid foundation
- [ ] Parity with Design’s [UI Library Figma](https://www.figma.com/file/bcmucq3rslzDXfTkPIsFqG/%E2%9D%96-Curri-UI-Library-v0.1?node-id=215%3A6839)
- [x] Documentation
- [ ] Ease of use
- [x] Backwards compatible
- [ ] Full adoption by Curri-App
- [ ] No more deprecated legacy styling

## Maintenance

Keep updated with values from the [UI Library Figma](https://www.figma.com/file/bcmucq3rslzDXfTkPIsFqG/%E2%9D%96-Curri-UI-Library-v0.1?node-id=215%3A6839) and [brand.curri.com](https://brand.curri.com/) (more accessible for primitives like logos and colors). For primitives and components, Figma pages should directly correlate with Storybook stories sources.

Remember to remain friends with [A11y](https://reactnative.dev/docs/0.63/accessibility) and follow [best practices](https://www.shopify.com/partners/blog/react-native-accessibility) when building custom controls.

## Storybook

To preview the Curri UI storybook, `pnpm i && npm run dev`. Storybook should boot up with all the UI documentation.
### My SVGs won't scale with CSS? What am I doing wrong?

Read this: https://stackoverflow.com/questions/56723458/svg-path-not-scaling

tl;dr make sure your .svg file has a `viewbox` property set. Figma will give you this out of the box.
