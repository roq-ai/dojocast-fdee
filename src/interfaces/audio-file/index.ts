import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface AudioFileInterface {
  id?: string;
  file_name: string;
  privacy_setting: string;
  user_id?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface AudioFileGetQueryInterface extends GetQueryInterface {
  id?: string;
  file_name?: string;
  privacy_setting?: string;
  user_id?: string;
}
