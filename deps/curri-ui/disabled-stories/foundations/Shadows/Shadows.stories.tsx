import { Primary, Source } from '@storybook/addon-docs/blocks'
import { Meta } from '@storybook/react'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import styled from 'styled-components'

import { CurriStorybookWrapper } from '../../../../disabled-stories/curri-storybook-components'
import {
  Col,
  Colors,
  Grid,
  Heading,
  Paragraph,
  Shadows,
  Spacer,
} from '../../..'

const codeUsage = `
  import { Shadows } from '@curri/ui'
  ...
  const container = styled.div\`
    div {
      box-shadow: \${Shadows.LEVEL_3};
    }
  \`
`

const ShadowBox = styled.div<{ level: number }>`
  background-color: ${Colors.WHITE};
  border-radius: 5px;
  box-shadow: ${props => Shadows[`LEVEL_${props.level}`]};
  transition: all 0.1s ease-in;
  cursor: pointer;
  height: 170px;
  margin-bottom: 10px;
  width: 100%;
  border: 1px solid ${Colors.GREY_600};
`

const Documentation = () => (
  <Grid gap={40}>
    <Col width={12}>
      <Heading size="h5" as="h2">
        Shadow Levels
      </Heading>
    </Col>
    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
      <Col width={2} key={n}>
        <CopyToClipboard
          text={`Shadows.LEVEL_${n}`}
          onCopy={() =>
            alert(
              `Shadow level ID copied to clipboard! \n\n${`Shadows.LEVEL_${n}`}`
            )
          }
        >
          <ShadowBox level={n} />
        </CopyToClipboard>
        <Spacer value={5} />
        <Heading size="h6" as="h3">
          LEVEL {n}
        </Heading>
        <Spacer value={5} />
        <Paragraph size="medium" textTransform="uppercase" display="block">
          <span style={{ fontWeight: 600 }}>ID:</span> {`Shadows.LEVEL_${n}`}
        </Paragraph>
      </Col>
    ))}
  </Grid>
)
export const Default = () => <Source language="jsx" code={codeUsage} />

const meta: Meta<typeof Default> = {
  argTypes: {},
  // controls: { hideNoControlsWarning: true },
  // decorators: [],

  parameters: {
    accessibility: { disabled: true },
    actions: { disable: true },
    controls: { disabled: true },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/bcmucq3rslzDXfTkPIsFqG/%E2%9D%96-Curri-UI-Library-v0.1?node-id=66%3A768',
    },
    docs: {
      // eslint-disable-next-line react/display-name
      page: () => (
        <CurriStorybookWrapper
          title="Shadows"
          description="Shadow styles for components/divs."
        >
          <Documentation />
          <Spacer value={60} />
          <Heading size="h5" as="h2">
            Importing Shadows
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
  title: 'Foundations/Shadows',
}

export default meta
