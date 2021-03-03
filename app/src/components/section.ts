import { ipcRenderer } from "electron";
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
    
    const contentState = appState?.sections?.find(state => state.contentId === this.sectionId);
    if (!contentState) {
      console.log('WARNING! Could not get content state for sectionId: ' + this.sectionId);
      return;
    }
    
    // update internal state
    this.title = contentState.title ? contentState.title : 'No Title Data';
    this.isReady = contentState.ready ? contentState.ready : false;

    // update view
    const templateEl = document.getElementById(this.sectionId as string);
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
        case 'content': t.innerText = 'Content: ' + this.sectionId; break;
        default: ;
      }
    });
  }

}