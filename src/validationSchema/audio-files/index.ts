import * as yup from 'yup';

export const audioFileValidationSchema = yup.object().shape({
  file_name: yup.string().required(),
  privacy_setting: yup.string().required(),
  user_id: yup.string().nullable(),
});
