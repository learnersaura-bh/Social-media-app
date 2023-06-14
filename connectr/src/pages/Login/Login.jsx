export const Login = () => {
  const loginHandler = async () => {
    const cred = { username: "adarshbalika" , password: "adarshBalika123" };
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(cred),
      });
 console.log("status:" ,response.status);
const data = await response.json();
console.log("data:" , data);
const {encodedToken} = data;
console.log("encoded token:" , encodedToken );
localStorage.setItem("token" , encodedToken)

    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <button onClick={loginHandler}>Log in</button>
      Saurabh
    </div>
  );
};
