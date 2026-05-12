import {
  // ArgsTable,
  Primary,
  // PRIMARY_STORY,
  Stories,
} from '@storybook/addon-docs/blocks'
import { Meta } from '@storybook/react'
import React from 'react'

import { Heading, Icons, Paragraph, Spacer } from '../../..'
import { CurriStorybookWrapper } from '../../curri-storybook-components'

const Documentation = () => (
  <div>
    <Paragraph size="medium">
      Here displays all our icons used by our Curri Apps. SVGs are automatically
      converted to React components utilizing{' '}
      <a href="https://react-svgr.com/">SVGR</a>. SVGs are located in{' '}
      <a href="https://www.figma.com/file/d6xgd5aOWFgWEP06mZxi9p?node-id=69:0">
        FIGMA
      </a>{' '}
      and added to our UI Library.
    </Paragraph>
    <Spacer value={30} />

    <Heading size="h5" as="h2">
      Adding an SVG to Curri/UI
    </Heading>
    <Spacer value={30} />
    <Paragraph size="medium">
      All SVGs of file type{' '}
      <Paragraph size="medium" fontWeight="semi-bold">
        *.svg
      </Paragraph>{' '}
      should be added to{' '}
      <Paragraph size="medium" fontWeight="semi-bold">
        /src/assets/icons-raw
      </Paragraph>
      . Adding so will automatically create a React Component into the
      <Paragraph size="medium" fontWeight="semi-bold">
        components/Icons/components
      </Paragraph>{' '}
      folder. If it does not automatically create a React component, run{' '}
      <Paragraph size="medium" fontWeight="semi-bold">
        npm run build
      </Paragraph>{' '}
      to generate the Icon react component. After the Icon is created, ensure
      you add the reference of the Icon to{' '}
      <Paragraph size="medium" fontWeight="semi-bold">
        src/components/Icons/Icons.tsx
      </Paragraph>
    </Paragraph>
  </div>
)

const meta: Meta<typeof Default> = {
  argTypes: {
    size: {
      control: { max: 40, min: 20, step: 1, type: 'range' },
      defaultValue: 30,
      description:
        'SVG Icons that takes in SVG Props. (i.e. width, height, fill, path, etc)',
    },
  },
  // controls: { hideNoControlsWarning: true },

  parameters: {
    actions: { disable: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/d6xgd5aOWFgWEP06mZxi9p/Curri-UI-Guide?node-id=69%3A0',
    },
    docs: {
      // eslint-disable-next-line react/display-name
      page: () => (
        <CurriStorybookWrapper title="Icons">
          <Documentation />
          <Spacer value={30} />
          <Heading size="h5" as="h2">
            Icons Sandbox
          </Heading>
          <Primary />
          <Heading size="h5" as="h2">
            Icons Props
          </Heading>
          {/* <ArgsTable story={PRIMARY_STORY} /> */}
          <Stories />
        </CurriStorybookWrapper>
      ),
    },
  },
  title: 'Components/Icons',
}

export default meta

const IconList = Object.keys(Icons)
export const Default = args => {
  const defaultSize = args.size ?? 30
  return IconList.map(icon =>
    React.createElement(Icons[icon], {
      height: defaultSize,
      width: defaultSize,
    })
  )
}
