import { useState } from "react";

const Login = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmitLogin = () => {
    console.log("hit");
  };

  return (
    <div>
      <h2>Login</h2>
      <div>
        <form onSubmit={handleSubmitLogin}>
          <input
            required
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <input
            required
            type="text"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <button disabled={loading}>Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
