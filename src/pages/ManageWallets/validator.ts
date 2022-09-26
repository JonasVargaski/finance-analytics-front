import { yupResolver } from '@hookform/resolvers/yup';
import { yup } from '~/services/yup';

const schema = yup.object().shape({
  name: yup.string().nullable().trim().max(100).required(),
  description: yup.string().nullable().trim().max(600),
  transactions: yup
    .array()
    .of(
      yup.object().shape({
        fundId: yup.string().nullable().required(),
        price: yup.number().nullable().required(),
        quotas: yup.number().nullable().required(),
        purchaseAt: yup.date().nullable().required(),
        saleAt: yup.string().nullable(),
      }),
    )
    .min(1, 'É necessário cadastrar ao menos 1 transação por carteira')
    .required(),
});

export const resolver = yupResolver(schema);
