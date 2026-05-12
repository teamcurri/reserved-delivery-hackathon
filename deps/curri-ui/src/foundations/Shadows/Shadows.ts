/**
 * __Shadows__
 *
 * Shadow styling for components.

 * @example
 * import { Shadows } from '@curri/ui'
 * ...
 * const container = styled.div`
 *  div {
 *    box-shadow: ${Shadows.LEVEL_3};
 *  }
 * `
 */
export const Shadows = {
  LEVEL_1: '0px 0px 1px rgba(0, 0, 0, 0.06), 0px 1px 2px rgba(0, 0, 0, 0.1)',
  LEVEL_2: '0px 0px 2px rgba(0, 0, 0, 0.06), 0px 2px 4px rgba(0, 0, 0, 0.1)',
  LEVEL_3: '0px 0px 2px rgba(0, 0, 0, 0.06), 0px 3px 8px rgba(0, 0, 0, 0.1)',
  LEVEL_4: '0px 0px 3px rgba(0, 0, 0, 0.06), 0px 4px 12px rgba(0, 0, 0, 0.1)',
  LEVEL_5: '0px 0px 2px rgba(0, 0, 0, 0.06), 0px 6px 16px rgba(0, 0, 0, 0.1)',
  LEVEL_6: '0px 0px 2px rgba(0, 0, 0, 0.06), 0px 8px 24px rgba(0, 0, 0, 0.1)',
  LEVEL_7: '0px 0px 2px rgba(0, 0, 0, 0.06), 0px 12px 32px rgba(0, 0, 0, 0.1)',
  LEVEL_8: '0px 0px 2px rgba(0, 0, 0, 0.06), 0px 16px 48px rgba(0, 0, 0, 0.1)',
}
