type UserConnectionStatusProps = {
  timeElapsed: string;
};

const UserConnectionStatus: React.FC<UserConnectionStatusProps> = ({
  timeElapsed = "",
}) => {
  return (
    <p data-testid="user-connection-status" className="text-sm font-semibold">
      Última vez activo: <span className="font-normal">Hace {timeElapsed}</span>
    </p>
  );
};

export default UserConnectionStatus;
