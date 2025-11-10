import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Profile, useProfileStore } from '../../stores/profileStore';

interface ProfileManagementProps {
  onClose: () => void;
  onEditProfile: (profile: Profile) => void;
}

const ProfileManagement: React.FC<ProfileManagementProps> = ({ onClose, onEditProfile }) => {
  const { profiles, deleteProfile } = useProfileStore();

  const handleDeleteProfile = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this profile?')) {
      await deleteProfile(id);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#141414] p-8 rounded-lg max-w-2xl w-full">
        <h2 className="text-3xl text-white font-semibold mb-8">Manage Profiles</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {profiles.map((profile) => (
            <div
              key={profile.id}
              className="flex items-center space-x-4 bg-[#333] p-4 rounded-lg"
            >
              <img
                src={profile.avatar_url}
                alt={profile.name}
                className="w-16 h-16 rounded object-cover"
              />
              <div className="flex-1">
                <h3 className="text-white font-medium">{profile.name}</h3>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => onEditProfile(profile)}
                  className="p-2 text-gray-400 hover:text-white transition"
                >
                  <Pencil size={20} />
                </button>
                <button
                  onClick={() => handleDeleteProfile(profile.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-8">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-[#E50914] text-white rounded hover:bg-[#f6121d] transition"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileManagement;