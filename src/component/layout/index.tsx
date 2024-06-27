import Footer from "./footer";
import Header from "./header";
import Stomp from "./stomp";

interface childrenType {
  children: any;
}

const Layout = ({ children }: childrenType) => {
  return (
    <>
      <Header />
      {/*<Stomp />*/}
      {children}
      <Footer />
    </>
  );
};

export default Layout;
