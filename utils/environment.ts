import { getModel, getReadableVersion } from "react-native-device-info";

const deviceModel = getModel();
const appVersion = getReadableVersion();

export { deviceModel, appVersion };
