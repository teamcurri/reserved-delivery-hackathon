import React, { FunctionComponent, memo, ReactNode } from 'react'
import styled, { css } from 'styled-components'

export const StyledPageWrapper = styled.div`
  background: #f9f9f9;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`
export const StyledMain = styled.div<{
  isWide?: boolean
}>`
  height: 100%;
  margin: 0 auto;
  max-width: 800px;
  padding: 50px 30px 75px;
  width: 100vw;
  ${({ isWide }) =>
    isWide &&
    css`
      max-width: 1440px;
    `}
`

export const StyledHeaderWrapper = styled.div`
  margin: 0 10px 40px 10px;
`

const PageWrapperBase: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return <StyledPageWrapper>{children}</StyledPageWrapper>
}

const MainBase: FunctionComponent<{
  isWide?: boolean
  children: ReactNode
}> = ({ isWide, children }) => {
  return <StyledMain isWide={isWide}>{children}</StyledMain>
}

const HeaderWrapperBase: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  return <StyledHeaderWrapper>{children}</StyledHeaderWrapper>
}

export const PageWrapper = memo(PageWrapperBase)
export const Main = memo(MainBase)
export const HeaderWrapper = memo(HeaderWrapperBase)
