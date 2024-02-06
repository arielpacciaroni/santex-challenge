import { useState } from 'react';
import useStateWithStorage from '.';

jest.mock('react');

describe('useStateWithStorage', () => {
  it('should return the default value if not found in storage', () => {
    const defaultValue = 'default value';

    (useState as jest.Mock).mockReturnValue([defaultValue, jest.fn()]);

    const [value] = useStateWithStorage('key', defaultValue);

    expect(value).toBe(defaultValue);
  });

  it('should call localStorage.setItem whenever updating the key', () => {
    const key = 'key';
    const newValue = 'new value';

    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');

    (useState as jest.Mock).mockReturnValue([newValue, jest.fn()]);

    const [, setValue] = useStateWithStorage(key, 'default value');

    setValue(newValue);

    expect(setItemSpy).toHaveBeenCalledWith(key, JSON.stringify(newValue));
  });
});
