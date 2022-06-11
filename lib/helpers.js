export const baseUrl =  process.env.VERCEL_ENV === 'development'    ? 'http://localhost:3000' :
                        process.env.VERCEL_ENV === 'preview'        ? `https://${process.env.VERCEL_URL}` :
                                                                      "https://njf.dev";
