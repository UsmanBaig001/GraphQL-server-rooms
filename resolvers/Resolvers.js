const bcrypt = require("bcrypt");
const ChatRoomModal = require("../models/ChatRooms");
const MessagesModal = require("../models/Messages");
const UserModel = require("../models/User");
const resolvers = {
  Query: {
    messages: async (_, { chatRoomId }) => {
      try {
        const chatRoom = await MessagesModal.findOne({ chatRoomId });
        if (!chatRoom) {
          throw new Error("Chat Room not found");
        }
        return chatRoom.messages;
      } catch (error) {
        throw new Error("Error fetching messages");
      }
    },
    users: async (_, { ids }) => {
      try {
        return await UserModel.find({ uid: { $in: ids } });
      } catch (error) {
        throw new Error("Error fetching users");
      }
    },
    user: async (_, { uid }) => {
      try {
        const user = await UserModel.findOne({ uid });
        if (!user) {
          throw new Error("User not found");
        }
        return user;
      } catch (error) {
        throw new Error("Error fetching user");
      }
    },
    allUsers: async () => {
      try {
        return await UserModel.find();
      } catch (error) {
        throw new Error("Error fetching all users");
      }
    },
    chatrooms: async (_, { uid }) => {
      try {
        return await ChatRoomModal.find({
          $or: [{ senderUid: uid }, { receiverUid: uid }],
        });
      } catch (error) {
        throw new Error("Error fetching chat rooms");
      }
    },
  },
  Mutation: {
    createChatRoom: async (_, { senderUid, receiverUid, chatRoomId }) => {
      try {
        const chatRoomData = { senderUid, receiverUid, chatRoomId };
        const newRoom = new ChatRoomModal(chatRoomData);
        await newRoom.save();
        return newRoom;
      } catch (error) {
        throw new Error("Error creating chat room");
      }
    },
    sendMessage: async (
      _,
      { chatRoomId, sendBy, receiveBy, message, dateStamp }
    ) => {
      try {
        let chatRoom = await MessagesModal.findOne({ chatRoomId });
        if (!chatRoom) {
          chatRoom = new MessagesModal({ chatRoomId, messages: [] });
          await chatRoom.save();
        }
        const newMessage = {
          message,
          sendBy,
          receiveBy,
          createdAt: new Date(),
          dateStamp: new Date(dateStamp),
          chatRoomId,
        };
        chatRoom.messages.push(newMessage);
        await chatRoom.save();
        return chatRoom;
      } catch (error) {
        throw new Error("Error sending message");
      }
    },
    updateUser: async (_, { uid, email, displayName, photoUrl, status }) => {
      try {
        const updatedUser = await UserModel.findOneAndUpdate(
          { uid },
          { email, displayName, photoUrl, status },
          { new: true }
        );
        if (!updatedUser) {
          throw new Error("User not found");
        }
        return updatedUser;
      } catch (error) {
        throw new Error("Error updating user");
      }
    },
    registerUser: async (
      _,
      { email, password, displayName, photoUrl, status, uid }
    ) => {
      try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
          throw new Error("Email already exists");
        }
        const hashedPassword = bcrypt.hashSync(password, 10);
        const newUser = new UserModel({
          email,
          displayName,
          photoUrl,
          status,
          uid,
          hashedPassword,
        });
        await newUser.save();
        return newUser;
      } catch (error) {
        throw new Error("Error during registration");
      }
    },
    deleteChatRoom: async (_, { chatRoomId }) => {
      try {
        await ChatRoomModal.findByIdAndDelete(chatRoomId);
        return true;
      } catch (error) {
        throw new Error("Error deleting chat room");
      }
    },
  },
};

module.exports = resolvers;
