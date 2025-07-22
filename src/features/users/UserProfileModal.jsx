import React from "react";

const Section = ({ title, children }) => (
  <div className="mb-6">
    <h3 className="text-lg font-semibold mb-2 text-gray-700 border-b pb-1">{title}</h3>
    {children}
  </div>
);

const Badge = ({ children }) => (
  <span className="inline-block bg-indigo-100 text-indigo-700 text-xs font-medium px-2 py-1 rounded mr-2 mb-1">
    {children}
  </span>
);

const UserProfileModal = ({ open, user, onClose }) => {
  if (!open || !user) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 relative">
        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-2xl" onClick={onClose}>&times;</button>
        <h2 className="text-2xl font-bold mb-6 text-indigo-700">{user.name}'s Profile</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <Section title="Basic Info">
              <div className="mb-1"><span className="font-semibold">Email:</span> {user.email}</div>
              <div className="mb-1"><span className="font-semibold">Role:</span> {user.role}</div>
              <div className="mb-1"><span className="font-semibold">Status:</span> {user.status}</div>
              <div className="mb-1"><span className="font-semibold">Rating:</span> {user.rating ? `${user.rating}⭐` : '—'}</div>
              <div className="mb-1"><span className="font-semibold">Availability:</span> {user.availability || '—'}</div>
            </Section>
            <Section title="Bio">
              <div>{user.bio || 'No bio provided.'}</div>
            </Section>
            <Section title="Skills Offered">
              {user.skillsOffered && user.skillsOffered.length > 0 ? user.skillsOffered.map((s, i) => <Badge key={i}>{s}</Badge>) : '—'}
            </Section>
            <Section title="Skills Wanted">
              {user.skillsWanted && user.skillsWanted.length > 0 ? user.skillsWanted.map((s, i) => <Badge key={i}>{s}</Badge>) : '—'}
            </Section>
          </div>
          <div>
            <Section title="Swap History">
              <ul className="list-disc ml-5">
                {(user.swapHistory && user.swapHistory.length > 0) ? user.swapHistory.map((s, i) => (
                  <li key={i}>{s}</li>
                )) : <li>No swap history.</li>}
              </ul>
            </Section>
            <Section title="Feedback">
              <ul className="list-disc ml-5">
                {(user.feedback && user.feedback.length > 0) ? user.feedback.map((f, i) => (
                  <li key={i}>{f}</li>
                )) : <li>No feedback.</li>}
              </ul>
            </Section>
            <Section title="Reports">
              <ul className="list-disc ml-5">
                {(user.reports && user.reports.length > 0) ? user.reports.map((r, i) => (
                  <li key={i}>{r}</li>
                )) : <li>No reports.</li>}
              </ul>
            </Section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileModal; 