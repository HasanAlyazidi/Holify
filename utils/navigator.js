import { NavigationActions, StackActions, DrawerActions } from 'react-navigation';

let container;
let navInitialScreen;
let isContainerLoaded = false;

function setContainer(containerRef) {
  container = containerRef;
  isContainerLoaded = true;
}

function setInitialScreen(screenName) {
  navInitialScreen = screenName;
}

function reset(routeName, params) {
  container.dispatch(StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({
        type: NavigationActions.NAVIGATE,
        routeName,
        params,
      }),
    ],
  }));
}

function resetAndNavigate(routeName, params, actions) {
  container.dispatch(StackActions.reset({
    index: actions.length,
    actions: [
      NavigationActions.navigate({
        routeName,
        params,
      }),
      ...actions.map(action =>
        NavigationActions.navigate({
          routeName: action.routeName,
          params: action.params,
        })),
    ],
    key: null,
  }));
}

function navigate(routeName, params) {
  container.dispatch(NavigationActions.navigate({
    type: NavigationActions.NAVIGATE,
    routeName,
    params,
  }));
}

function navigateDeep(actions) {
  container.dispatch(actions.reduceRight(
    (prevAction, action) =>
      NavigationActions.navigate({
        type: NavigationActions.NAVIGATE,
        routeName: action.routeName,
        params: action.params,
        action: prevAction,
      }),
    undefined,
  ));
}

function goBack() {
  container.dispatch(NavigationActions.back());
}

function openDrawer() {
  container.dispatch(DrawerActions.openDrawer());
}

function closeDrawer() {
  container.dispatch(DrawerActions.closeDrawer());
}

function toggleDrawer() {
  container.dispatch(DrawerActions.toggleDrawer());
}

function getCurrentRoute() {
  if (!container || !container.state.nav) {
    return null;
  }

  return container.state.nav.routes[container.state.nav.index] || null;
}

function getScreenName() {
  const currentRoutes = getCurrentRoute();

  if (currentRoutes) {
    const { routeName } = currentRoutes.routes[0].routes.slice(-1)[0];
    return routeName;
  }

  return null;
}

function isScreen(name) {
  return (!isContainerLoaded && navInitialScreen === name) || getScreenName() === name;
}

export default {
  setContainer,
  setInitialScreen,
  navigateDeep,
  navigate,
  reset,
  resetAndNavigate,
  goBack,
  openDrawer,
  closeDrawer,
  toggleDrawer,
  getCurrentRoute,
  getScreenName,
  isScreen,
};
