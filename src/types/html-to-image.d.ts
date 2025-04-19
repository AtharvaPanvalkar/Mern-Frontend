declare module "html-to-image" {
  export function toPng(
    node: HTMLElement,
    options?: {
      cacheBust?: boolean;
      width?: number;
      height?: number;
      style?: Partial<CSSStyleDeclaration>;
      pixelRatio?: number;
    }
  ): Promise<string>;
}
