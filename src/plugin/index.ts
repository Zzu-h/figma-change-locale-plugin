import { PluginAction, PluginCallbackFunction, PluginMessagePayload } from "../shared";

figma.showUI(__html__);

function isPayload(payload: unknown): payload is PluginMessagePayload {
    return (
      typeof payload === "object" &&
      Object.prototype.hasOwnProperty.call(payload, "type") &&
      Object.prototype.hasOwnProperty.call(payload, "data")
    );
  }
  
  function switchLan({ data }: PluginMessagePayload) {
    // 1. 현재 사용자가 선택한 노드를 가지고 와서
    const currentSelectionNode = figma.currentPage.selection[0];
  
    // 2. 사용자가 선택한 노드가 텍스트 노드인지 확인하고
    if (currentSelectionNode?.type === "TEXT") {
        currentSelectionNode.fontName = {
            family: "Roboto",
            style: "Regular",
          };
      // 2-1. 텍스트 노드라면 내용을 인용문으로 대체합니다.
      currentSelectionNode.characters = `${data.text} - ${
        data.author || "Unknown"
      }`;
    } else {
      // 2-2. 텍스트 노드가 아니라면 에러를 던집니다.
      throw new Error("No text node is selected");
    }
  }

  async function loadFonts() {
    await figma.loadFontAsync({
      family: "Roboto",
      style: "Regular",
    });
  }
  loadFonts().then(() => {
    figma.ui.onmessage = (payload: unknown) => {
        const callbackMap: Record<PluginAction, PluginCallbackFunction> = {
          switchLan,
        };
      
        if (isPayload(payload) && callbackMap[payload.type]) {
          callbackMap[payload.type](payload);
        }
      };
  });