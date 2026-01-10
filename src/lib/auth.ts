// lib/auth.ts
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";

interface AuthProps {
  token: string;
}

export function checkAuth(
  context: GetServerSidePropsContext
): GetServerSidePropsResult<AuthProps> {
  const { req } = context;
  const token = req.cookies.token;

  if (!token) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      token,
    },
  };
}
