/* eslint-disable @typescript-eslint/no-unused-vars */
import { DateSchema, DateSchemaConstructor } from 'yup';

declare module 'yup' {
  interface DateSchema {
    format(format: string, message?: string): DateSchema;
  }
}

export const Date: DateSchemaConstructor = {};
