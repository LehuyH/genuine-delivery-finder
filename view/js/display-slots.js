import { router } from "./router.js";

export function showSlots(slotData) {
    router.go("SuccessDisplay");
    console.log("Data received from from background script", slotData);
}