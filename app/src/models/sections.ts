/**
 * Define Section IDs to match to template here
 */
export type SectionId = 
    'Folders-Section-Template' 
  | 'Files-Section-Template' 
  | 'Sort-Section-Template' 
  | 'Analyze-Section-Template' 
  | 'Preview-Section-Template' 
  | 'Apply-Section-Template' 
  | 'Results-Section-Template';

export interface SectionConfig {
  title?: string,
  ready?: boolean,
  contentId?: SectionId,
}
