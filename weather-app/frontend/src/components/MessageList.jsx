import React from 'react';

const MessageList = ({ cityName, messages }) => {
  return (
    <div className="flex flex-col h-full rounded-lg shadow border overflow-hidden bg-gray-800 border-gray-700">
      
      <div className="px-4 py-3 border-b flex justify-between items-center border-gray-700 bg-gray-800/50">
        <h3 className="text-sm font-medium text-gray-200">Live Updates</h3>
        <span className="inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset bg-indigo-400/10 text-indigo-400 ring-indigo-400/30">
          {cityName}
        </span>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[400px]">
        {messages.length === 0 ? (
          <div className="text-center py-8">
            <svg className="mx-auto h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <p className="mt-2 text-sm text-gray-400">No messages yet</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {messages.map((msg, index) => (
              <li key={index} className="flex flex-col rounded-md p-3 border bg-gray-700/30 border-gray-700/50">
                <p className="text-sm break-words text-gray-300">{msg.text}</p>
                <span className="self-end mt-1 text-xs text-gray-500">
                  {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default MessageList;
