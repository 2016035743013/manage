
const StaffManage = () => import('../components/pages/organizationManage/staffManage/StaffManage');
const OrganizationManage = () => import('../components/pages/organizationManage/organizationManage/OrganizationManage');
const PositionManage = () => import('../components/pages/organizationManage/positionManage/PositionManage');

const RoleManage = () => import('../components/pages/rightManage/roleManage/RoleManage');
const ManagersManage = () => import('../components/pages/rightManage/managersManage/ManagersManage');

export {
    PositionManage,
    StaffManage,
    OrganizationManage,
    RoleManage,
    ManagersManage
}