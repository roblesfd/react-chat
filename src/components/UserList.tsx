import { UserProps } from "../types/UserProps";
import UserItem from "./UserItem";


type UserListProps = {
  height: number;
  data: UserProps[];
};

const UserList: React.FC<UserListProps> = ({
  height,
  data,
}) => {
  return (
    <div data-testid="user-list">
      <h3 className="mb-4">Gente para conocer</h3>
      <div style={{height:`${height.toString()}px`}} className={`overflow-y-scroll space-y-3 text-center`}>
        {data.length ? (
          data.map((user, key) => (
            <UserItem key={key} data={user} />
          ))
        ) : (
          <span>No hay usuarios</span>
        )}
      </div>
    </div>
  );
};

export default UserList;
