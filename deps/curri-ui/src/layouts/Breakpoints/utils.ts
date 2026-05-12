export const breakpointConfig = {
  large: 1000,
  medium: 600,
  small: 400,
  xlarge: 1240,
  xsmall: 320,
}

export type BreakpointSize =
  | 'xsmall'
  | 'small'
  | 'smallOnly'
  | 'medium'
  | 'mediumAndUp'
  | 'large'
  | 'xlarge'

export const queryConfig = {
  large: `screen and (min-width: ${
    breakpointConfig.medium + 1
  }px) and (max-width: ${breakpointConfig.large}px)`,
  medium: `screen and (min-width: ${
    breakpointConfig.small + 1
  }px) and (max-width: ${breakpointConfig.medium}px)`,
  mediumAndUp: `screen and (min-width: ${breakpointConfig.medium}px)`,
  small: `screen and (min-width: ${
    breakpointConfig.xsmall + 1
  }px) and (max-width: ${breakpointConfig.small}px)`,
  smallOnly: `screen and (max-width: ${breakpointConfig.small}px)`,
  xlarge: `screen and (min-width: ${breakpointConfig.large + 1}px)`,
  xsmall: `screen and (max-width: ${breakpointConfig.xsmall}px)`,
}
