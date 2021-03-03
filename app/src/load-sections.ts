import * as util from './utilities';

// html template already appended to DOM by load-html (must be before this in script imports)



export function loadSection() {

}

export function loadSections() {
  debugger;
  // get list of elements with a data-section-id attribute
  const sections = document.querySelectorAll('[data-section-id]');
  sections.forEach(section => {
    const sectionEl = section as HTMLElement;
    const sectionContentId = sectionEl.dataset.sectionId || '';
    const sectionTemplateId = 'Section-Template';
    //const container = document.getElementById(sectionId);

    util.loadTemplateContentById(sectionTemplateId, sectionEl);
  });

}

// main
loadSections();
