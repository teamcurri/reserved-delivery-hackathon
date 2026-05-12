import { Primary, Source } from '@storybook/addon-docs/blocks'
import { Meta } from '@storybook/react'
import hexRgb from 'hex-rgb'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styled, { css } from 'styled-components'

import {
  CurriStorybookWrapper,
  HR,
} from '../../../../disabled-stories/curri-storybook-components'
import {
  Col,
  Colors,
  Grid,
  Heading,
  Paragraph,
  Shadows,
  Spacer,
} from '../../..'

const colorUsage = `
import { Colors } from '@curri/ui'

//...
<p style={{ color: Colors.BLACK }}>Text</p>
`

const primary = [
  {
    color: Colors.BLACK,
    id: 'BLACK',
    rgb: hexRgb(Colors.BLACK, { format: 'array' }),
  },
  {
    color: Colors.WHITE,
    id: 'WHITE',
    rgb: hexRgb(Colors.WHITE, { format: 'array' }),
  },
  {
    color: Colors.TEAL_500,
    id: 'TEAL_500',
    rgb: hexRgb(Colors.TEAL_500, { format: 'array' }),
  },
]
const teal = ['050', '100', '200', '300', '400', '500', '600']
  .reverse()
  .map(n => ({
    color: `${Colors[`TEAL_${n}`]}`,
    id: `TEAL_${n}`,
    rgb: hexRgb(`${Colors[`TEAL_${n}`]}`, { format: 'array' }),
  }))

const blue = ['050', '100', '200', '300', '400', '500', '600']
  .reverse()
  .map(n => ({
    color: `${Colors[`BLUE_${n}`]}`,
    id: `BLUE_${n}`,
    rgb: hexRgb(`${Colors[`BLUE_${n}`]}`, { format: 'array' }),
  }))

const grey = [
  '050',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
]
  .reverse()
  .map(n => ({
    color: `${Colors[`GREY_${n}`]}`,
    id: `GREY_${n}`,
    rgb: hexRgb(`${Colors[`GREY_${n}`]}`, { format: 'array' }),
  }))

const orange = ['050', '100', '200', '300', '400', '500', '600']
  .reverse()
  .map(n => ({
    color: `${Colors[`ORANGE_${n}`]}`,
    id: `ORANGE_${n}`,
    rgb: hexRgb(`${Colors[`ORANGE_${n}`]}`, { format: 'array' }),
  }))

const purple = ['050', '100', '200', '300', '400', '500', '600']
  .reverse()
  .map(n => ({
    color: `${Colors[`PURPLE_${n}`]}`,
    id: `PURPLE_${n}`,
    rgb: hexRgb(`${Colors[`PURPLE_${n}`]}`, { format: 'array' }),
  }))

const red = ['050', '100', '200', '300', '400', '500', '600']
  .reverse()
  .map(n => ({
    color: `${Colors[`RED_${n}`]}`,
    id: `RED_${n}`,
    rgb: hexRgb(`${Colors[`RED_${n}`]}`, { format: 'array' }),
  }))

const yellow = ['050', '100', '200', '300', '400', '500', '600']
  .reverse()
  .map(n => ({
    color: `${Colors[`YELLOW_${n}`]}`,
    id: `YELLOW_${n}`,
    rgb: hexRgb(`${Colors[`YELLOW_${n}`]}`, { format: 'array' }),
  }))

const colorCategories = [
  { category: 'primary', id: 'Primary', list: primary },
  {
    category: 'secondary',
    description:
      'These colors are reserved for call-to-action buttons for a primary interaction.',
    id: 'Teal',
    list: teal,
  },
  {
    category: 'secondary',
    description:
      'The purple colors are a secondary color, used in illustrations, and minimally in our products and UI as a secondary call-to-action color.',
    id: 'Purple',
    list: purple,
  },
  {
    category: 'secondary',
    description:
      'These colors are reserved for deletion and destructive actions.',
    id: 'Red',
    list: red,
  },
  {
    category: 'secondary',
    description: 'These colors are reserved for warnings and notifications.',
    id: 'Yellow',
    list: yellow,
  },
  {
    category: 'secondary',
    description:
      'These colors are reserved for notifications about safety and regulations.',
    id: 'Blue',
    list: blue,
  },
  {
    category: 'secondary',
    description:
      'These colors are reserved for driver and construction related content, both in marketing and within our product UI.',
    id: 'Orange',
    list: orange,
  },
  { category: 'greyscale', description: '', id: 'Grey', list: grey },
]

const primaryList = colorCategories.filter(
  ({ category }) => category === 'primary'
)
const secondaryList = colorCategories.filter(
  ({ category }) => category === 'secondary'
)
const greyscaleList = colorCategories.filter(
  ({ category }) => category === 'greyscale'
)

const ColorBox = styled.div<{ borderColor?: string }>`
  background-color: ${props => props.color};
  border-radius: 5px;
  box-shadow: ${Shadows.LEVEL_3};
  transition: all 0.1s ease-in;
  cursor: pointer;
  height: 62px;
  margin-bottom: 5px;
  width: 100%;

  &:hover {
    transform: translateZ(0) translateY(-3px);
    box-shadow: ${Shadows.LEVEL_6};
  }

  ${({ borderColor }) => {
    return (
      borderColor &&
      css`
        border: 1px solid ${borderColor};
      `
    )
  }}
`

const CreateColorSection: React.FunctionComponent<{
  colorCategories: typeof colorCategories
}> = ({ colorCategories }) => {
  function getId(id: string) {
    if (id.includes('500')) {
      return `${id.split('_')[1]} (Base)`
    } else if (id.split('_')[1]) {
      return id.split('_')[1]
    } else {
      return id.split('_')[0]
    }
  }

  return (
    <Grid rowGap={20}>
      {colorCategories.map(({ id, list }) => (
        <Col width={12} key={id}>
          <div>
            <Grid>
              <Col width={12}>
                <Grid gap={32}>
                  {list.map(({ id, color, rgb }) => (
                    <Col width={4} key={id}>
                      <Grid>
                        <Col width={12}>
                          <CopyToClipboard
                            key={id}
                            text={id}
                            onCopy={() =>
                              alert(
                                `Color ID copied to clipboard! \n\n${id}\n${color}\n(${rgb
                                  .slice(0, 3)
                                  .join(', ')})`
                              )
                            }
                          >
                            <ColorBox
                              color={color}
                              borderColor={
                                id.includes('_050') &&
                                `${
                                  Colors[
                                    `${id.split('_')[0].toUpperCase()}_500`
                                  ]
                                }`
                              }
                            />
                          </CopyToClipboard>
                        </Col>
                        <Col width={4}>
                          <Paragraph size="xsmall" fontWeight={'semi-bold'}>
                            {getId(id)}
                          </Paragraph>
                        </Col>
                        <Col width={8}>
                          <Paragraph
                            size="xsmall"
                            textTransform="uppercase"
                            display="block"
                            align="right"
                          >
                            <span style={{ fontWeight: 600 }}>ID:</span> {id}
                          </Paragraph>
                          <Paragraph
                            size="xsmall"
                            textTransform="uppercase"
                            display="block"
                            align="right"
                          >
                            <span style={{ fontWeight: 600 }}>Hex:</span>{' '}
                            {color}
                          </Paragraph>
                          <Paragraph
                            size="xsmall"
                            textTransform="uppercase"
                            display="block"
                            align="right"
                          >
                            <span style={{ fontWeight: 600 }}>RGB:</span> (
                            {rgb.slice(0, 3).join(', ')})
                          </Paragraph>
                        </Col>
                      </Grid>
                      <Spacer value={8} />
                    </Col>
                  ))}
                </Grid>
              </Col>
            </Grid>
            <Spacer value={45} />
          </div>
        </Col>
      ))}
    </Grid>
  )
}

// Documentation
const Documentation = () => {
  return (
    <Grid>
      {/* Primary Colors */}
      <Col width={12}>
        <Heading size="h5" as="h2" fontWeight={'medium'}>
          Primary Colors
        </Heading>
        <Spacer value={12} />
        <HR />
        <Spacer value={30} />
      </Col>
      <Col width={3}>
        <div style={{ paddingRight: '32px' }}>
          <Heading size="h6" as="h3" fontWeight={'medium'}>
            Primary Colors
          </Heading>
          <Spacer value={15} />
          <Paragraph size="medium" color={Colors.GREY_500}>
            Our main primary colors are based on a simple black and white
            canvas, with a teal accent color to stand out as a call to action.
            The colors are based on construction, transportation and delivery
            standards, pulling inspiration from signage, roadways, and building
            materials.
          </Paragraph>
        </div>
      </Col>
      <Col width={9}>
        <CreateColorSection colorCategories={primaryList} />
      </Col>

      <Col width={12}>
        <Spacer value={4} />
      </Col>
      {/* Secondary Colors */}
      <Col width={12}>
        <Heading size="h5" as="h2" fontWeight={'medium'}>
          Secondary Colors
        </Heading>
        <Spacer value={10} />
        <Paragraph size="medium" color={Colors.GREY_500}>
          Also included in our palette are shades of each of the primary colors,
          to be used both in brand applications as well as in our UI.
        </Paragraph>
        <Spacer value={12} />
        <HR />
        <Spacer value={30} />
      </Col>
      {secondaryList.map(({ id, description }) => (
        <>
          <Col width={3}>
            <div style={{ paddingRight: '32px' }}>
              <Heading size="h6" as="h3" fontWeight={'medium'}>
                {id}
              </Heading>
              {description && (
                <>
                  <Spacer value={10} />
                  <Paragraph size="medium" color={Colors.GREY_500}>
                    {description}
                  </Paragraph>
                </>
              )}
            </div>
          </Col>
          <Col width={9}>
            <CreateColorSection
              colorCategories={colorCategories.filter(c => c.id === id)}
            />
          </Col>
        </>
      ))}

      {/* Grayscale Colors */}
      <Col width={12}>
        <div style={{ paddingRight: '32px' }}>
          <Heading size="h5" as="h2" fontWeight={'medium'}>
            Greyscale Colors
          </Heading>
          <Spacer value={12} />
          <Paragraph size="medium" color={Colors.GREY_500}>
            Also included in our palette are shades of grey — not 50 shades mind
            you.
          </Paragraph>
          <Spacer value={12} />
          <HR />
          <Spacer value={30} />
        </div>
      </Col>
      <Col width={3}>
        <Heading size="h6" as="h3" fontWeight={'medium'}>
          Greyscale Colors
        </Heading>
      </Col>
      <Col width={9}>
        <CreateColorSection colorCategories={greyscaleList} />
      </Col>
    </Grid>
  )
}

// Stories
export const Default = () => <Source language="jsx" code={colorUsage} />

// Storybook
const meta: Meta<typeof Default> = {
  // controls: { hideNoControlsWarning: true },
  decorators: [],
  parameters: {
    accessibility: { disabled: true },
    actions: { disable: true },
    controls: { disabled: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/bcmucq3rslzDXfTkPIsFqG/%E2%9D%96-Curri-UI-Library-v0.1?node-id=40%3A762',
    },
    docs: {
      inlineStories: true,
      page: () => (
        <CurriStorybookWrapper
          title="Colors"
          description="Our main primary colors are based on a simple black and white
            canvas, with a teal accent color to stand out as a call to action.
            The colors are based on construction, transportation and delivery
            standards, pulling inspiration from signage, roadways, and building
            materials."
        >
          <Documentation />

          <Heading size="h3" as="h1">
            Importing Colors
          </Heading>
          <Primary />
        </CurriStorybookWrapper>
      ),
    },
    jsx: { disabled: true },
    previewTabs: {
      canvas: {
        hidden: true,
      },
    },
    viewMode: 'docs',
  },
  title: 'Foundations/Colors',
}

export default meta
