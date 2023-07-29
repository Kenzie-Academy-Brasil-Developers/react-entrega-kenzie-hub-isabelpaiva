import React, { useState } from "react";
import {
  Container,
  DashboardDiv,
  UserInfos,
  MainDash,
  EmptyDiv,
} from "./styles";
import { UserContext } from "../../contexts/UserContext.jsx";
import { useContext } from "react";

export const Dashboard = () => {
  const { user, clearLocalStorage, setModalOpen } =
    useContext(UserContext);

    const userName = user.name;
    const userEmail = user.email;

  return (
    <Container>
      <DashboardDiv>
        <section>
          <h1>ConnectBooker</h1>
          <button onClick={clearLocalStorage}>Sair</button>
        </section>
      </DashboardDiv>

      <UserInfos>
        <h2> Olá, {userName}</h2>
        <p>{userEmail}</p>
      </UserInfos>
      <MainDash>
        <p>Seus contatos</p>
        <button onClick={() => setModalOpen(true)}>+</button>
      </MainDash>
        <EmptyDiv>
          <h3> Você ainda não adicionou nenhum contato :(</h3>
        </EmptyDiv>
    </Container>
  );
};

export default Dashboard;
