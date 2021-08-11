import Checkbox from 'components/Checkbox';
import Radio from 'components/Radio';
import Heading from 'components/Heading';

import * as S from './styles';

import { Label } from '@styled-icons/boxicons-solid';

import { useState } from 'react';

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

// array de variaveis dinamicas
// windows: true
// É boolean para checkbox e para radio é string
type Values = { [field: string]: boolean | string };

export type ExploreSidebarProps = {
  items: ItemProps[];
  initialValues?: Values;
};

const ExploreSidebar = ({ items, initialValues = {} }: ExploreSidebarProps) => {
  const [values, setValues] = useState(initialValues);

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
                isChecked={!!values[field.name]} //{[windows: true]}
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
                // low-to-high === low-to-high
                defaultChecked={field.name === values[item.name]}
              />
            ))}
        </div>
      ))}
    </S.Wrapper>
  );
};

export default ExploreSidebar;
