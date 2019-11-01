import { convertToGradient } from '../helpers';

describe('Helper', () => {
  it('should convert a array of color strings to linear-gradient function', () => {
    expect(convertToGradient(['red', 'green', 'yellow', 'blue'], '10')).toBe('linear-gradient(10deg, red, green, yellow, blue)');
  });

  it('should convert a array of color strings to linear-gradient function (color hex)', () => {
    expect(convertToGradient(['#aa00ff', '#00bcd4', '#ff4452'], '10deg')).toBe('linear-gradient(10deg, #aa00ff, #00bcd4, #ff4452)');
  });

  it('should convert a array of color strings to linear-gradient function (null angle)', () => {
    expect(convertToGradient(['red', 'green', 'yellow', 'blue'])).toBe('linear-gradient(45deg, red, green, yellow, blue)');
  });

  it('should return undefined when length of color array is 0', () => {
    expect(convertToGradient([])).toBeFalsy();
  });

  it('should return undefined when color array is null', () => {
    expect(convertToGradient(null)).toBeFalsy();
  });
});

