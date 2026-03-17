export type Gender = 'MALE' | 'FEMALE' | 'OTHER';
export type RoleType = 'SUPER_ADMIN' | 'ADMIN' | 'EMPLOYEE';
export type Position =
  | 'ENGINEERING_MANAGER'
  | 'PRODUCT_MANAGER'
  | 'SCRUM_MASTER'
  | 'PROJECT_MANAGER'
  | 'FRONTEND_DEVELOPER'
  | 'BACKEND_DEVELOPER'
  | 'FULLSTACK_DEVELOPER'
  | 'DEVOPT_ENGINEERING'
  | 'QA_ENGINEER'
  | 'QA_AUTOMATE_ENGINEER'
  | 'SOFTWARE_TESTER'
  | 'UX_DESIGNER'
  | 'UI_DESIGNER'
  | 'UX_UI_DESIGNER'
  | 'SYSTEM_ADMINISTRATOR'
  | 'CLOUD_ENGINEERING'
  | 'DATABASE_ADMINISTRATOR';

export type Level = 'JUNIOR' | 'MID' | 'SENIOR' | 'LEAD';

export type Status = 'ACTIVE' | 'INACTIVE' | 'LEAVE';
export type User = {
  id: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  gender: Gender;
  profileImageUrl: string | null;
  profileImagePublicId: string | null;
  roleType: RoleType;
  position: Position;
  level: Level;
  status: Status;
  createdById: string;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
};
