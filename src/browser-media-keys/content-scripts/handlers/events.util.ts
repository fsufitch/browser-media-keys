export function createMouseClickEvent() {
  return new MouseEvent("click", {
    bubbles: true,
    cancelable: true,
    view: window,
  });
}
