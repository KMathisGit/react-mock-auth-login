import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { registerUser, getUsers } from "./api/Api";
import { toast } from "react-toastify";
import { Button, TextField, Card, CardContent } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const registerSchema = yup.object().shape({
  username: yup.string().required().min(5).label("Username"),
  password: yup.string().min(5),
  email: yup.string().email().required(),
});

function Register(props) {
  const [usersState, setUsersState] = useState([]);
  const [usernameExists, setUsernameExists] = useState(false);
  const { register, handleSubmit, errors } = useForm({
    validationSchema: registerSchema,
  });
  const history = useHistory();

  useEffect(() => {
    // getUsers().then((response) => {
    //   setUsersState(response.data);
    // });
  }, []);

  const saveData = (data) => {
    if (usernameExists) return;
    registerUser(data).then((response) => {
      if (response.status === 200) {
        toast.success(`You have been registered!`);
        history.push("/");
      } else {
        if (response.data.message === "Username already exists") {
        }
        toast.error("Username already exists");
      }
    });
  };

  const checkIfUsernameExists = (e) => {
    let currentUsername = e.target.value;
    // check if username already exists
    let user = usersState.find((e) => e.username === currentUsername);
    if (user) setUsernameExists(true);
    else setUsernameExists(false);
  };

  return (
    <div className="form-container">
      <Card style={{ width: "100%" }}>
        <h2>Register Form</h2>
        <CardContent>
          <form onSubmit={handleSubmit(saveData)}>
            <TextField
              name="username"
              label="Username"
              variant="outlined"
              inputRef={register}
              margin="dense"
              error={!!errors.username || usernameExists}
              helperText={
                !!errors.username
                  ? errors.username.message
                  : usernameExists
                  ? "Username already exists"
                  : null
              }
              style={{ width: "400px" }}
              // onChange={checkIfUsernameExists}
            />
            <br />
            <TextField
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              inputRef={register}
              margin="dense"
              error={!!errors.password}
              helperText={!!errors.password ? errors.password.message : null}
              style={{ width: "400px" }}
            />
            <br />
            <TextField
              name="email"
              label="Email"
              variant="outlined"
              inputRef={register}
              margin="dense"
              error={!!errors.email}
              helperText={!!errors.email ? errors.email.message : null}
              style={{ width: "400px" }}
            />
            <br />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              size="large"
              style={{
                paddingLeft: "32px",
                paddingRight: "32px",
                margin: "16px",
              }}
            >
              Register
            </Button>
            <br />
            <Button
              variant="text"
              size="large"
              color="primary"
              onClick={() => history.push("/")}
            >
              Back to login
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;