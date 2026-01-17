import { Button } from '@/components/common/ui/button';

interface ProfileActionsProps {
  onLogout: () => void;
  isLoggingOut: boolean;
}

const ProfileActions = ({ onLogout, isLoggingOut }: ProfileActionsProps) => (
  <div className="mt-8 flex w-full justify-center gap-4 md:justify-end">
    <Button
      variant="primary"
      type="submit"
      className="rounded-md px-12 py-2"
      ariaLabel="Logout"
      onClick={onLogout}
      disabled={isLoggingOut}
    >
      {isLoggingOut ? 'Logging out...' : 'Logout'}
    </Button>
  </div>
);

export default ProfileActions;
