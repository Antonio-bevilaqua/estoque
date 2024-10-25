import { ReactNode } from "react";

export interface AutoFileRenderProps {
  toggle: () => any;
  totalFiles: number;
  error: boolean;
  errorMessage: string;
}

export interface AutoFileInputProps {
  render: (props: AutoFileRenderProps) => ReactNode;
  name: string;
  index?: number;
  className?: string;
}

export interface AutoComposedFileInputProps {
  render: (props: AutoFileRenderProps) => ReactNode;
  name: string;
  index: number;
  className?: string;
}
