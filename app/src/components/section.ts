import { ipcRenderer } from "electron";
import { loadSections } from "../load-sections";
import { appActions } from "../models/actions";
import { AppState, UiProperty } from "../models/app.model";
import { SectionId } from "../models/sections";

/**
 * Numbered section with ready state determined by content loaded from external template specified by contentId
 */
export class Section {

  private readonly containerHtmlId = ''; // pass in from parent on creation 
  private readonly templateId = 'Section-Template';
  private readonly templateHtmlFile = 'section.html';
  private readonly htmlIdStatePropertyAssoc: UiProperty[] = [
    { selector: 'Settings-Source-Folder-Label', stateProperty: 'sourceFolder', uiLabel: '' },
  ];

  private title: string = '';
  private isReady: boolean = false;

  /**
   * Constructor
   * - sectionId: id of content section template to target when selecting from state / DOM
   * - appState: AppState to initialize with
   */
  constructor(
    private sectionId: SectionId,
    appState: AppState
  ) {
    this.registerEventHandlers();
    this.updateTemplate(appState);
  }

  private registerEventHandlers() {
    ipcRenderer.on(appActions.appStateUpdate, (event, appState) => {
      this.updateTemplate(appState);
    });
  }

  private updateTemplate(appState: AppState) {

    console.log('+++++ section updateTemplate id: ' + this.sectionId, appState);
    
    if (!this.sectionId) {
      throw new Error('SectionId undefined');
    }
    
    const contentState = appState?.sections?.config?.find(state => state.contentId === this.sectionId);
    if (!contentState) {
      console.log('WARNING! Could not get content state for sectionId: ' + this.sectionId);
      return;
    }
    
    // update internal state
    this.title = contentState.title ? contentState.title : 'No Title Data';
    this.isReady = contentState.ready ? contentState.ready : false;

    // update view
    const templateEl = document.getElementById(this.sectionId as string); // get element by id set on section containing div by load-sections.ts
    if (!templateEl) {
      console.log('ERROR: Could not get template by id: ' + this.sectionId);
    }
    const templateData = templateEl?.querySelectorAll('[data-ui-id]');
    if (!templateData) {
      console.log('WARNING! No data-ui-id attributes found');
      return;
    }
    templateData.forEach(template => {
      const t = template as HTMLElement
      switch (t.dataset.uiId) {
        case 'title': t.innerText = this.title; break;
        case 'ready': t.innerText = 'Ready: ' + this.isReady.toString(); break;
        //case 'content': t.innerText = 'Content: ' + this.sectionId; break;
        case 'content': this.loadSectionContent(t, this.sectionId); break;
        default: ;
      }
    });
  }

  private loadSectionContent(template: HTMLElement, sectionId: SectionId) {
    console.log('+++++ section loadSectionContent: ' + sectionId);
    
    // TODO: better way to check template has been loaded?
    if (!!template.firstElementChild) {
      console.log('+++++ section loadSectionContent template already exists: ' + sectionId);
      // template already has content loaded, don't destroy to preserve event handlers
      return;
    }
    const contentTemplate = document.querySelector('[data-template-id="' + sectionId + '"]') as HTMLTemplateElement;
    let contentNode = contentTemplate?.content?.cloneNode(true);
    if (!contentNode) {
      // RETURN
      document.createTextNode('Unable to load template: ' + sectionId);
      return;
    }
    template.innerHTML = '';
    template.appendChild(contentNode);
  }

}