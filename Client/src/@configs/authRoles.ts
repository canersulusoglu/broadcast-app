/**
 * Authorization Roles
 */
const authRoles = {
    guest    : [],
    user     : ['user'],
    staff    : ['user', 'staff'],
    admin    : ['user', 'staff', 'admin'],
};

export default authRoles;