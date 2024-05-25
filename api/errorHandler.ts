import { prettify } from "@utils/string";

const DEFAULT_ERROR_MESSAGE = "Something went wrong, please retry again later";

const errorHandler = (
  error: any,
  fallBackMessage = DEFAULT_ERROR_MESSAGE,
): { message: string; status: number } => {
  const { request, response } = error;
  if (response) {
    const message = prettify(response?.data?.message ?? fallBackMessage);
    const { status } = response;
    return { message, status };
  }

  if (request) {
    // Request sent but no response received
    const message = "Server timed out";
    const status = request.status || 503;
    return { message, status };
  }

  // Something happened in setting up the request that triggered an error
  const message = "Server timed out";
  const status = 408;
  return { message, status };
};

export default errorHandler;
