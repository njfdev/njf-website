import EmailPasswordNode from 'supertokens-node/recipe/emailpassword'
import SessionNode from 'supertokens-node/recipe/session'
import { appInfo } from './appInfo'
import { TypeInput } from "supertokens-node/types";
import jwt from 'jsonwebtoken';
import { getServerSupabase, getSupabase } from 'lib/supabase';

export const backendConfig = (): TypeInput => {
  return {
    framework: "express",
    supertokens: {
      connectionURI: process.env.SUPERTOKENS_CONNECTION_URI,
      apiKey: process.env.SUPERTOKENS_API_KEY,
    },
    appInfo,
    recipeList: [
      EmailPasswordNode.init({
        override: {
          apis: (originalImplementation) => {
            return {
              ...originalImplementation,
              // The signUpPOST function handles sign up
              signUpPOST: async function (input) {
                if (originalImplementation.signUpPOST === undefined) {
                  throw Error("I some bad news... This error SHOULD NEVER appear, so your in some pretty big trouble. LOL");
                }

                let response = await originalImplementation.signUpPOST(input);

                if (response.status === 'OK') {
                  const supabase = await getServerSupabase();

                  // store the user's email mapped to their userId in Supabase
                  const { error } = await supabase
                    .from('users')
                    .insert({ email: response.user.email, id: response.user.id });
                  
                  if (error) {
                    throw error;
                  }

                  return response;
                }
              }
            }
          }
        }
      }),
      SessionNode.init({
        override: {
          functions: (originalImplementation) => {
            return {
              ...originalImplementation,
              // We want to create a JWT which contains the users userId signed with Supabase's secret so
              // it can be used by Supabase to validate the user when retrieving user data from their service.
              // We store this token in the accessTokenPayload so it can be accessed on the frontend and on the backend.
              createNewSession: async function (input) {
                const payload = {
                  userId: input.userId,
                  exp: Math.floor(Date.now() / 1000) + 60 * 60,
                };

                const supabase_jwt = jwt.sign(payload, process.env.SUPABASE_JWT_SECRET);

                input.accessTokenPayload = {
                  ...input.accessTokenPayload,
                  supabase_token: supabase_jwt,
                };

                return await originalImplementation.createNewSession(input);
              },
            };
          },
        },
      }),
    ],
    isInServerlessEnv: true,
  }
}
