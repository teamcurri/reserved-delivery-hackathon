/**
 * @deprecated
 */

/**
 * __LegacyColors__
 *
 * These Legacy Color IDs will eventually be deprecated after we switch all references of them in the App.
 * Please start using the default `Colors` and replace any `LegacyColors` to the best color that matches.
 * Reach out to Peng or Anthony if you have any questions.

 * @deprecated
 */
export const LegacyColors = {
  BLACK: '#000',
  COBALT_1: '#1F4B99', // The cobalt-family is great for UI elements that need to "pop" a little.
  COBALT_2: '#2458B3',
  COBALT_3: '#196eff',
  COBALT_4: '#4d8eff',
  COBALT_5: '#669EFF',
  CURRI_GREEN: '#49D7AF',
  CURRI_GREEN_VIBRANT: '#40F8C1',
  CURRI_PURPLE: '#5A5BD4',
  CURRI_PURPLE_VIBRANT: '#6169FF',
  DARK_GRAY_1: '#111',
  DARK_GRAY_2: '#222',
  DARK_GRAY_3: '#333',
  DARK_GRAY_4: '#444',
  DARK_GRAY_5: '#555',
  GRAY_1: '#6a6a6a',
  GRAY_2: '#7a7a7a',
  GRAY_3: '#8a8a8a',
  GRAY_4: '#9a9a9a',
  LIGHT_GRAY_1: '#a6a6a6',
  LIGHT_GRAY_2: '#c6c6c6',
  LIGHT_GRAY_3: '#c6c6c6',
  LIGHT_GRAY_4: '#d6d6d6',
  LIGHT_GRAY_5: '#f6f6f6',
  LIGHT_YELLOW_5: '#FFFFF1',
  RED_1: '#A82A2A',
  RED_2: '#C23030',
  RED_3: '#DB3737',
  RED_4: '#F55656',
  RED_5: '#FF7373', // Good for module backgrounds.
  SEAFOAM: '#EDFFFA',
  VIOLET: '#9000FF',
  WHITE: '#fff',
}

/**
 * __Colors__
 *
 * New Brand Redesigned Colors. Please replace any Legacy Colors w/ the best matched Color in this list.

 * @example
 * import { Colors } from '@curri/ui'
 * ...
 * const teal = Colors.TEAL_500
 */
export enum Colors {
  BLACK = '#000000',

  BLUE_050 = '#F3F7FD',
  BLUE_100 = '#D5E0FB',
  BLUE_200 = '#ABC3F8',
  BLUE_300 = '#82A3F6',
  BLUE_400 = '#547CF2',
  BLUE_500 = '#3967EF',
  BLUE_600 = '#1E46C0',

  GREY_050 = '#F8F8F8',
  GREY_100 = '#E8EAED',
  GREY_200 = '#D5D7DB',
  GREY_300 = '#BABDC2',
  GREY_400 = '#9FA1A6',
  GREY_500 = '#7E8085',
  GREY_600 = '#606266',
  GREY_700 = '#404145',
  GREY_800 = '#2B2C30',
  GREY_900 = '#1D1F21',

  ORANGE_050 = '#FCF2EA',
  ORANGE_100 = '#FCE4D2',
  ORANGE_200 = '#FAC9A7',
  ORANGE_300 = '#F9B07B',
  ORANGE_400 = '#F67D2A',
  ORANGE_500 = '#F5660C',
  ORANGE_600 = '#CE4B08',

  PURPLE_050 = '#F8F1FF',
  PURPLE_100 = '#E4C9FF',
  PURPLE_200 = '#CB94FF',
  PURPLE_300 = '#B25DFF',
  PURPLE_400 = '#9207FD',
  PURPLE_500 = '#8300FD',
  PURPLE_600 = '#4D009A',

  RED_050 = '#FCEAEA',
  RED_100 = '#F9CBCB',
  RED_200 = '#F59798',
  RED_300 = '#F76E67',
  RED_400 = '#E0373C',
  RED_500 = '#CB262B',
  RED_600 = '#7F0005',

  TEAL_050 = '#F7FFFB',
  TEAL_100 = '#E1FDF3',
  TEAL_200 = '#9EFFDD',
  TEAL_300 = '#6DFFD7',
  TEAL_400 = '#2EFFC5',
  TEAL_500 = '#04EEAD',
  TEAL_600 = '#00D99D',
  TEAL_700 = '#07B887',

  TRANSPARENT = 'transparent',

  WHITE = '#FFFFFF',

  YELLOW_050 = '#FDF8F0',
  YELLOW_100 = '#FBF0DA',
  YELLOW_200 = '#F8E2B6',
  YELLOW_300 = '#F6D492',
  YELLOW_400 = '#EFB04E',
  YELLOW_500 = '#EEA73B',
  YELLOW_600 = '#D9800A',
}

export enum MarketingColors {
  BLACKTOP_500 = '#1C1C1C',

  DRYWALL_500 = '#F4F4EF',

  HIVIS_500 = '#DAFE6E',
}
