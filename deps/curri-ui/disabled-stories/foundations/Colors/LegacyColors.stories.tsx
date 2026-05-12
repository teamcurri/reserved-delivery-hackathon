import { Primary, Source } from '@storybook/addon-docs/blocks'
import { Meta } from '@storybook/react'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'

import { Col, Grid, Heading, LegacyColors, Spacer } from '../../../src'
import { CurriStorybookWrapper } from '../../../src/stories/curri-storybook-components'

const colorUsage = `
  import { LegacyColors } from '@curri/ui'

  ...

  <p style={{ color: LegacyColors.BLACK }}>Text</p>

`

const defaultColors = [
  { color: LegacyColors.BLACK, id: 'BLACK' },
  { color: LegacyColors.WHITE, id: 'WHITE' },
]
const darkGray = [1, 2, 3, 4, 5].map(n => ({
  color: `${LegacyColors[`DARK_GRAY_${n}`]}`,
  id: `DARK_GRAY_${n}`,
}))
const regularGray = [1, 2, 3, 4].map(n => ({
  color: `${LegacyColors[`GRAY_${n}`]}`,
  id: `GRAY_${n}`,
}))
const lightGray = [1, 2, 3, 4, 5].map(n => ({
  color: `${LegacyColors[`LIGHT_GRAY_${n}`]}`,
  id: `LIGHT_GRAY_${n}`,
}))
const red = [1, 2, 3, 4, 5].map(n => ({
  color: `${LegacyColors[`RED_${n}`]}`,
  id: `RED_${n}`,
}))
const curriColors = [
  { color: LegacyColors.CURRI_GREEN, id: 'CURRI_GREEN' },
  { color: LegacyColors.CURRI_GREEN_VIBRANT, id: 'CURRI_GREEN_VIBRANT' },
  { color: LegacyColors.CURRI_PURPLE, id: 'CURRI_PURPLE' },
  { color: LegacyColors.CURRI_PURPLE_VIBRANT, id: 'CURRI_PURPLE_VIBRANT' },
]
const cobalt = [1, 2, 3, 4, 5].map(n => ({
  color: `${LegacyColors[`COBALT_${n}`]}`,
  id: `COBALT_${n}`,
}))
const singularColors = [
  { color: LegacyColors.LIGHT_YELLOW_5, id: 'LIGHT_YELLOW_5' },
  { color: LegacyColors.SEAFOAM, id: 'SEAFOAM' },
  { color: LegacyColors.VIOLET, id: 'VIOLET' },
]
const colorCategories = [
  { id: 'Defaults', list: defaultColors },
  { id: 'Dark Grays', list: darkGray },
  { id: 'Grays', list: regularGray },
  { id: 'Light Grays', list: lightGray },
  { id: 'Cobalts', list: cobalt },
  { id: 'Reds', list: red },
  { id: 'Curri Colors', list: curriColors },
  { id: 'Singular Colors', list: singularColors },
]

const Documentation = () => (
  <Grid rowGap={20}>
    {colorCategories.map(({ id, list }, i) => (
      <Col width={12} key={i}>
        <div
          style={{
            backgroundColor: LegacyColors.LIGHT_GRAY_5,
            border: `1px solid ${LegacyColors.LIGHT_GRAY_3}`,
            borderRadius: '5px',
            padding: '20px',
          }}
        >
          <Grid>
            <Col width={6}>
              <Heading size="x3">{id}</Heading>
            </Col>
            <Col width={6}>
              {list.map(({ id, color }) => (
                <CopyToClipboard
                  key={id}
                  text={id}
                  onCopy={() =>
                    alert(`Color id copied to clipboard! \n\n${id}: ${color}`)
                  }
                >
                  <div style={{ cursor: 'pointer', display: 'flex' }}>
                    <div
                      style={{
                        backgroundColor: color,
                        border: '1px solid black',
                        borderRadius: '5px',
                        height: '60px',
                        marginBottom: '10px',
                        width: '60px',
                      }}
                    />

                    <div
                      style={{
                        fontWeight: 600,
                        lineHeight: '35px',
                        marginLeft: '10px',
                      }}
                    >
                      <span
                        style={{
                          display: 'block',
                          fontWeight: 600,
                          marginLeft: '5px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {id}
                      </span>
                      <span
                        style={{
                          display: 'block',
                          fontSize: '14px',
                          fontWeight: 500,
                          marginLeft: '5px',
                          marginTop: '-10px',
                          textTransform: 'uppercase',
                        }}
                      >
                        {color}
                      </span>
                    </div>
                  </div>
                </CopyToClipboard>
              ))}
            </Col>
          </Grid>
        </div>
      </Col>
    ))}
  </Grid>
)

export const Legacy = () => <Source language="jsx" code={colorUsage} />

const meta: Meta<typeof Legacy> = {
  argTypes: {},
  // controls: { hideNoControlsWarning: true },
  // decorators: [],

  parameters: {
    accessibility: { disabled: true },
    actions: { disable: true },
    controls: { disabled: true },
    design: { disabled: true },
    docs: {
      // eslint-disable-next-line react/display-name
      page: () => (
        <>
          <CurriStorybookWrapper
            title="Legacy Colors"
            description=" Here displays all the Legacy Colors used in the Curri App. `Colors`
            have been renamed to `LegacyColors` as we are going to move towards
            updating all our colors with the brand redesign.These color
            definitions will eventually be deprecated when all the legacy color
            references in the app have been removed. To reference the color,
            import `LegacyColors` from `@curri/ui` and reference the ID."
          >
            <Documentation />
            <Spacer value={60} />
            <Heading size="h3" as="h1">
              Importing Colors
            </Heading>

            <Primary />
          </CurriStorybookWrapper>
        </>
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
