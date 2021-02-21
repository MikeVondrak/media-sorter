export interface OpenDialogResult {
  canceled: boolean,
  filePaths: string[],
  bookmarks?: string[] // OS X only
}