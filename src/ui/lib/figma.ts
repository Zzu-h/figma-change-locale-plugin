// src/ui/lib/figma.ts
import { PluginMessagePayload, Language } from "../../shared";

export function requestToPlugin<T>(payload: T) {
  parent.postMessage({ pluginMessage: payload }, "*");
}

export function updateTextToPlugin(data: Language) {
  requestToPlugin<PluginMessagePayload>({
    type: "switchLan",
    data,
  });
}