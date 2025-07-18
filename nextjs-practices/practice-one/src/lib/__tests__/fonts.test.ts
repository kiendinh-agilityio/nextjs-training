jest.mock('next/font/google', () => ({
  Poppins: jest.fn().mockReturnValue({
    fontFamily: 'Poppins',
    style: {},
    variable: '--font-poppins',
  }),
}));

import { Poppins } from 'next/font/google';
import { FontPoppins } from '../fonts';

describe('FontPoppins', () => {
  it('should call Poppins with correct options', () => {
    expect(Poppins).toHaveBeenCalledWith({
      subsets: ['latin'],
      weight: ['400', '500', '600', '700'],
    });
  });

  it('should export the result of Poppins', () => {
    expect(FontPoppins).toEqual({
      fontFamily: 'Poppins',
      style: {},
      variable: '--font-poppins',
    });
  });
});
