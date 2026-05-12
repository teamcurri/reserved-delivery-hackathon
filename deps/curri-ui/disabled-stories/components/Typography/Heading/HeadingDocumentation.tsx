import React from 'react'

import {
  Col,
  Colors,
  Grid,
  Heading,
  Paragraph as ParagraphText,
  Spacer,
} from '../../../../'
import { HR } from '../../../curri-storybook-components'

export const Desktop = () => {
  const headingList = [
    {
      copy: 'Display Large',
      description: 'Font size: 64px | Line height: 64px | Tracking: -2%',
      size: 'displayLarge',
      textTransform: 'none',
      title: 'Display Large',
    },
    {
      copy: 'Display Large',
      description: 'Font size: 64px | Line height: 64px | Tracking: -2%',
      size: 'displayLarge',
      textTransform: 'uppercase',
      title: 'Display Large All Caps',
    },
    {
      copy: 'Display Small',
      description: 'Font size: 44px | Line height: 48px | Tracking: -2%',
      size: 'displaySmall',
      textTransform: 'none',
      title: 'Display Small',
    },
    {
      copy: 'Heading H1',
      description: 'Font size: 40px | Line height: 48px | Tracking: -2%',
      size: 'h1',
      textTransform: 'none',
      title: 'Heading H1',
    },
    {
      copy: 'Heading H2',
      description: 'Font size: 36px | Line height: 44px | Tracking: -2%',
      size: 'h2',
      textTransform: 'none',
      title: 'Heading H2',
    },
    {
      copy: 'Heading H3',
      description: 'Font size: 32px | Line height: 40px | Tracking: -2%',
      size: 'h3',
      textTransform: 'none',
      title: 'Heading H3',
    },
    {
      copy: 'Heading H4',
      description: 'Font size: 28px | Line height: 36px | Tracking: -2%',
      size: 'h4',
      textTransform: 'none',
      title: 'Heading H4',
    },
    {
      copy: 'Heading H5',
      description: 'Font size: 24px | Line height: 32px | Tracking: -2%',
      size: 'h5',
      textTransform: 'none',
      title: 'Heading H5',
    },
    {
      copy: 'Heading H6',
      description: 'Font size: 20px | Line height: 28px | Tracking: -2%',
      size: 'h6',
      textTransform: 'none',
      title: 'Heading H6',
    },
  ] as const

  const fontWeights = ['medium', 'semi-bold', 'bold', 'extra-bold'] as const

  return (
    <>
      {headingList.map(({ title, size, copy, description, textTransform }) => (
        <div key={size}>
          <ParagraphText size="large" fontWeight="medium">
            {title}
          </ParagraphText>
          <Spacer value={5} />
          <ParagraphText size="medium" color={Colors.GREY_800}>
            {description}
          </ParagraphText>
          <Spacer value={8} />
          <HR />
          <Spacer value={32} />
          <Grid gap={32}>
            <Col width={12}>
              <Grid gap={32}>
                {fontWeights.map((fontWeight, i) => (
                  <Col key={i} width={3}>
                    <Heading
                      size={size}
                      fontWeight={fontWeight}
                      textTransform={textTransform}
                    >
                      {copy}
                    </Heading>
                  </Col>
                ))}
              </Grid>
            </Col>
          </Grid>
          <Spacer value={80} />
        </div>
      ))}
    </>
  )
}

export const Mobile = () => {
  const headingList = [
    {
      copy: 'Heading H1',
      description: 'Font size: 36px | Line height: 44px | Tracking: -2%',
      fontSize: '36px',
      lineHeight: '44px',
      size: 'h1',
      textTransform: 'none',
      title: 'Heading H1',
    },
    {
      copy: 'Heading H2',
      description: 'Font size: 32px | Line height: 40px | Tracking: -2%',
      fontSize: '32px',
      lineHeight: '40px',
      size: 'h2',
      textTransform: 'none',
      title: 'Heading H2',
    },
    {
      copy: 'Heading H3',
      description: 'Font size: 28px | Line height: 36px | Tracking: -2%',
      fontSize: '28px',
      lineHeight: '36px',
      size: 'h3',
      textTransform: 'none',
      title: 'Heading H3',
    },
    {
      copy: 'Heading H4',
      description: 'Font size: 24px | Line height: 32px | Tracking: -2%',
      fontSize: '24px',
      lineHeight: '32px',
      size: 'h4',
      textTransform: 'none',
      title: 'Heading H4',
    },
    {
      copy: 'Heading H5',
      description: 'Font size: 20px | Line height: 28px | Tracking: -2%',
      fontSize: '20px',
      lineHeight: '28px',
      size: 'h5',
      textTransform: 'none',
      title: 'Heading H5',
    },
    {
      copy: 'Heading H6',
      description: 'Font size: 18px | Line height: 24px | Tracking: -2%',
      fontSize: '18px',
      lineHeight: '24px',
      size: 'h6',
      textTransform: 'none',
      title: 'Heading H6',
    },
  ] as const

  const fontWeights = ['medium', 'semi-bold', 'bold', 'extra-bold'] as const

  return (
    <>
      {headingList.map(
        ({
          title,
          size,
          copy,
          description,
          textTransform,
          fontSize,
          lineHeight,
        }) => (
          <div key={size}>
            <ParagraphText size="large" fontWeight="medium">
              {title}
            </ParagraphText>
            <Spacer value={5} />
            <ParagraphText size="medium" color={Colors.GREY_800}>
              {description}
            </ParagraphText>
            <Spacer value={8} />
            <HR />
            <Spacer value={32} />
            <Grid gap={32}>
              <Col width={12}>
                <Grid gap={32}>
                  {fontWeights.map((fontWeight, i) => (
                    <Col key={i} width={3}>
                      <Heading
                        size={size}
                        fontWeight={fontWeight}
                        textTransform={textTransform}
                        style={{
                          fontSize,
                          lineHeight,
                        }}
                      >
                        {copy}
                      </Heading>
                    </Col>
                  ))}
                </Grid>
              </Col>
            </Grid>
            <Spacer value={80} />
          </div>
        )
      )}
    </>
  )
}
