import { yupResolver } from '@hookform/resolvers/yup';
import { yup } from '~/services/yup';

const schema = yup.object().shape({
  name: yup.string().trim().required(),
  description: yup.string(),
});

export const resolver = yupResolver(schema);
