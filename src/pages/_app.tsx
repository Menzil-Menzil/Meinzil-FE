import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@/component/layout";
import React from "react";
import {SessionProvider} from "next-auth/react";
import AuthContainer from "@/authContainer";
import {RecoilRoot} from "recoil";
import GlobalStyle from "@/styles/globalStyles";

export interface AuthInfo {
  role?: 'admin' | 'member'
  loading?: React.ReactNode
  redirect?: string
}

// 일반 유저 접근 금지 path
const NOT_ALLOWED_TO_MEMBERS = ['/register']
//일반 유저 권한이 필요한 start path
const ALLOWED_ONLY_TO_MEMBERS = [
  '/chatting',
  // '/follows'
]

export default function App(
  {
    Component,
    pageProps: { session, ...pageProps },
    router: { route },
  }: AppProps) {
  //path를 검사하여 AuthContainer로 감쌀지 여부를 결정
  const memberRequireAuth = ALLOWED_ONLY_TO_MEMBERS.some((path) =>
    route.startsWith(path)
  )
  const notMemberRequireAuth = NOT_ALLOWED_TO_MEMBERS.some((path) =>
    route.startsWith(path)
  )

  const renderAuthorizedComponent = () => {
    if (memberRequireAuth) {
      const authInfo: AuthInfo = {
        role: 'member',
        redirect: '/register',
      }
      return (
        <AuthContainer authInfo={authInfo}>
          <Component {...pageProps} />
        </AuthContainer>
      )
    } else if (notMemberRequireAuth) {
      const authInfo: AuthInfo = {
        role: undefined,
        redirect: '/',
      }
      return (
        <AuthContainer authInfo={authInfo}>
          <Component {...pageProps} />
        </AuthContainer>
      )
    }
    return <Component {...pageProps} />
  }

  return (
    <>
      <Head>
        <title>맨질맨질</title>
      </Head>
      <SessionProvider session={pageProps.session}>
          <RecoilRoot>
            <GlobalStyle/>
            <Layout>
              {renderAuthorizedComponent()}
            </Layout>
          </RecoilRoot>
      </SessionProvider>
    </>
  );
}
