import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";

const GroupSelector = observer(({ onSelect, currentGroupId }) => {
  const { groups } = useContext(Context);

  return (
    <div className=""> 


    <div className="group_selector">
      <select 
        value={groups.selectedGroupId || currentGroupId || ''}
        onChange={(e) => onSelect(e.target.value)}
        className="group_selector"
      >
        <option value="">Выберите группу</option>
        {groups.groups.map(group => (
          <option key={group.id} value={group.id}>
            {group.group_code} - {group.speciality}
          </option>
        ))}
      </select>
    </div>
    </div>
  );
});

export default GroupSelector;