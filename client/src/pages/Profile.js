import { Button, Form, Spinner } from "react-bootstrap";
import { observer } from "mobx-react-lite";
import { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import GroupSelector from "./GroupSelector";

const Profile = observer(() => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user, groups, schedule, homework } = useContext(Context);

  useEffect(() => {
    groups.loadGroups().finally(() => setLoading(false));
  }, []);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    navigate('/login');
  };

  const handleGroupSelect = (groupId) => {
    schedule.setSelectedGroupId(groupId);
    homework.setSelectedGroupId(groupId);
    groups.setSelectedGroupId(groupId);
  };

  return (
    
    <div className="main_container">
      <div className="profile_container">
      <Form className='profile_container' style={{marginTop:'2%'}}>


        {loading ? (
          <Spinner animation="border" />
        ) : (
          <div style={{marginTop:'1%'}}>
            <GroupSelector 
              onSelect={handleGroupSelect}
              currentGroupId={user.user?.group?.id}
            />
          </div>
        )}
        
        <Button 
          style={{marginTop:'5%',background:'red',border:'none'}} 
          onClick={logOut}
        >
          Выйти
        </Button>
      </Form>
    </div>
    </div>
  );
});

export default Profile;