export const permissions = {


  owner: [

    "company.manage",

    "employees.create",

    "employees.read",

    "employees.update",

    "employees.delete",

    "departments.manage",

    "projects.create",

    "projects.read",

    "projects.update",

    "projects.delete",

    "tasks.manage",

    "clients.manage",

    "invoices.manage",

    "reports.view",

    "settings.manage",

  ],



  manager: [

    "employees.read",

    "departments.read",

    "projects.create",

    "projects.read",

    "projects.update",

    "tasks.manage",

    "clients.read",

    "reports.view",

  ],



  employee: [

    "projects.read",

    "tasks.read",

    "tasks.update",

    "profile.update",

  ],


};



export function hasPermission(

  role: string,

  permission: string

) {


  const rolePermissions =
    permissions[
      role as keyof typeof permissions
    ];



  if (!rolePermissions) {

    return false;

  }



  return rolePermissions.includes(
    permission
  );


}
