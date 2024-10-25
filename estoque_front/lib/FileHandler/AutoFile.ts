export default class AutoFile {
  public name: string;
  public blob: Blob | File;
  public size: number;

  constructor(name: string, blob: Blob | File, size: number) {
    this.name = name;
    this.blob = blob;
    this.size = size;
  }
}
