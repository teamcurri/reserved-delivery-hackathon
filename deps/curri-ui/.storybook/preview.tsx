// import React from 'react'
// import { GlobalStyles } from './util'
import { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    options: {
      storySort: {
        order: [
          'About',
          ['Introduction', 'Creating UI Elements', 'Creating Stories'],
          'Foundations',
          'Layouts',
          'Components',
        ],
      },
    },
  },
  tags: ['autodocs'],
}

// export const decorators = [
//   Story => (
//     <>
//       <GlobalStyles />
//       <Story />
//     </>
//   ),
// ]

// export const parameters = {
//   actions: { argTypesRegex: '^on[A-Z].*' },
//   previewTabs: {
//     'storybook/docs/panel': { index: -1 },
//     canvas: {
//       title: 'Sandbox',
//       hidden: false,
//     },
//   },
// }

export default preview
