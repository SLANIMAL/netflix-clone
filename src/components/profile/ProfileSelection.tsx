import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Profile, useProfileStore } from '../../stores/profileStore';
import ProfileForm from './ProfileForm';
import ProfileManagement from './ProfileManagement';

const ProfileSelection: React.FC = () => {
  const { profiles, selectProfile, loading } = useProfileStore();
  const [showProfileForm, setShowProfileForm] = useState(false);
  const [showManageProfiles, setShowManageProfiles] = useState(false);
  const [editingProfile, setEditingProfile] = useState<Profile | undefined>();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#141414]">
        <div className="text-white">Loading profiles...</div>
      </div>
    );
  }

  const handleEditProfile = (profile: Profile) => {
    setEditingProfile(profile);
    setShowManageProfiles(false);
    setShowProfileForm(true);
  };

  const handleCloseForm = () => {
    setShowProfileForm(false);
    setEditingProfile(undefined);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#141414]">
      <div className="text-center">
        <h1 className="text-3xl text-white mb-8">Who's watching?</h1>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {profiles.map((profile) => (
            <button
              key={profile.id}
              onClick={() => selectProfile(profile)}
              className="group flex flex-col items-center"
            >
              <div className="w-32 h-32 rounded overflow-hidden mb-2 group-hover:border-2 border-white">
                <img
                  src={profile.avatar_url}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-gray-400 group-hover:text-white">
                {profile.name}
              </span>
            </button>
          ))}
          
          {profiles.length < 5 && (
            <button
              onClick={() => setShowProfileForm(true)}
              className="flex flex-col items-center"
            >
              <div className="w-32 h-32 rounded-full border-2 border-gray-600 flex items-center justify-center hover:border-white">
                <Plus size={40} className="text-gray-600 hover:text-white" />
              </div>
              <span className="text-gray-400 mt-2">Add Profile</span>
            </button>
          )}
        </div>
        
        <button
          onClick={() => setShowManageProfiles(true)}
          className="mt-8 px-4 py-2 border border-gray-400 text-gray-400 hover:text-white hover:border-white"
        >
          Manage Profiles
        </button>
      </div>

      {showProfileForm && (
        <ProfileForm onClose={handleCloseForm} editProfile={editingProfile} />
      )}

      {showManageProfiles && (
        <ProfileManagement
          onClose={() => setShowManageProfiles(false)}
          onEditProfile={handleEditProfile}
        />
      )}
    </div>
  );
};

export default ProfileSelection;