import withAuth from "../helpers/withAuth";

function Test() {
  return (
    <>
      <h1>hello this is protected</h1>
    </>
  );
}

export default withAuth(Test);
