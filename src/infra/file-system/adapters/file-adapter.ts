import { Readable } from 'stream';

export interface FileAdapter {
  name: string;
  relativePath: string;
  content: Buffer | Readable;
  length: number;
  contentType: string;
}
