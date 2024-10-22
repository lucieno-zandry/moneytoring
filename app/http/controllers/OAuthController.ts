import { Controller } from "../../../config/types";
import randomString from "../../helpers/randomString";
import { createAuthorizationToken } from "../../models/AuthorizationToken";
import { createUser, findUserByEmail } from "../../models/User";

type UserInfo = {
  family_name: string;
  given_name: string;
  picture: string;
  email: string;
};

const OAuthController: Controller = {
  google: async (request, response) => {
    const {
      email = "",
      family_name = "",
      given_name = "",
      picture = "",
    }: UserInfo = request.body;

    let user = await findUserByEmail(email);

    if (!user) {
      user = await createUser({
        email,
        name: family_name,
        firstname: given_name,
        image: picture,
        email_verified_at: new Date(),
      });
    }

    const authorization = await createAuthorizationToken({
      token: randomString(32),
      user_id: user.id,
      device: request.headers["user-agent"],
    });

    const { password, ...publicUserInfo } = user;

    return response.json({ user: publicUserInfo, token: authorization.token });
  },
};

export default OAuthController;
