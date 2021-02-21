export type SortProperties = 'width' | 'height' | 'bitrateBps';

export interface SortDimension {
  property: SortProperties,
  value: number
}

export interface SortParameters {
  properties: SortDimension[];
}

export interface AppState {
  sourceFolder: string,
  destinationFolder: string,
  fileTypes: string[],
  sortParameters: SortParameters,
}

export const defaultSortParameters: SortParameters = {
  properties: [
    { property: 'width', value: 720 }, // x 480
    { property: 'width', value: 1280 }, // x 720
    { property: 'width', value: 1920 } // x 1080 - i vs p?
  ]
}

export const defaultAppState: AppState = {
  sourceFolder: '',
  destinationFolder: '',
  fileTypes: [],
  sortParameters: { properties: [] }
}