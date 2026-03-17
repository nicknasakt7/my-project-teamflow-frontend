import { Gender, Position, RoleType, Status } from '@/lib/api/user/user.type';
import 'next-auth';
import 'next-auth/jwt';

declare module 'next-auth' {
  interface User {
    id?: string;
    profileImageUrl?: string | null;
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    accessToken?: string;
    roleType?: RoleType;
    position?: Position;
    level?: Level;
    gender?: Gender;
    status?: Status;
    profileImagePublicId?: string | null;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    sub: string;
    profileImageUrl?: string | null;
    firstName?: string;
    lastName?: string;
    birthDate?: string;
    accessToken?: string;
    roleType?: RoleType;
    position?: Position;
    level?: Level;
    gender?: Gender;
    status?: Status;
    profileImagePublicId?: string | null;
  }
}
