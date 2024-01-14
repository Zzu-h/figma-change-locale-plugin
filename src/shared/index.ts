// src/shared/index.ts
export type Language = {
  keyId: string | null;
  language: string;
  dataSet: string;
};

export type PluginAction = "switchLan";

export type PluginMessagePayload = {
  type: PluginAction;
  data: Language;
};

// src/shared/index.ts
export type PluginCallbackFunction<T = void> = (
  payload: PluginMessagePayload
) => T;

export class GlobalVars {
  public static mapData = new Map<string, Map<string, string>>();
  public static lanList: Array<string> = [];
}