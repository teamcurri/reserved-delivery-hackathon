import React from 'react'

import {
  Col,
  Colors,
  Grid,
  Paragraph as ParagraphText,
  Spacer,
} from '../../../..'
import { HR } from '../../../curri-storybook-components'

const FONT_SIZES = ['xsmall', 'small', 'medium', 'large'] as const

export const ParagraphDocumentation = () => {
  const paragraphList = [
    {
      fontWeight: 'regular',
      isItalic: false,
      isStrikeout: false,
      isUnderline: false,
    },
    {
      fontWeight: 'medium',
      isItalic: false,
      isStrikeout: false,
      isUnderline: false,
    },
    {
      fontWeight: 'semi-bold',
      isItalic: false,
      isStrikeout: false,
      isUnderline: false,
    },
    {
      fontWeight: 'regular',
      isItalic: false,
      isStrikeout: false,
      isUnderline: true,
    },
    {
      fontWeight: 'regular',
      isItalic: false,
      isStrikeout: true,
      isUnderline: false,
    },
    {
      fontWeight: 'regular',
      isItalic: true,
      isStrikeout: false,
      isUnderline: false,
    },
  ] as const
  const copy =
    'Become a legendary UX/UI designer through real world and practical courses.'

  const paragraphStyles = {
    large: { description: 'Font size: 18px | Line height: 28px' },
    medium: { description: 'Font size: 16px | Line height: 24px' },
    small: { description: 'Font size: 14px | Line height: 20px' },
    xsmall: { description: 'Font size: 12px | Line height: 20px' },
  }
  return (
    <>
      {FONT_SIZES.slice(0)
        .reverse()
        .map(size => (
          <div key={size}>
            <ParagraphText size="large" fontWeight="medium">
              Paragraph{' '}
              <span style={{ textTransform: 'capitalize' }}>{size}</span>
            </ParagraphText>
            <Spacer value={5} />
            <ParagraphText size="medium" color={Colors.GREY_800}>
              {paragraphStyles[size].description}
            </ParagraphText>
            <Spacer value={8} />
            <HR />
            <Spacer value={32} />
            <Grid gap={32}>
              <Col width={12}>
                <Grid gap={32}>
                  {paragraphList.map(
                    ({ fontWeight, isItalic, isStrikeout, isUnderline }, i) => (
                      <Col key={i} width={4}>
                        <ParagraphText
                          size={size}
                          fontWeight={fontWeight}
                          isItalic={isItalic}
                          isStrikeout={isStrikeout}
                          isUnderline={isUnderline}
                        >
                          {copy}
                        </ParagraphText>
                      </Col>
                    )
                  )}
                </Grid>
              </Col>
            </Grid>
            <Spacer value={80} />
          </div>
        ))}
    </>
  )
}
