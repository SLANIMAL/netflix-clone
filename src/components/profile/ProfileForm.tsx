import React, { useState } from 'react';
import { useProfileStore } from '../../stores/profileStore';

interface ProfileFormProps {
  onClose: () => void;
  editProfile?: {
    id: string;
    name: string;
    avatar_url: string;
  };
}

const DEFAULT_AVATARS = [
  'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/2726111/pexels-photo-2726111.jpeg?auto=compress&cs=tinysrgb&w=150',
  'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150'
];

const ProfileForm: React.FC<ProfileFormProps> = ({ onClose, editProfile }) => {
  const { createProfile, updateProfile, error } = useProfileStore();
  const [name, setName] = useState(editProfile?.name ?? '');
  const [selectedAvatar, setSelectedAvatar] = useState(editProfile?.avatar_url ?? DEFAULT_AVATARS[0]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editProfile) {
        await updateProfile(editProfile.id, { name, avatar_url: selectedAvatar });
      } else {
        await createProfile(name, selectedAvatar);
      }
      onClose();
    } catch (err) {
      console.error('Error saving profile:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
      <div className="bg-[#141414] p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl text-white font-semibold mb-6">
          {editProfile ? 'Edit Profile' : 'Create Profile'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded">
              {error}
            </div>
          )}

          <div>
            <label className="block text-gray-400 mb-2">Profile Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#333] text-white px-4 py-3 rounded focus:outline-none focus:ring-2 focus:ring-[#E50914]"
              placeholder="Enter profile name"
              required
            />
          </div>

          <div>
            <label className="block text-gray-400 mb-2">Choose Avatar</label>
            <div className="grid grid-cols-5 gap-4">
              {DEFAULT_AVATARS.map((avatar) => (
                <button
                  key={avatar}
                  type="button"
                  onClick={() => setSelectedAvatar(avatar)}
                  className={`rounded-lg overflow-hidden border-2 transition-all ${
                    selectedAvatar === avatar ? 'border-[#E50914]' : 'border-transparent'
                  }`}
                >
                  <img src={avatar} alt="Avatar option" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-4 mt-8">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 text-gray-400 hover:text-white transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2 bg-[#E50914] text-white rounded hover:bg-[#f6121d] transition disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;