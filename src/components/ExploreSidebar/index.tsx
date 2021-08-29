import Checkbox from 'components/Checkbox';
import Radio from 'components/Radio';
import Heading from 'components/Heading';
import Button from 'components/Button';

import * as S from './styles';

import xor from 'lodash.xor';

import { Close, FilterList } from '@styled-icons/material-outlined';
import { ParsedUrlQueryInput } from 'querystring';
import { useState, useEffect } from 'react';

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

type Values = ParsedUrlQueryInput;

export type ExploreSidebarProps = {
  items: ItemProps[];
  initialValues?: Values;
  onFilter: (values: Values) => void;
};

// OnFilter serve para pegar o valor marcado dos filtros
// handleChange vai atualizar esses  valores

const ExploreSidebar = ({
  items,
  initialValues = {},
  onFilter,
}: ExploreSidebarProps) => {
  const [values, setValues] = useState(initialValues);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    onFilter(values);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  const handleRadio = (name: string, value: boolean | string) => {
    // Vai ser chamado algo como: sort_by: high-to-low (radio)
    setValues((s) => ({ ...s, [name]: value }));
  };

  const handleCheckbox = (name: string, value: string) => {
    // JUntando o que tinha com o que tem de novo apenas, sem repetição.
    // Vai ser chamado algo como: developers: ['xx','yy']
    const currentList = (values[name] as []) || [];
    setValues((s) => ({ ...s, [name]: xor(currentList, [value]) }));
  };

  const handleFilterMenu = () => {
    setIsOpen(false);
  };

  return (
    <S.Wrapper isOpen={isOpen}>
      {/* Vai ser modificado pelo wrapper depois, nos estilos */}
      <S.Overlay aria-hidden={isOpen} />

      <S.IconWrapper>
        <FilterList aria-label="open filters" onClick={() => setIsOpen(true)} />
        <Close aria-label="close filters" onClick={() => setIsOpen(false)} />
      </S.IconWrapper>

      <S.Content>
        {/* item = { name: 'platforms', type: 'checkbox'} */}
        {/* field = { label: 'Windows', name: 'windows'} */}
        {items.map((item) => (
          <S.Items key={item.title}>
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
                  // Transformando em array e verificando se inclui o field. Se incluir ele esta marcado.
                  // https://stackoverflow.com/questions/55781559/what-does-the-as-keyword-do
                  isChecked={(values[item.name] as string[])?.includes(
                    field.name,
                  )}
                  onCheck={() => handleCheckbox(item.name, field.name)}
                />
              ))}

            {item.type === 'radio' &&
              item.fields.map((field) => (
                <Radio
                  key={field.name}
                  id={field.name}
                  value={field.name}
                  name={item.name}
                  label={field.label}
                  labelFor={field.name}
                  defaultChecked={
                    String(field.name) === String(values[item.name])
                  }
                  onChange={() => handleRadio(item.name, field.name)}
                />
              ))}
          </S.Items>
        ))}
      </S.Content>
      <S.Footer>
        <Button fullWidth size="medium" onClick={handleFilterMenu}>
          Filter
        </Button>
      </S.Footer>
    </S.Wrapper>
  );
};

export default ExploreSidebar;
