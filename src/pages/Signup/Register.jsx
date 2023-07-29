import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { StyledRegister, StyledSection } from "./styles";
import Input from "../../components/Input";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";

const schema = yup
  .object({
    name: yup.string().required("O nome é obrigatório."),
    email: yup.string().email().required("O email é obrigatório."),
    phone: yup.string().required("Cadastre algum tipo de contato."),
    password: yup
      .string()
      .matches(/.{4}/, "Deve conter no mínimo 8 caracteres.")
      .required("Senha Obrigatoria."),
    passwordConfirmation: yup
      .string()
      .oneOf([yup.ref("password")], "As duas senhas devem ser iguais.")
      .required("Confirmação de senha é obrigatória"),
  })
  .required();

const Signup = () => {

  const {onSubmit} = useContext(UserContext)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <StyledRegister>
        <h2>ConnectBooker</h2>

        <Link to="/">
          <button>Voltar</button>
        </Link>
      </StyledRegister>
      <StyledSection className="animate__animated animate__fadeInLeft">
        <div>
          <section>
            <h3>Crie sua conta</h3>
            <p>Rápido e grátis.</p>
          </section>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Input
              id="name"
              type="text"
              label="Nome"
              placeholder="Digite aqui seu nome"
              errors={errors.name?.message}
                {...register("name")}
            ></Input>

            <Input
              id="email"
              label="Email"
              name="email"
              type="text"
              placeholder="Digite aqui seu email"
              errors={errors.email?.message}
              {...register("email")}
            ></Input>

            <Input
              id="password"
              label="Senha"
              type="password"
              name="password"
              placeholder="Digite aqui sua senha"
              errors={errors.password?.message}
              {...register("password")}
            ></Input>

            <Input
              id="password"
              label="Confirmar senha"
              type="password"
              name="passwordConfirmation"
              placeholder="Confirme sua senha"
              errors={errors.passwordConfirmation?.message}
              {...register("passwordConfirmation")}
            ></Input>
            <Input
              type="text"
              name="phone"
              id="contact"
              placeholder="Telefone"
              label="Contato"
              {...register("phone")}
              errors={errors.phone?.message}
            ></Input>
            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </StyledSection>
    </>
  );
};

export default Signup;
