/* eslint-env browser */
// ROUTE REFRESH
// If there is no hash in the url scroll to the top and blur the active element.
const routeRefresh = () => {
  if (!window.location.hash) {
    window.scrollTo(0, 0);
  }
  document.activeElement.blur();
};

export default routeRefresh;
