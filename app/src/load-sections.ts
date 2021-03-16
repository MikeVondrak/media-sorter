import { ipcRenderer } from 'electron';
import { Section } from './components/section';
import { appActions, sectionActions } from './models/actions';
import { AppState } from './models/app.model';
import { SectionId } from './models/sections';
import * as util from './utilities';

let contentSections: Section[] = [];

// html template already appended to DOM by load-html (must be before this in script imports)
export function loadSection() {

}

export function loadSections(appState: AppState) {
  // get list of elements with a data-section-id attribute
  const sections = document.querySelectorAll('[data-section-id]');
  console.log('>>>>> loadSections number of sections: ' + sections.length);
  const numSections = sections.length;
  sections.forEach((section, idx) => {
    const sectionEl = section as HTMLElement;
    const sectionContentId = sectionEl.dataset.sectionId || '';
    const sectionTemplateId = 'Section-Template';
    
    // load a section template
    util.loadTemplateContentById(sectionTemplateId, sectionEl, sectionContentId);

    // set id on containing div?

    // create a section class to update the template title etc
    const contentSection: Section = new Section(sectionContentId as SectionId, appState);
    contentSections.push(contentSection);
      // watch appState change
    // load the template matching the section content id
    if (idx === numSections - 1) {
      console.log('>>>>> loadSections - all sections loaded forEach');
    }
  });
  console.log('>>>>> loadSections - all sections loaded');
  ipcRenderer.send(sectionActions.sectionContentsLoaded);
}

// main
ipcRenderer.on(appActions.allTemplatesLoaded, (event, appState) => {
  console.log('>>>>> loadSections - allTemplatesLoaded: ', appState);
  
  loadSections(appState);
});
