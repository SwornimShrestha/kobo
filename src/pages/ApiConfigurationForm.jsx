import { Button, TextInput } from "@mantine/core";
import React, { useContext } from "react";
import logo from "../assets/private-key-generator_14162116.gif";
import { useForm } from "@mantine/form";
import { ApiConfigContext } from "../context/ApiConfigContext";
import { useNavigate } from "react-router-dom";
const ApiConfigurationForm = () => {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      apikey: "",
      baseUrl: "",
    },

    validate: {},
  });
  const navigate = useNavigate();
  const { setApiconfig } = useContext(ApiConfigContext);
  const handleSubmit = (values) => {
    setApiconfig(values);
    console.log(values);
    navigate("/dashboard");
  };
  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-[4%]">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img alt="Your Company" src={logo} className="mx-auto h-20 w-auto" />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Api Configuration
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={form.onSubmit(handleSubmit)}>
            <div>
              <TextInput
                variant="filled"
                description="Please provide the API Key provided by the service "
                withAsterisk
                label="Api Key"
                placeholder="XXX XXX XXX XXX XXXX"
                key={form.key("apikey")}
                {...form.getInputProps("apikey")}
              />
            </div>

            <div>
              <TextInput
                variant="filled"
                description="Enter the Base URL "
                withAsterisk
                label="Base URL"
                placeholder="api/v*"
                key={form.key("baseUrl")}
                {...form.getInputProps("baseUrl")}
              />
            </div>

            <div>
              <Button type="submit" fullWidth>
                Submit
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-gray-500">
            Make sure to enter valid and accurate information to avoid
            connection errors. Contact your API provider if you're unsure about
            the required details. <span></span>
            <a
              href="#"
              className="font-semibold text-sky-600 hover:text-indigo-500"
            >
              Click 'Submit' to save your configuration.
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default ApiConfigurationForm;
