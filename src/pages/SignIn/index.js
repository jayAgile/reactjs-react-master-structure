import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../Redux/AuthSlice";
import "./signin.scss";
import {
  CheckBoxGroup,
  RadioButton,
  RadioButtonGroup,
  RenderInput,
  Select,
} from "../../components/common/FormField";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getToken } from "firebase/messaging";
import { auth, messaging, provider } from "../../firebase";
import {
  GoogleAuthProvider,
  deleteUser,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { LOGIN_F, LOGIN_S, LS_AUTHTOKEN } from "../../constants";
import { Button } from "react-bootstrap";
import { OAuthProvider } from "firebase/auth";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [password, setPassword] = useState();
  const [selectedValue, setSelectedValue] = useState();
  const [selectedValueChecked, setSelectedValueChecked] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Sign in with google
  const signin = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log("sign in called");
        // The signed-in user info.
        const user = result.user;
        dispatch({ type: LOGIN_S, payload: user });
        console.log(user);
        navigate("/dashboard");
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch(alert);
  };
  const signinApple = () => {
    // import { getAuth, signInWithPopup, OAuthProvider } from "firebase/auth";
    signInWithPopup(auth, provider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // Apple credential
        const credential = provider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const idToken = credential.idToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The credential that was used.
        const credential = provider.credentialFromError(error);
        console.log(error);

        // ...
      });
  };

  const signOutGoogle = () => {
    const user = auth.currentUser;
    console.log(user.uid);
    const uid = user.uid;
    deleteUser(user)
      .then(() => {
        // User deleted.
        dispatch({ type: LOGIN_F });
        console.log("User Deleted");
      })
      .catch((error) => {
        // An error ocurred
        // ...
      });
    signOut(auth)
      .then(() => {
        console.log("success");
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  async function requestPermission() {
    const permission = await Notification.requestPermission();
    if (permission == "granted") {
      //generate token
      const token = await getToken(messaging, {
        vapidKey:
          "BDSL59252NmnsgU22nGqkSYQX7UaLo5s0rpux78vKDBh8oFWD4NTtjnRcoGO9jbzGJ_uyq2cTpnDIqmv7vubgOk",
        // serviceWorkerRegistration: swRegistration,
      });
      console.log("token generated true", token);
      // localStorage.setItem("token", token);
    } else if (permission == "denied") {
      alert("denined permission");
    }
  }

  useEffect(() => {
    // console.log($signin);
    requestPermission();
  }, []);

  const gender = [
    {
      label: "Male",
      name: "radioBtn-types",
      register: { ...register("radioBtn-types", { required: true }) },
    },
    {
      label: "Female",
      name: "radioBtn-types",
      register: { ...register("radioBtn-types", { required: true }) },
    },
  ];
  const hobby = [
    {
      label: "cricket",
      name: "checkbox-types",
      register: { ...register("checkbox-types", { required: true }) },
    },
    {
      label: "badminton",
      name: "checkbox-types",
      register: { ...register("checkbox-types", { required: true }) },
    },
    {
      label: "tennis",
      name: "checkbox-types",
      register: { ...register("checkbox-types", { required: true }) },
    },
    {
      label: "football",
      name: "checkbox-types",
      register: { ...register("checkbox-types", { required: true }) },
    },
  ];

  const handleClick = () => {
    // let requestPayload = {
    //   email: "admin@clefill.com",
    //   password: "123456",
    //   deviceId: "12",
    //   deviceType: "web",
    //   fcmToken: "",
    // };

    let requestPayload = {
      email: "eve.holt@reqres.in",
      password: "cityslicka",
    };

    dispatch(loginAction(requestPayload))
      .then((res) => navigate("/dashboard"))
      .catch((err) => alert(err?.message || "Please try agian!"));
  };
  const onSubmit = (data) => {
    // console.log("data", data);
    if (data) {
      handleClick();
    }
  };

  function radioGroupHandler(event) {
    setSelectedValue(event.target.value);
    // console.log(event.target.value);
  }
  function checkGroupHandler(event) {
    setSelectedValueChecked(event.target.value);
    // console.log(event.target.value);
  }

  return (
    <>
      <div>
        <h2 style={{ textAlign: "center" }}>In SignIn</h2>
      </div>
      <br />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <RenderInput
            labelName={"name"}
            aria-label={"hello world"}
            placeholder={"Enter your name"}
            type="text"
            name="name"
            register={{ ...register("name", { required: "name is required" }) }}
            errors={errors}
          />
          <br />
          <RenderInput
            labelName={"email"}
            name="email"
            type="email"
            register={{
              ...register("email", { required: "email is required" }),
            }}
            errors={errors}
            placeholder="Enter email"
          />

          <RadioButtonGroup
            label="gender"
            options={gender}
            onChange={radioGroupHandler}
            errors={errors}
          />

          <RenderInput
            labelName={"age"}
            placeholder={"Enter number"}
            type="number"
            register={{
              ...register("age", {
                required: "Age is required",
                maxLength: 3,
              }),
            }}
            errors={errors}
          />

          <Select
            label="fruits"
            {...register("fruits", {
              required: true,
              validate: (v) => {
                // console.log("victory", v);
              },
            })}
            errors={errors}
            options={[
              { name: "select", value: "" },
              { name: "Apple", value: "apple" },
              { name: "Banana", value: "banana" },
              { name: "Orange", value: "orange" },
              { name: "Manngo", value: "mango" },
            ]}
          />

          <CheckBoxGroup
            label="Hobby"
            options={hobby}
            onChange={checkGroupHandler}
            errors={errors}
          />
          <input type="submit" class="btn btn-primary" />
        </form>
        <div style={{ marginTop: 10 }}>
          <center>
            <button class="btn btn-primary" onClick={signin}>
              Sign In with Google
            </button>

            {/* <button class="btn btn-dark m-2" onClick={signinApple}>
              Sign In with Apple
            </button> */}
            {/* <button class="btn btn-primary" onClick={signOutGoogle}>
              Sign Out Google
            </button> */}
          </center>
        </div>
      </div>
    </>
  );
};

export default SignIn;
