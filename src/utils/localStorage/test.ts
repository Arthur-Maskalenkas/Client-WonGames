import { getStorageItem, setStorageItem } from '.';

describe('getStorageItem()', () => {
  it('vai retornar um item do localStorage', () => {
    // Identificador da app primeiro. Pode pegar cartItems de outro lugar no teste
    window.localStorage.setItem('WONGAMES_cartItems', JSON.stringify(['1', '2']));

    expect(getStorageItem('cartItems')).toStrictEqual(['1', '2']);
  });
});

describe('setStorageItem()', () => {
  it('vai adicionar um item no localStorage', () => {
    setStorageItem('cartItems', ['3', '4']);

    const getLocalStorage = window.localStorage.getItem('WONGAMES_cartItems');
    const expectValue = JSON.stringify(['3', '4']);

    expect(getLocalStorage).toStrictEqual(expectValue);
  });
});
