export const getPlatformUrl = ({
  locals: {
    context: { launchPresentation },
  },
}) => new URL(launchPresentation.return_url).origin;

export const createContext = ({ locals: { token, context, idtoken } }) => {
  const info = {
    ...(token.userInfo.name ? { name: token.userInfo.name } : null),
    ...(token.userInfo.email ? { email: token.userInfo.email } : null),
    ...(context.roles ? { roles: context.roles } : null),
    ...(context.context ? { context: context.context } : null),
  };

  return {
    userId: info.name,
    userRole: info.roles,
    info,
    idtoken,
  };
};

export default {
  getPlatformUrl,
  createContext,
};
