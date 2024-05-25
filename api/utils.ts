import { appVersion, deviceModel } from "@utils/environment";

const getHeaders = () => {
  const model = deviceModel;
  return {
    appVersion,
    model,
  };
};

export { getHeaders };
