import { yupResolver } from '@hookform/resolvers/yup';
import { yup } from '~/services/yup';

const schema = yup.object().shape({
  name: yup.string().nullable().trim().max(100).required(),
  description: yup.string().nullable().trim().max(600),
});

export const resolver = yupResolver(schema);
