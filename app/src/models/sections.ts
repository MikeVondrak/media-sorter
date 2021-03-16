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
}

export const sectionsConfig: SectionConfig[] = [
  {
    contentId: 'Folders-Section',
    title: '1. Select Folders',
    ready: true,
  },
  {
    contentId: 'Files-Section',
    title: '2. Select Media Types',
    ready: false,
  },
  {
    contentId: 'Sort-Section',
    title: '3. Select Sort Options',
    ready: false,
  },
  {
    contentId: 'Analyze-Section',
    title: '4. Analyze',
    ready: false,
  },
  {
    contentId: 'Preview-Section',
    title: '5. Preview',
    ready: false,
  },
  {
    contentId: 'Apply-Section',
    title: '6. Apply Sorting',
    ready: false,
  },
  {
    contentId: 'Results-Section',
    title: '7. Results',
    ready: false,
  }
]