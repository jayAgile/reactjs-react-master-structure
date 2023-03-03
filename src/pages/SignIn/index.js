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

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [$signin, setSignin] = useState("asvdvd");
  const [$password, setPassword] = useState();
  const [selectedValue, setSelectedValue] = useState();
  const [selectedValueChecked, setSelectedValueChecked] = useState();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    console.log($signin);
    return () => {};
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
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            flexDirection: "column",
            height: "100vh",
            display: "flex",
          }}
        >
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
          <input type="submit" />
        </form>
        {/* simple form submit validation */}
        {/* <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            flexDirection: "column",
            height: "100vh",
            display: "flex",
          }}
        >
          <input
            type="text"
            placeholder="First name"
            {...register("firstname", { required: true, maxLength: 80 })}
          />
          {errors.firstname && <span>First name field is required</span>}
          <input
            type="text"
            style={{ marginBlock: 10 }}
            placeholder="Last name"
            {...register("lastname", { required: true, maxLength: 100 })}
          />
          {errors.lastname && <span>Last name field is required</span>}
          <input
            type="text"
            placeholder="Email"
            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && <span>Email field is required</span>}
          <input
            type="tel"
            style={{ marginBlock: 10 }}
            placeholder="Mobile number"
            {...register("mobilenumber", {
              required: true,
              minLength: 6,
              maxLength: 12,
            })}
          />
          {errors.mobilenumber && <span>Mobile Number is required</span>}
          <select {...register("title", { required: true })}>
            <option value="Mr">Mr</option>
            <option value="Mrs">Mrs</option>
            <option value="Miss">Miss</option>
            <option value="Dr">Dr</option>
          </select>

          <div style={{ flexDirection: "row" }}>
            <input
              {...register("developer", { required: true })}
              type="radio"
              value="Yes"
            />
            <input
              {...register("developer", { required: true })}
              type="radio"
              value="No"
            />
          </div>

          <input type="submit" />
        </form> */}
        {/* <button type="button" onClick={handleClick}>
          Login Test
        </button> */}
      </div>
    </>
  );
};

export default SignIn;
