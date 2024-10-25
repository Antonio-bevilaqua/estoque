import AutoFile from "./AutoFile";

export default class FileHandler {
  private files: AutoFile[];
  constructor() {
    this.files = [];
  }

  add(file: File): void {
    this.files.push(
      new AutoFile(
        file.name,
        file,
        file.size
      )
    );
  }

  addFiles(files: FileList): void {
    for (let i = 0; i < files.length; i++) {
      this.add(files[i]);
    }
  }

  get(): AutoFile[] {
    return this.files;
  }
}
