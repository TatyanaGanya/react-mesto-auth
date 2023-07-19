import Header from "./Header.jsx";
import Main from "./Main.jsx";

function ProtectedPage({ userEmail, ...props }) {
  return (
    <>
      <Header dataUser={userEmail} />
      <Main name="main" {...props} />
    </>
  );
}
export default ProtectedPage;
