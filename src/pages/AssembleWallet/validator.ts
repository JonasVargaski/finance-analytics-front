import { yupResolver } from '@hookform/resolvers/yup';
import { yup } from '~/services/yup';

const schema = yup.object().shape({
  value: yup.number().nullable().min(0).required(),
  enablePeriod: yup.bool(),
  endDate: yup.date().nullable().required(),
  startDate: yup
    .date()
    .nullable()
    .when('enablePeriod', { is: true, then: yup.date().nullable().required() }),
  actives: yup
    .array()
    .of(
      yup.object().shape({
        ticker: yup.string().trim().required(),
        weight: yup.number().nullable().max(100).min(0).required(),
      }),
    )
    .min(1, 'É necessário informar ao menos 1 ativo.')
    .required(),
});

export const resolver = yupResolver(schema);
