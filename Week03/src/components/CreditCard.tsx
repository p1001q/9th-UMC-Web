// src/components/CreditCard.tsx
import React from 'react';

type CreditCardProps = {
  name: string;
  role?: string; //배우면 character, 감독이면 job
  profilePath?: string | null;
};

export const CreditCard: React.FC<CreditCardProps> = ({ name, role, profilePath }) => {
  return (
    <div className="text-center w-32">
      {profilePath ? (
        <img
          src={`https://image.tmdb.org/t/p/w185${profilePath}`}
          alt={name}
          className="shadow-2xl rounded-full w-24 h-24 object-cover mx-auto mb-2"
        />
      ) : (
        <div className="shadow-2xl shadow rounded-full w-24 h-24 bg-gray-300 flex items-center justify-center mx-auto mb-2">
          <span className="text-xs text-black">No image</span>
        </div>
      )}
      <p className="text-sm font-bold">{name}</p>
      {role && <p className="text-xs text-gray-400">{role}</p>}
    </div>
  );
};
