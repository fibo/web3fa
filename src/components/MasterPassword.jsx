import {
  Button,
  Buttons,
  Control,
  Field,
  Form,
  Input,
  Label,
  formValues,
} from "trunx";
import { useCallback } from "react";

const fieldName = {
  password: "password",
};

const fields = Object.keys(fieldName);

export function MasterPassword({ setMasterPassword }) {
  const onSubmit = useCallback((event) => {
    event.preventDefault();
    const { password } = formValues(event, fields);
    setMasterPassword(password);
    event.target.reset();
  }, []);

  return (
    <Form onSubmit={onSubmit}>
      <Field>
        <Label htmlFor={fieldName.password}>Master password</Label>
        <Control>
          <Input
            id={fieldName.password}
            type="password"
            name={fieldName.password}
          />
        </Control>
      </Field>
      <Buttons>
        <Button>Confirm</Button>
      </Buttons>
    </Form>
  );
}
