import React, { useCallback, Fragment, useState, useEffect } from 'react';

// Context
import { ProfileContext } from './';

// Props for types
import DialogPopup from '../ui/components/dialog/DialogPopup';
import { useDialog } from '../hooks/useDialog';
import { Tournament } from '../lib/amplify/API';
import Profile from '../ui/components/Profile';
import useRepository from '../hooks/useRepository';
import useApp from '../hooks/useApp';

/************************************************************************
 * Types
*************************************************************************/
export interface ProfileProviderInterface {
 openProfile: (title: string, username: string) => void
}

export type ProfileProviderProps = {
  children: React.ReactNode
}

/************************************************************************/
const ProfileProvider: React.FC<ProfileProviderProps> = ({ children }) => {

  const { tournamentsRepository } = useApp();
  const [ _, { list: listTournaments } ] = useRepository<Tournament>(tournamentsRepository, { listOptions: { fetch: false } });
  const { openDialog, toggleDialog } = useDialog();
  const [ profile, setProfile ] = useState<any>({});
  const [ tournaments, setTournaments ] = useState<Tournament[]>([]);

  const openProfile = useCallback((title: string, username: string) => {
    setProfile({ title, username });
    toggleDialog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    (async () => {
      const items = await listTournaments();
      setTournaments(items);
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Fragment>
      <ProfileContext.Provider value={{ openProfile }}>
        {children}
      </ProfileContext.Provider>

      {openDialog ?
        <DialogPopup
          title={profile.title}
          open={openDialog}
          toggle={toggleDialog}
        >
          <Profile tournaments={tournaments} username={profile.username} />
        </DialogPopup>
        : null }
    </Fragment>
  );
};

export default ProfileProvider;