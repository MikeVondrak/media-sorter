/**
 * Define Section IDs to match to template here
 */
export type SectionId = 
    'Folders-Section' 
  | 'Files-Section' 
  | 'Sort-Section' 
  | 'Analyze-Section' 
  | 'Preview-Section' 
  | 'Apply-Section' 
  | 'Results-Section';

export interface SectionConfig {
  title?: string,
  ready?: boolean,
  contentId?: SectionId,
  showDivider?: boolean,
}

export const sectionsConfig: SectionConfig[] = [
  {
    contentId: 'Folders-Section',
    title: '1. Select Folders',
    ready: true,
    showDivider: true,
  },
  {
    contentId: 'Files-Section',
    title: '2. Select Media Types',
    ready: false,
    showDivider: true,
  },
  {
    contentId: 'Sort-Section',
    title: '3. Select Sort Options',
    ready: false,
    showDivider: true,
  },
  {
    contentId: 'Analyze-Section',
    title: '4. Analyze',
    ready: false,
    showDivider: true,
  },
  {
    contentId: 'Preview-Section',
    title: '5. Preview',
    ready: false,
    showDivider: true,
  },
  {
    contentId: 'Apply-Section',
    title: '6. Apply Sorting',
    ready: false,
    showDivider: true,
  },
  {
    contentId: 'Results-Section',
    title: '7. Results',
    ready: false,
    showDivider: false,
  }
]