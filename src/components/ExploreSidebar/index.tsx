import Checkbox from 'components/Checkbox';
import Radio from 'components/Radio';
import Heading from 'components/Heading';

import * as S from './styles';

import { Label } from '@styled-icons/boxicons-solid';

import { useState } from 'react';
import Button from 'components/Button';

type Field = {
  label: string;
  name: string;
};

export type ItemProps = {
  title: string;
  name: string;
  type: 'checkbox' | 'radio' | string;
  fields: Field[];
};

// array de atributos dinamicos. Pode se criar windows: true, sort_by:
// É boolean para checkbox e para radio é string
type Values = { [field: string]: boolean | string };

export type ExploreSidebarProps = {
  items: ItemProps[];
  initialValues?: Values;
  onFilter: (values: Values) => void;
};

// OnFilter serve para pegar o valor dos filtros

const ExploreSidebar = ({
  items,
  initialValues = {},
  onFilter,
}: ExploreSidebarProps) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (name: string, value: boolean | string) => {
    // Vai pegar todos os valores antigos e adicionar o novo valor
    console.log(name, value);
    setValues((s) => ({ ...s, [name]: value }));
  };

  const handleFilter = () => {
    onFilter(values);
  };

  return (
    <S.Wrapper>
      {items.map((item) => (
        <div key={item.title}>
          <Heading lineBottom lineColor="secondary" size="small">
            {item.title}
          </Heading>

          {item.type === 'checkbox' &&
            item.fields.map((field) => (
              <Checkbox
                key={field.name}
                name={field.name}
                label={field.label}
                labelFor={field.name}
                isChecked={!!values[field.name]} // exemplo: {[windows: true]}
                onCheck={(v) => handleChange(field.name, v)} // windows, true
              />
            ))}

          {item.type === 'radio' &&
            item.fields.map((field) => (
              <Radio
                key={field.name}
                id={field.name}
                name={item.name}
                label={field.label}
                labelFor={field.name}
                // low-to-high === values[sort_by] (low-to-high)
                defaultChecked={field.name === values[item.name]}
                // sort_by, low-to-high
                onChange={() => handleChange(item.name, field.name)}
              />
            ))}
        </div>
      ))}

      <Button fullWidth size="medium" onClick={handleFilter}>
        Filter
      </Button>
    </S.Wrapper>
  );
};

export default ExploreSidebar;
