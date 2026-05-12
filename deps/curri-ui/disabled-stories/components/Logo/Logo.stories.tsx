import {
  // ArgsTable,
  Primary,
  // PRIMARY_STORY,
} from '@storybook/addon-docs/blocks'
import { Meta } from '@storybook/react'
import React from 'react'

import { Col, Colors, Grid, Heading, Logo, Paragraph, Spacer } from '../../..'
import { CurriStorybookWrapper } from '../../curri-storybook-components'

const Documentation = () => (
  <div>
    <Heading size="h3" as="h2">
      Curri Logo
    </Heading>
    <Spacer value={30} />
    <Paragraph size="medium">
      Our brand identity consists of a simple geometric logotype and is drawn
      with custom letterforms. Our new logotype is meant to evoke the structural
      forms of the construction materials that we deliver for our customers,
      while having a playful bent to them — for instance the 'I' looks like an
      'I-Beam'. The logotype fits perfectly in a rectangle and locks-up nicely
      in almost any brand application because of its 90° forms.
    </Paragraph>
    <Spacer value={30} />
    <Grid gap={0}>
      <Col width={[12, 12, 12, 6]} center middle>
        <div style={{ backgroundColor: Colors.TEAL_500, padding: '100px 0' }}>
          <Logo width={300} color={Colors.BLACK} />
        </div>
      </Col>
      <Col width={[12, 12, 12, 6]} center middle>
        <div style={{ backgroundColor: Colors.BLACK, padding: '100px 0' }}>
          <Logo width={300} color={Colors.TEAL_500} />
        </div>
      </Col>
    </Grid>
    <Spacer value={30} />
    <Heading size="h5" as="h2">
      Why a logotype and not a logomark?
    </Heading>
    <Spacer value={30} />
    <Paragraph size="medium">
      Curri has a unique asset in that our name is nice and short. Think of
      companies like IKEA, Lego, and Google — they all use an immediately
      recognizable and human readable logotype, rather than a logomark.
      Letterforms leave nothing open to interpretation, help to avoid brand
      confusion, and is not abstract like a logomark often is.
    </Paragraph>
    <Spacer value={30} />

    <Paragraph size="medium">
      Our brand should be seen as an evolution of Curri — it references our
      roots while feeling more grown-up. We will still keep the fun visual style
      that Curri was born from, but with a more comprehensive brand system, that
      will take our company to the next level.
    </Paragraph>
  </div>
)
const meta: Meta<typeof Primary> = {
  argTypes: {
    // // color: {
    // //   control: {
    // //     type: 'color',
    // //   },
    // //   defaultValue: '#000',
    // //   description: 'Changes the color of the logo',
    // // },
    // height: {
    //   control: { max: 300, min: 28, step: 1, type: 'range' },
    //   description: 'Height of the SVG component',
    // },
    // width: {
    //   control: { max: 300, min: 149, step: 1, type: 'range' },
    //   defaultValue: 149,
    //   description: 'Width of the SVG component',
    // },
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
        <CurriStorybookWrapper title="Logo">
          <Documentation />
          <Spacer value={30} />
          <Heading size="h5" as="h2">
            Logo Sandbox
          </Heading>
          <Primary />
          <Heading size="h5" as="h2">
            Logo Props
          </Heading>
          <Spacer value={15} />
          <Paragraph size="medium">
            <Paragraph size="medium" fontWeight="semi-bold">
              Note:
            </Paragraph>{' '}
            Logo also takes normal svg prop types (i.e. fill, path, etc.)
          </Paragraph>
          {/* <ArgsTable story={PRIMARY_STORY} /> */}
        </CurriStorybookWrapper>
      ),
    },
  },
  title: 'Components/Logo',
}

export default meta

export const Default = args => <Logo {...args} />
