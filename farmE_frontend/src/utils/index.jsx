// Quick n dirty way to check if the pathName is equal to the path
export const matchPathName = (path) => {
  switch (path) {
    case "/dashboard":
      return "Dashboard";
    case "/virtual-twin":
      return "Virtual Twin";
    case "/financial-overview":
      return "Financial Overview";
    case "/system-care":
      return "System Care";
    case "/solar-insights":
      return "Solar Insights";
    case "/smart-assistant":
      return "Smart Assistant";
    case "/notifications":
      return "Notifications";
    default:
      return "";
  }
};
