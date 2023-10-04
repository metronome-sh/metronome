export class InvalidFilterValueError extends Error {
  name: string = 'InvalidFilterValueError';

  constructor(filterName: string, value: string | string[]) {
    super(
      `${InvalidFilterValueError.name} - Invalid value "${
        Array.isArray(value) ? value.join(',') : value
      }" for filter "${filterName}"`,
    );
  }
}
