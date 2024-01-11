// src/ui/lib/figma.ts
import { PluginMessagePayload, Quote } from "../../shared";

export function requestToPlugin<T>(payload: T) {
  parent.postMessage({ pluginMessage: payload }, "*");
}

export function requestGenerateRandomQuoteToPlugin(data: Quote) {
  requestToPlugin<PluginMessagePayload>({
    type: "switchLan",
    data,
  });
}