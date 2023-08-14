interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Podcast Owner'],
  customerRoles: ['Guest'],
  tenantRoles: ['Podcast Owner', 'Team Member', 'Admin'],
  tenantName: 'Organization',
  applicationName: 'DojoCast',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
