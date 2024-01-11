// src/shared/index.ts
export type Quote = {
  author: string | null;
  text: string;
};

export type PluginAction = "switchLan";

export type PluginMessagePayload = {
  type: PluginAction;
  data: Quote;
};

// src/shared/index.ts
export type PluginCallbackFunction<T = void> = (
  payload: PluginMessagePayload
) => T;

export class GlobalVars {
  public static datas: Object[];
  public static mapData = new Map<string, Map<string, any>>();
  public static lanList: Array<string> = [];
}