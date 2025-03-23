/// <reference types="vite/client" />
import { CSSProperties } from "react";

declare module "react" {
  interface CSSProperties {
    "--background"?: string;
    "--surface"?: string;
    "--shadow"?: string;
  }
}