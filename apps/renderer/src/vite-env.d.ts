/// <reference types="vite/client" />

interface ImportMetaEnv {
  // readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  APP_API_KEY: {
    APP_API_PROPERTY_NAME: (arg: unknown) => Promise<any>;
  };
}
