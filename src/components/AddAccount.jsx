import { useCallback } from "react";
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

const fieldName = {
  name: "name",
  secret: "secret",
  url: "url",
};

const fields = Object.keys(fieldName);

export function AddAccount({ setAccounts }) {
  const onSubmit = useCallback(
    (event) => {
      event.preventDefault();
      const { name, secret, url = "" } = formValues(event, fields);
      setAccounts((accounts) => [...accounts, { name, secret, url }]);
      event.target.reset();
    },
    [setAccounts],
  );

  return (
    <Form onSubmit={onSubmit}>
      <Field>
        <Label htmlFor={fieldName.name}>Name</Label>

        <Control>
          <Input
            required
            id={fieldName.name}
            type="text"
            name={fieldName.name}
          />
        </Control>
      </Field>

      <Field>
        <Label htmlFor={fieldName.name}>URL</Label>

        <Control>
          <Input id={fieldName.url} type="text" name={fieldName.url} />
        </Control>
      </Field>

      <Field>
        <Label htmlFor={fieldName.secret}>Secret</Label>

        <Control>
          <Input
            required
            id={fieldName.secret}
            type="text"
            name={fieldName.secret}
          />
        </Control>
      </Field>
      <Buttons>
        <Button>Add account</Button>
      </Buttons>
    </Form>
  );
}
