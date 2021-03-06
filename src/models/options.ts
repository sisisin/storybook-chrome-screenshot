import { Knobs } from './knobs';
import { Viewport } from './viewport';

export type AppType = 'react';

export interface CLIOptions {
  port: number;
  host: string;
  staticDir: string;
  outputDir: string;
  configDir: string;
  filterKind: RegExp | undefined;
  filterStory: RegExp | undefined;
  browserTimeout: number;
  parallel: number;
  injectFiles: string[];
  puppeteerLaunchConfig: string;
  silent: boolean;
  debug: boolean;
  ciMode: boolean;
  cwd: string;
  cmd: string;
}

export interface ScreenshotOptions {
  namespace?: string;
  delay: number;
  waitFor: string;
  viewport: Viewport | Viewport[];
  knobs: Knobs;
  filePattern: string | null;
}

export interface PartialScreenshotOptions {
  namespace?: string;
  delay?: number;
  waitFor?: string;
  viewport?: Partial<Viewport> | Partial<Viewport>[];
  knobs?: Knobs;
  filePattern?: string | null;
}
