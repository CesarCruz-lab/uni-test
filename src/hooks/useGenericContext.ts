import { useContext } from 'react';
import { GenericContext } from 'contexts/GenericContextProvider';

export function useGenericContext() {
  return useContext(GenericContext);
}
