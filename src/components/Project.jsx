import React from "react";
import axios from "axios";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  sign: yup.string().required("Horoscope sign is required"),
  name: yup.string().required("Name is required"),
  date: yup.string().required("Day is required"),
  email: yup.string().email("Enter valid email").required("Email is required"),
});

function Project() {
  const [state, setstate] = useState(0);
  const [sign, setSign] = useState();
  const [name, setName] = useState();
  const [date, setDate] = useState();
  const [email, setEmail] = useState();
  const [entry, setEntry] = useState(0);

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  let sendData = (data) => {
    console.log(data);
    setEntry(data);
    calldata(data.sign, data.date);
  };
  const calldata = (a, b) => {
    axios
      .post("https://aztro.sameerkumar.website/?sign=" + a + "&day=" + b)
      .then((res) => {
        console.log(res.data);
        setstate(res.data);
      });
  };

  return (
    <>
      <form className="block" onSubmit={handleSubmit(sendData)}>
        <div className="card">
          <div className="p-fluid grid">
            <div className="field col-12 md:col-6">
              <span className="p-float-label">
                <InputText
                  id="inputtext"
                  name="sign"
                  value={sign}
                  onChange={(e) => setSign(e.target.value)}
                  {...register("sign")}
                  errors={errors}
                />
                <label htmlFor="inputtext">Horoscope sign</label>
              </span>
            </div>
            <span style={{ color: "red" }}>{errors?.sign?.message}</span>
            <div className="field col-12 md:col-6">
              <span className="p-float-label">
                <InputText
                  id="inputtext"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  {...register("name")}
                  errors={errors}
                />
                <label htmlFor="inputtext">Name</label>
              </span>
            </div>
            <span style={{ color: "red" }}>{errors?.name?.message}</span>

            <div className="field col-12 md:col-6">
              <span className="p-float-label">
                <InputText
                  id="inputtext"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  {...register("date")}
                  errors={errors}
                />
                <label htmlFor="inputtext">Day</label>
              </span>
            </div>
            <span style={{ color: "red" }}>{errors?.date?.message}</span>
            <div className="field col-12 md:col-6">
              <span className="p-float-label">
                <InputText
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  {...register("email")}
                  errors={errors}
                />
                <label htmlFor="inputtext">Email address</label>
              </span>
            </div>
            <span style={{ color: "red" }}>{errors?.email?.message}</span>
          </div>
          <Button
            label="Submit"
            type="submit"
            className="p-button-rounded p-button-success "
          />
        </div>
      </form>
      <div className="output">
        <h3>Name: {entry.name}</h3>
        <h3>Sign: {entry.sign}</h3>
        <h3>Email: {entry.email}</h3>
        <h3>Description: {state.description}</h3>
      </div>
    </>
  );
}

export default Project;
