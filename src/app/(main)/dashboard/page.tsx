import DashboardContent from '@/components/features/dashboard/dashboard-content';
import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Dashboard' };

export default function DashboardPage() {
  return <DashboardContent />;
}
