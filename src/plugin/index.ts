import { GlobalVars, PluginAction, PluginCallbackFunction, PluginMessagePayload } from "../shared";

figma.showUI(__html__);

function isPayload(payload: unknown): payload is PluginMessagePayload {
    return (
      typeof payload === "object" &&
      Object.prototype.hasOwnProperty.call(payload, "type") &&
      Object.prototype.hasOwnProperty.call(payload, "data")
    );
  }
  
  function switchLan({ data }: PluginMessagePayload) {
    const deserializedData: { [key: string]: { [innerKey: string]: string } } = JSON.parse(data.dataSet);

    figma.currentPage.findAll((node) => {
      if(node.type === "TEXT"){
        const curValue = node.characters;
        try {
          if (node.name[0] == '#') {
            var temp = node.name;
            node.fontName = {
              family: "Roboto",
              style: "Regular",
            };
            node.characters = deserializedData[temp.replace('#', '')][data.language]
          }
        } catch (error) {
          console.error(error);
          node.characters = curValue;
        }
      }
      return false;
    })
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