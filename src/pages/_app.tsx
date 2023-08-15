import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "@/component/layout";
import { Prompt } from "next/font/google";
import localFont from 'next/font/local';
import React from "react";
//import  "../styles/globals.css";
import {SessionProvider} from "next-auth/react";
import AuthContainer from "@/authContainer";

const prompt = Prompt({
  subsets: ["latin"],
  weight: ["100", "400", "700"],
  variable: "--prompt",
});
const pretendard = localFont({
  src: '../../public/fonts/pretendard/Pretendard-Medium.woff',
});

export interface AuthInfo {
  role?: 'admin' | 'member'
  loading?: React.ReactNode
  redirect?: string
}

// 일반 유저 접근 금지 path
const NOT_ALLOWED_TO_MEMBERS = ['/register']
//일반 유저 권한이 필요한 start path
const ALLOWED_ONLY_TO_MEMBERS = ['/chatting', '/community']

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
        <Layout>
          {renderAuthorizedComponent()}
        </Layout>
        <style jsx global>{`
          @font-face {
            font-family: "Pretendard";
            src: local("/public/fonts/pretendard/Pretendard-Black.woff");
            font-weight: 900;
          }
          @font-face {
            font-family: "Pretendard";
            src: local("/public/fonts/pretendard/Pretendard-ExtraBold.woff");
            font-weight: 800;
          }
          @font-face {
            font-family: "Pretendard";
            src: local("/public/fonts/pretendard/Pretendard-Bold.woff");
            font-weight: 700;
          }
          @font-face {
            font-family: "Pretendard";
            src: local("/public/fonts/pretendard/Pretendard-SemiBold.woff");
            font-weight: 600;
          }
          @font-face {
            font-family: "Pretendard";
            src: local("/public/fonts/pretendard/Pretendard-Medium.woff");
            font-weight: 500;
          }
          @font-face {
            font-family: "Pretendard";
            src: local("/public/fonts/pretendard/Pretendard-Regular.woff");
            font-weight: 400;
          }
          @font-face {
            font-family: "Pretendard";
            src: local("/public/fonts/pretendard/Pretendard-Light.woff");
            font-weight: 300;
          }
          @font-face {
            font-family: "Pretendard";
            src: local("/public/fonts/pretendard/Pretendard-ExtraLight.woff");
            font-weight: 200;
          }
          @font-face {
            font-family: "Pretendard";
            src: local("/public/fonts/pretendard/Pretendard-Thin.woff");
            font-weight: 100;
          }
          :root {
            /* font */
            --logo-font: ${prompt.style.fontFamily};
            /* color */
            --theme-color: #e68c23;
            --input-placeholder: #afafaf;
            --highlighted-element: #ff8a00;
            --selected-element: #fbbc053b;
          }
          html, 
          body {
            font-family: 
            "Pretendard", Pretendard,
            -apple-system, BlinkMacSystemFont,
            system-ui, Roboto, "Helvetica Neue",
            "Segoe UI", "Apple SD Gothic Neo",
            "Noto Sans KR", "Malgun Gothic",
            "Apple Color Emoji", "Segoe UI Emoji",
            "Segoe UI Symbol", sans-serif;
          }
        `}</style>
      </SessionProvider>
    </>
  );
}
