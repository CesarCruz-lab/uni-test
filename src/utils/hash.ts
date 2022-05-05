const symbols = '@#$%&*!-_';

type PasswordConfig = {
  amount: number;
  lowercase?: boolean;
  uppercase?: boolean;
  numbers?: boolean;
  symbols?: boolean;
};

const rand = (min = 0, max = 0) => Math.round(Math.random() * (max - min) + min);
const getUpperCase = () => String.fromCharCode(rand(65, 90));
const getLowerCase = () => String.fromCharCode(rand(97, 122));
const getSymbols = () => symbols[rand(0, symbols.length)];
const getNumber = () => rand(0, 9);

/* eslint-disable */

// @ts-ignore
Array.prototype.shuffle = function () {
  // Loop em todos os elementos
  for (let i = this.length - 1; i > 0; i--) {
    // Escolhendo elemento aleatório
    const j = Math.floor(Math.random() * (i + 1));
    // Reposicionando elemento
    [this[i], this[j]] = [this[j], this[i]];
  }
  // Retornando array com aleatoriedade
  return this;
};

/* eslint-enable */

export default function generateHash({ amount, lowercase, uppercase, numbers, symbols }: PasswordConfig) {
  const arr = [];

  for (let i = 0; i <= Number(amount); i++) {
    // @ts-ignore
    lowercase && arr.push(getLowerCase());
    // @ts-ignore
    uppercase && arr.push(getUpperCase());
    // @ts-ignore
    numbers && arr.push(getNumber());
    // @ts-ignore
    symbols && arr.push(getSymbols());
  }

  // @ts-ignore
  return arr.slice(0, amount).shuffle().join('');
}
