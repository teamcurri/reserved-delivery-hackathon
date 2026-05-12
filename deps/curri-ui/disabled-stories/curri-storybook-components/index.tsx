import { Unstyled } from '@storybook/addon-docs/blocks'
import React, { ReactNode } from 'react'
import styled from 'styled-components'

import { Col, Colors, Grid, Heading, Logo, Paragraph, Spacer } from '../../src'

const Header = styled.div`
  width: 100%;
  padding: 64px 0;
  background-color: ${Colors.BLACK};
  margin-bottom: 64px;
`

const Footer = styled.div`
  margin-top: 64px;
  width: 100%;
  padding: 64px 0;
  background-color: #f3f4f6;
`

export const HR = styled.hr`
  border: 0px;
  border-top: 1px solid #e5e7eb;
`

const DescriptionContainer = styled.div`
  width: 100%;
  max-width: 800px;
`

const CurriStorybookHeader: React.FunctionComponent<{
  title: string
  description?: string
}> = ({ title, description }) => {
  return (
    <Header>
      <Grid>
        <Col width={12}>
          <Heading
            color={Colors.WHITE}
            size="displaySmall"
            fontWeight={'semi-bold'}
            as="h1"
            textTransform="uppercase"
          >
            {title}
          </Heading>
          {description && (
            <DescriptionContainer>
              <Spacer value={16} />
              <Paragraph color={Colors.WHITE} size="large">
                {description}
              </Paragraph>
            </DescriptionContainer>
          )}
        </Col>
      </Grid>
    </Header>
  )
}

const StorybookFooter: React.FunctionComponent = () => {
  return (
    <Footer>
      <Grid>
        <Col width={12}>
          <Logo width={149} color={Colors.BLACK} />
          <Spacer value={32} />
          <Paragraph size="large">Questions? design@curri.com</Paragraph>
          <Spacer value={32} />
          <HR />
          <Spacer value={32} />
          <Paragraph color={Colors.GREY_400} size="large">
            © {new Date().getFullYear()} Curri
          </Paragraph>
        </Col>
      </Grid>
    </Footer>
  )
}

const CurriStorybookContainer = styled.div`
  display: block;
`

const CurriStorybookContent: React.FunctionComponent<{
  children: ReactNode
}> = ({ children }) => {
  return (
    <Grid>
      <Col width={12}>{children}</Col>
    </Grid>
  )
}

/**
 * __CurriStorybookWrapper__
 *
 * Creates a wrapper for storybook stories with a header, footer and a container. Wrap this around your story documentation.
 *
 * @param title Creates a title for the header
 * @param description? Creates an optional description for your page
 *
 * @example
 *
 * <CurriStorybookWrapper title="Creating Stories" description="This is how you create a story">
 *  <Heading size="h4" as="h2" fontWeight="medium">Welcome to Curri UI</Heading>
 *  <Paragraph size="medium">
 *    Description of documentation
 *  </Paragraph>
 *  <StorybookComponent />
 * </CurriStorybookWrapper>
 */
export const CurriStorybookWrapper: React.FunctionComponent<{
  title: string
  description?: string
  children?: ReactNode
}> = ({ title, description, children }) => {
  return (
    <Unstyled>
      <CurriStorybookContainer>
        <CurriStorybookHeader title={title} description={description} />
        <CurriStorybookContent>{children}</CurriStorybookContent>
        <StorybookFooter />
      </CurriStorybookContainer>
    </Unstyled>
  )
}
