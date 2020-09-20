import React from "react";
import { Typography, Input } from "va-components";

const BetaPage: React.FC = () => {
  return (
    <div>
      <Typography.Title>
        We are currently building this service for you,
        <br /> let us notify you when we're in beta.
      </Typography.Title>
      <Input.TextInput
        type="text"
        style={{}}
        variant={Input.InputVariant.large}
        placeholder="you@example.com"
      />
    </div>
  );
};
export default BetaPage;
