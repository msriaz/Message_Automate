import React, { memo } from "react";
import Background from "../../../Components/Background";
import Logo from "../../../Components/Logo";
import Header from "../../../Components/Header";
import Paragraph from "../../../Components/Paragraph";
import Button from "../../../Components/Button";
import { logoutUser } from "../../../Services/firebase/api/auth-api";

const Dashboard = () => (
  <Background>
    <Logo />
    <Header>Let’s start</Header>
    <Paragraph>
      Your amazing app starts here. Open you favourite code editor and start
      editing this project.
    </Paragraph>
    <Button mode="outlined" onPress={() => logoutUser()}>
      Logout
    </Button>
  </Background>
);

export default memo(Dashboard);
