const isAdminUser = function(user) {
    return user.is_staff
}

const isSuperUser = function(user) {
    return user.is_superuser
}

const hasRole = function(user, requiredRoles) {
    if (!requiredRoles) {
        return true
    }
    var userRoles = user.groups;
    if (!userRoles) {
        return false
    }
    var checkRoles
    if  (typeof (requiredRoles) =='string') {
        checkRoles = requiredRoles.split(",")
    } else {
        checkRoles = requiredRoles
    }
    var passed = false
    checkRoles.forEach((role, i)  => {
        userRoles.forEach((userRole, j) => {
            if (role == userRole.name) {
                passed = true;
                return;
            }
            if (passed) {
                return;
            }
        })
    });
    return passed;
}

const hasPermission = function(user, requiredPermissions) {
    if (!requiredPermissions) {
        return true
    }
    var checkPermissions
    if  (typeof (requiredPermissions) =='string') {
        checkPermissions = requiredPermissions.split(",")
    } else {
        checkPermissions = requiredPermissions
    }
    var passed = __permissionCheck(user.user_permissions, checkPermissions)
    if (!passed) {
        var userRoles = user.groups;
        if (!userRoles) {
            return false
        }
        userRoles.forEach((userRole, j) => {
            passed = __permissionCheck(userRole.permissions, checkPermissions)
            if (passed) {
                return
            }
        })
    }
    return passed
}

const __permissionCheck = function(userPermissions, checkPermissions) {
    if (!userPermissions) {
        return false
    }
    var passed = false
    checkPermissions.forEach((permission, i) => {
        userPermissions.forEach((userPermission, j) => {
            if (permission == userPermission.codename) {
                passed = true;
                return;
            }
            if (passed) {
                return;
            }   
        })
    });
    return passed;
}

export default {
    isAdminUser, isSuperUser, hasRole, hasPermission,
}