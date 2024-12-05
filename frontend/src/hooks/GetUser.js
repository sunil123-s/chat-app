export const getuser = (loggedInUser, chatUsers) => {

  if (!chatUsers || chatUsers.length === 0) return "Unknown User";
  if (chatUsers.length > 2) return "Group Chat"; // For group chats

  const otherUsers = chatUsers.filter(
    (u) => u.id !== loggedInUser?.id
  );

  return otherUsers.length === 1 ? otherUsers[0].fullName : "Unknown User";
};

export const getFullUser = (user, users) => {
  if (!users || users.length === 0) return "Unknown User";
  if (users.length > 2) return chatName || "Group Chat";

  const otherUser = users.find((u) => u.id !== user.id);
  return otherUser ? otherUser : "Unknown User";
};

